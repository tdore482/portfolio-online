// cursor.js
(() => {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // track mouse
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // cursor render position (for smoothing)
  let posX = mouseX;
  let posY = mouseY;

  // smoothing factor (0 < ease < 1). Lower = snappier.
  const ease = 0.16;

  // set initial transform (keeps it offscreen for a split second on load)
  cursor.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;

  // Pointer move updates target
  function onPointerMove(e) {
    // Use pointer events to support stylus/touch pointer types
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Ensure visible
    cursor.style.opacity = 1;
  }

  // Hide cursor on leave (optional)
  function onPointerLeave() {
    cursor.style.opacity = 0;
  }

  // Track hoverable elements to change state
  const hoverableSelector = 'a, button, input, textarea, select, [data-cursor="hover"]';
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest(hoverableSelector);
    if (t) cursor.classList.add('is-hover');
  });
  document.addEventListener('pointerout', (e) => {
    const t = e.target.closest(hoverableSelector);
    if (t) cursor.classList.remove('is-hover');
  });

  // Pointer down/up active effect
  document.addEventListener('pointerdown', () => {
    cursor.classList.add('is-active');
  });
  document.addEventListener('pointerup', () => {
    cursor.classList.remove('is-active');
  });

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('resize', () => {
    // keep cursor inside viewport on resize
    mouseX = Math.min(mouseX, window.innerWidth);
    mouseY = Math.min(mouseY, window.innerHeight);
  });

  // Animation loop (smoothing)
  function loop() {
    // linear interpolation
    posX += (mouseX - posX) * ease;
    posY += (mouseY - posY) * ease;
    cursor.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Optional: hide custom cursor on touch devices (coarse pointer)
  // If browser reports coarse pointer, we hide the custom cursor.
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    document.documentElement.style.cursor = 'auto';
  }
})();
