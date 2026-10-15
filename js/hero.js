// Home hero slideshow: crossfades through every site photo with a slow Ken Burns zoom.
// The dark overlay and grain stay on top, so the text and layout never change.
// Only the next photo is fetched, just before it is shown, and at most two are in the page.
(function () {
  var hero = document.querySelector('.hero-slideshow');
  if (!hero) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (reduce || saveData) return;

  var slides;
  try { slides = JSON.parse(hero.getAttribute('data-slides') || '[]'); } catch (e) { return; }
  if (!slides.length) return;

  var SHOW = 6000;   // time each photo is on screen
  var FADE = 1600;   // crossfade, keep in step with .hero-slide in site.css
  var overlay = hero.querySelector('.gl-photo__overlay');
  var current = hero.querySelector('.hero-slide');
  var index = -1;    // position in slides; the first photo is already in the HTML
  var kb = 1;
  var timer = null;
  var visible = true;
  var busy = false;

  function load(slide) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.className = 'gl-photo__img hero-slide';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.decoding = 'async';
      img.sizes = '100vw';
      img.srcset = slide.srcset;
      img.src = slide.src;
      img.onload = function () { (img.decode ? img.decode() : Promise.resolve()).then(function () { resolve(img); }, function () { resolve(img); }); };
      img.onerror = reject;
    });
  }

  function advance() {
    if (busy || !visible || document.hidden) return schedule();
    busy = true;
    var next = (index + 1) % slides.length;
    load(slides[next]).then(function (img) {
      index = next;
      kb = kb % 4 + 1;
      hero.insertBefore(img, overlay);
      void img.offsetWidth; // start the fade from opacity 0
      img.classList.add('is-active', 'kb-' + kb);
      var old = current;
      current = img;
      old.classList.remove('is-active');
      setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); busy = false; }, FADE + 100);
      schedule();
    }, function () { index = next; busy = false; schedule(); });
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(advance, SHOW);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });
  schedule();
})();
