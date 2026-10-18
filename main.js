import { SEGMENTS } from './content.js';

const root = document.getElementById('segments');

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
  const label = el('strong', { text: 'Try: ' });
  p.appendChild(label);
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
