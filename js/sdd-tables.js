/* Explain overflow only where it occurs; keep the table readable without JS. */
document.querySelectorAll('.post-content .table-scroll').forEach((region) => {
  const hint = region.previousElementSibling;
  if (!hint || !hint.classList.contains('table-scroll-hint')) return;

  const update = () => {
    const overflows = region.scrollWidth > region.clientWidth + 1;
    hint.hidden = !overflows;
    region.tabIndex = overflows ? 0 : -1;
    if (overflows) region.setAttribute('aria-describedby', hint.id);
    else region.removeAttribute('aria-describedby');
  };

  update();
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(update);
    observer.observe(region);
    observer.observe(region.querySelector('table'));
  } else {
    window.addEventListener('resize', update);
  }
});
