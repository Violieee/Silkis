document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.content-section .content-description').forEach((description) => {
    const paragraphs = [...description.children].filter((element) => element.tagName === 'P');
    if (paragraphs.length < 2) return;

    let current = 0;
    const controls = document.createElement('div');
    controls.className = 'paragraph-navigation';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Перемикання абзаців');

    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'paragraph-arrow';
    previous.setAttribute('aria-label', 'Попередній абзац');
    previous.innerHTML = '<span aria-hidden="true">&#8592;</span>';

    const counter = document.createElement('span');
    counter.className = 'paragraph-counter';
    counter.setAttribute('aria-live', 'polite');

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'paragraph-arrow';
    next.setAttribute('aria-label', 'Наступний абзац');
    next.innerHTML = '<span aria-hidden="true">&#8594;</span>';

    controls.append(previous, counter, next);
    description.append(controls);

    function showParagraph(index) {
      current = Math.max(0, Math.min(index, paragraphs.length - 1));
      paragraphs.forEach((p, i) => p.classList.toggle('paragraph-current', i === current));
      counter.textContent = `${current + 1}/${paragraphs.length}`;
      previous.disabled = current === 0;
      next.disabled = current === paragraphs.length - 1;
    }

    previous.addEventListener('click', () => showParagraph(current - 1));
    next.addEventListener('click', () => showParagraph(current + 1));
    description.classList.add('paragraphs-ready');
    showParagraph(0);
  });
});
