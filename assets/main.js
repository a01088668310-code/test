(() => {
  const body = document.body;
  const hdr = document.querySelector('.hdr');
  const fab = document.querySelector('.fab');

  // header state
  const onScroll = () => {
    const y = scrollY;
    hdr && hdr.classList.toggle('solid', y > 40);
    fab && fab.classList.toggle('on', y > 600);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile drawer
  const burger = document.querySelector('.burger');
  burger && burger.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
    body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.drawer a').forEach(a => a.addEventListener('click', () => {
    body.classList.remove('menu-open'); body.style.overflow = '';
  }));

  // reveal on scroll
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv, .img-rv, .proc').forEach(el => io.observe(el));

  // counters
  const cio = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, dur = 1600, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), v = Math.round(to * (1 - Math.pow(1 - p, 4)));
      el.textContent = el.dataset.plain != null ? v : v.toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  }), { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // hero slideshow
  const slides = document.querySelectorAll('.hero-slides figure');
  const tabs = document.querySelectorAll('.hero-bar[data-sync] a');
  if (slides.length > 1) {
    let i = 0;
    const show = n => {
      slides.forEach((s, k) => s.classList.toggle('on', k === n));
      tabs.forEach((t, k) => t.classList.toggle('on', k === n));
      i = n;
    };
    let timer = setInterval(() => show((i + 1) % slides.length), 6000);
    tabs.forEach((t, k) => t.addEventListener('mouseenter', () => {
      clearInterval(timer); show(k);
      timer = setInterval(() => show((i + 1) % slides.length), 6000);
    }));
  }

  // only one FAQ open at a time
  document.querySelectorAll('.faq details').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach(o => o !== d && (o.open = false));
  }));

  // inquiry form -> mailto
  const form = document.getElementById('inquiry');
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const svc = f.getAll('service').join(', ') || '미선택';
    const subject = `[홈페이지 상담문의] ${f.get('company')} / ${svc}`;
    const lines = [
      `회사(기관)명: ${f.get('company')}`, `담당자: ${f.get('name')}`, `연락처: ${f.get('phone')}`,
      `이메일: ${f.get('email') || '-'}`, `문의 서비스: ${svc}`, `현장 위치: ${f.get('site') || '-'}`,
      '', f.get('message') || ''
    ];
    location.href = `mailto:0522joung@hanmail.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    const done = form.querySelector('.form-done');
    done && (done.hidden = false);
  });

  // year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
