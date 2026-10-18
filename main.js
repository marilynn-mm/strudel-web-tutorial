import { SEGMENTS } from './content.js';

// --- participant logging ------------------------------------------------
// PID comes from the URL (`?pid=P07`). Events are keyed by PID in
// localStorage so switching participants gives a clean bucket, and
// kept in memory so Download reflects the current session exactly.
// No network calls — downloads use a Blob object URL.

const PID = (new URLSearchParams(location.search).get('pid') || '').trim() || 'anon';
const LOG_KEY = `strudel-tutorial-log-${PID}`;

function loadEvents() {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const events = loadEvents();

function persist() {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(events));
  } catch {
    // Quota or private-mode — in-memory logging keeps working.
  }
}

function logEvaluate(blockId, code) {
  events.push({
    timestamp: new Date().toISOString(),
    pid: PID,
    blockId,
    code,
  });
  persist();
}

function downloadLog() {
  const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `strudel-log-${PID}-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- rendering ----------------------------------------------------------

const root = document.getElementById('segments');
const editorRefs = []; // {editorEl, blockId} — hooked after mount.

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function renderText(item) {
  if (item.type === 'explain') {
    return el('p', { class: 'explain', text: item.body });
  }
  // 'try'
  const p = el('p', { class: 'try' });
  p.appendChild(el('strong', { text: 'Try: ' }));
  p.appendChild(document.createTextNode(item.body));
  if (item.code) {
    p.appendChild(document.createTextNode(' '));
    p.appendChild(el('code', { text: item.code }));
  }
  return p;
}

function renderBlock(block) {
  const wrap = el('section', { class: 'block', id: `block-${block.id}` });

  const titleText = `${block.id} · ${block.title}`;
  const h3 = el('h3', { text: titleText });
  if (block.optional) {
    h3.appendChild(document.createTextNode(' '));
    h3.appendChild(el('span', { class: 'optional-tag', text: 'Optional · web only' }));
  }
  wrap.appendChild(h3);

  for (const item of block.text) {
    wrap.appendChild(renderText(item));
  }

  const editor = document.createElement('strudel-editor');
  editor.setAttribute('code', block.start);
  wrap.appendChild(editor);
  editorRefs.push({ editorEl: editor, blockId: block.id });

  const toolbar = el('div', { class: 'toolbar' });
  const playBtn = el('button', { type: 'button', class: 'play', text: 'Play' });
  const stopBtn = el('button', { type: 'button', class: 'stop', text: 'Stop' });
  const resetBtn = el('button', { type: 'button', class: 'reset', text: 'Reset' });
  toolbar.appendChild(playBtn);
  toolbar.appendChild(stopBtn);
  toolbar.appendChild(resetBtn);
  wrap.appendChild(toolbar);

  // StrudelMirror API verified against @strudel/codemirror@1.3.0:
  //   evaluate(autostart=true) → runs the current editor code and starts playback
  //   stop()                   → stops the scheduler
  //   setCode(code)            → replaces the editor contents
  playBtn.addEventListener('click', () => {
    editor.editor?.evaluate?.();
  });
  stopBtn.addEventListener('click', () => {
    editor.editor?.stop?.();
  });
  resetBtn.addEventListener('click', () => {
    if (editor.editor?.setCode) {
      editor.editor.setCode(block.start);
    } else {
      // Editor hasn't finished connecting yet; attribute path triggers
      // attributeChangedCallback → editor.setCode once it does.
      editor.setAttribute('code', block.start);
    }
  });

  return wrap;
}

function renderSegment(seg) {
  const wrap = el('section', { class: 'segment', id: `seg-${seg.id}` });
  wrap.appendChild(el('h2', { text: seg.title }));
  for (const block of seg.blocks) {
    wrap.appendChild(renderBlock(block));
  }
  return wrap;
}

for (const seg of SEGMENTS) {
  root.appendChild(renderSegment(seg));
}

// Custom-element connectedCallback has fired by this point, so each
// <strudel-editor>.editor is a live StrudelMirror. Wrapping evaluate on
// the instance catches every path that triggers a run: Ctrl+Enter,
// Alt+Enter, and the Play button (which also calls editor.evaluate()).
for (const { editorEl, blockId } of editorRefs) {
  const sm = editorEl.editor;
  if (!sm || typeof sm.evaluate !== 'function') continue;
  const origEvaluate = sm.evaluate.bind(sm);
  sm.evaluate = async (autostart = true) => {
    logEvaluate(blockId, sm.code);
    return origEvaluate(autostart);
  };
}

// --- footer: PID display + Download log ---------------------------------

const footer = el('footer', { class: 'footer' });
footer.appendChild(el('p', { class: 'pid', text: `Participant: ${PID}` }));
const dlBtn = el('button', { type: 'button', class: 'download', text: 'Download log' });
dlBtn.addEventListener('click', downloadLog);
footer.appendChild(dlBtn);
document.querySelector('main').appendChild(footer);
