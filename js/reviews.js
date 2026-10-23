// Player and parent reviews on Home. Reads published reviews from the Apps Script web app named in
// data-endpoint on #reviews and posts new ones to it (see Goliath/reviews/reviews.gs).
// The block stays hidden until an endpoint is set. data-endpoint="demo" uses sample data for testing.
(function () {
  var root = document.getElementById('reviews');
  if (!root) return;
  var endpoint = (root.getAttribute('data-endpoint') || '').trim();
  if (!endpoint) return;
  var demo = endpoint === 'demo';
  root.hidden = false;

  var list = root.querySelector('.reviews__list');
  var summary = root.querySelector('.reviews__summary');
  var more = root.querySelector('.reviews__more');
  var form = root.querySelector('.review-form');
  var status = root.querySelector('.review-form__status');
  var count = document.getElementById('rv-count');
  var text = document.getElementById('rv-text');
  var SHOW = 6;
  var reviews = [];
  var shown = SHOW;
  var opened = Date.now();

  function stars(n, size) {
    var wrap = document.createElement('div');
    wrap.className = 'gl-quote__stars review-stars';
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', n + ' out of 5 stars');
    for (var i = 1; i <= 5; i++) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'gl-icon' + (i <= n ? '' : ' review-stars__off'));
      svg.setAttribute('width', size || 18);
      svg.setAttribute('height', size || 18);
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#i-star');
      svg.appendChild(use);
      wrap.appendChild(svg);
    }
    return wrap;
  }

  function when(iso) {
    var d = iso ? new Date(iso + 'T12:00:00') : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' }) : '';
  }

  function card(r) {
    var fig = document.createElement('figure');
    fig.className = 'gl-quote review-card';
    fig.appendChild(stars(r.rating));
    var bq = document.createElement('blockquote');
    bq.className = 'gl-quote__text';
    var p = document.createElement('p');
    p.textContent = r.text;
    bq.appendChild(p);
    fig.appendChild(bq);
    var cap = document.createElement('figcaption');
    cap.className = 'gl-quote__meta';
    var name = document.createElement('span');
    name.className = 'gl-quote__name';
    name.textContent = r.name;
    var role = document.createElement('span');
    role.textContent = [r.role, r.club, when(r.date)].filter(Boolean).join('. ');
    cap.appendChild(name);
    cap.appendChild(role);
    fig.appendChild(cap);
    return fig;
  }

  function render() {
    list.textContent = '';
    reviews.slice(0, shown).forEach(function (r) { list.appendChild(card(r)); });
    more.hidden = reviews.length <= shown;
    summary.textContent = '';
    if (!reviews.length) {
      summary.textContent = 'No reviews yet. Be the first.';
      return;
    }
    var avg = Math.round(reviews.reduce(function (s, r) { return s + r.rating; }, 0) / reviews.length * 10) / 10;
    summary.appendChild(stars(Math.round(avg), 22));
    var t = document.createElement('span');
    t.textContent = avg.toFixed(1) + ' out of 5 from ' + reviews.length + (reviews.length === 1 ? ' review.' : ' reviews.');
    summary.appendChild(t);
  }

  more.addEventListener('click', function () { shown += SHOW; render(); });

  function load() {
    if (demo) {
      reviews = [
        { name: 'Sample P.', role: 'Parent or guardian', club: 'Fish Hoek High', rating: 5, date: '2026-10-20', text: 'Sample review for testing the layout. Real reviews replace this once the reviews sheet is connected.' },
        { name: 'Sample T.', role: 'Player', club: '', rating: 4, date: '2026-10-18', text: 'Second sample review, four stars, to check the stars and the average.' }
      ];
      return render();
    }
    fetch(endpoint, { method: 'GET' })
      .then(function (r) { return r.json(); })
      .then(function (d) { reviews = (d && d.reviews) || []; render(); })
      .catch(function () { summary.textContent = 'Reviews could not load right now.'; });
  }

  text.addEventListener('input', function () { count.textContent = text.value.length + ' / 600'; });

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'review-form__status t-small ' + (ok ? 'is-ok' : 'is-err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var rating = form.querySelector('input[name="rating"]:checked');
    var data = {
      name: f.name.value.trim(), role: f.role.value, club: f.club.value.trim(), text: f.text.value.trim(),
      rating: rating ? Number(rating.value) : 0, consent: f.consent.checked, website: f.website.value,
      elapsed: Date.now() - opened
    };
    if (!data.rating) return say('Choose a rating from 1 to 5 stars.');
    if (data.name.length < 2) return say('Add your name.');
    if (data.text.length < 20) return say('Write a little more: at least 20 characters.');
    if (!data.consent) return say('Tick the box to say we can show your review.');

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    say('Posting your review…', true);
    var send = demo
      ? Promise.resolve({ ok: true, status: 'Published', review: { name: data.name, role: data.role, club: data.club, rating: data.rating, text: data.text, date: new Date().toISOString().slice(0, 10) } })
      : fetch(endpoint, { method: 'POST', body: JSON.stringify(data) }).then(function (r) { return r.json(); });
    send.then(function (res) {
      btn.disabled = false;
      if (!res || !res.ok) return say((res && res.error) || 'That did not go through. Please try again.');
      form.reset();
      count.textContent = '0 / 600';
      opened = Date.now();
      if (res.status === 'Published' && res.review) {
        reviews.unshift(res.review);
        render();
        say('Thank you. Your review is up.', true);
        list.firstChild && list.firstChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        say('Thank you. Your review will show once the coach has had a look.', true);
      }
    }, function () {
      btn.disabled = false;
      say('That did not go through. Check your connection and try again.');
    });
  });

  load();
})();
