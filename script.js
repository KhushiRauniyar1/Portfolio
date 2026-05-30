// ============== Khushi Rauniyar Portfolio — vanilla JS ==============
document.addEventListener('DOMContentLoaded', () => {

  // ---- Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Navbar scroll state + active link
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = [...document.querySelectorAll('section[id]')];

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));

    // back to top
    document.getElementById('toTop').classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu
  const burger = document.getElementById('hamburger');
  const linksWrap = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    linksWrap.classList.toggle('open');
  });
  linksWrap.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      burger.classList.remove('open');
      linksWrap.classList.remove('open');
    }
  });

  // ---- Typewriter
  const tw = document.getElementById('typewriter');
  const roles = ['Computer Science Student', 'Aspiring Software Developer', 'Tech Enthusiast'];
  let rIdx = 0, cIdx = 0, deleting = false;
  const type = () => {
    const word = roles[rIdx];
    tw.textContent = word.substring(0, cIdx);
    if (!deleting && cIdx < word.length) { cIdx++; setTimeout(type, 80); }
    else if (deleting && cIdx > 0)        { cIdx--; setTimeout(type, 40); }
    else {
      if (!deleting) { deleting = true; setTimeout(type, 1400); }
      else { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(type, 200); }
    }
  };
  type();

  // ---- Back to top
  document.getElementById('toTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // ---- Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Skill bars animate when section visible
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.bar').forEach(b => b.classList.add('run')); skillIO.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => skillIO.observe(c));

  // ---- Counters
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1400, start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 && target >= 10 ? '+' : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.num').forEach(n => counterIO.observe(n));

  // ---- Project filtering
  const filters = document.querySelectorAll('#filters .filter');
  const projects = document.querySelectorAll('#projectsGrid .project');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    projects.forEach(p => {
      const show = f === 'all' || p.dataset.cat === f;
      p.style.display = show ? '' : 'none';
    });
  }));

  // ---- Contact form (Formspree)
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = ''; msg.className = 'form-msg';
    const data = new FormData(form);
    if ((data.get('message') + '').trim().length < 5) {
      msg.textContent = 'Please write a longer message.'; msg.classList.add('err'); return;
    }
    submitBtn.disabled = true; const original = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        msg.textContent = '✓ Thank you! Your message has been sent.'; msg.classList.add('ok');
        form.reset();
      } else {
        msg.textContent = 'Something went wrong. Please email me directly.'; msg.classList.add('err');
      }
    } catch {
      msg.textContent = 'Network error. Please try again.'; msg.classList.add('err');
    } finally {
      submitBtn.disabled = false; submitBtn.textContent = original;
    }
  });
});
