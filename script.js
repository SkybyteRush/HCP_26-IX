(() => {
  'use strict';
  // Preserve original start target and local-time interpretation.
  const targetDate = new Date("Nov 17, 2026 09:00:00").getTime();
  const eventEnd = new Date("Nov 17, 2026 18:00:00").getTime();
  const countdown = document.getElementById('countdown');
  const note = document.getElementById('countdown-note');
  const parts = {days: document.getElementById('days'), hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds')};
  const pad = n => String(n).padStart(2, '0');
  function updateCountdown() {
    const now = Date.now();
    if (now >= eventEnd) {
      Object.values(parts).forEach(el => { if (el) el.textContent = '00'; });
      if (note) note.textContent = 'অনুষ্ঠানটি সুন্দরভাবে সম্পন্ন হয়েছে — স্মৃতিগুলো থাকুক সাথে';
      if (countdown) countdown.setAttribute('aria-label', 'অনুষ্ঠানটি সম্পন্ন হয়েছে');
      return false;
    }
    if (now >= targetDate) {
      Object.values(parts).forEach(el => { if (el) el.textContent = '00'; });
      if (note) note.textContent = 'অনুষ্ঠান চলছে — HDSC-তে দেখা হচ্ছে!';
      if (countdown) countdown.setAttribute('aria-label', 'অনুষ্ঠান এখন চলছে');
      return true;
    }
    const diff = targetDate - now;
    const v = {days: Math.floor(diff / 86400000), hours: Math.floor(diff % 86400000 / 3600000), minutes: Math.floor(diff % 3600000 / 60000), seconds: Math.floor(diff % 60000 / 1000)};
    Object.entries(v).forEach(([key, value]) => { if (parts[key]) parts[key].textContent = pad(value); });
    if (countdown) countdown.setAttribute('aria-label', `${v.days} দিন, ${v.hours} ঘণ্টা, ${v.minutes} মিনিট, ${v.seconds} সেকেন্ড বাকি`);
    return true;
  }
  updateCountdown();
  const timer = setInterval(() => { if (!updateCountdown()) clearInterval(timer); }, 1000);

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (toggle && nav) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'মেনু খুলুন'); nav.classList.remove('is-open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) close(); });
  }
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: 0.12});
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('is-visible'));

  // Keep the original Google Apps Script endpoint, field names, and values.
  const scriptURL = 'https://script.google.com/macros/s/AKfycby6nDYUKcnd7rHaHdbyPXX02rLeIZOicX6IIuXht63tAgzUVMm5ew39dMMXacZR_2YbGg/exec';
  const form = document.getElementById('rsvp-form');
  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('status-msg');
  const label = btn && btn.querySelector('span');
  if (form && btn && msg) form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    btn.disabled = true;
    if (label) label.textContent = 'পাঠানো হচ্ছে...';
    msg.classList.add('hidden');
    msg.classList.remove('error');
    try {
      await fetch(scriptURL, {method: 'POST', body: new FormData(form)});
      msg.textContent = 'সফলভাবে পাঠানো হয়েছে! ✅';
      msg.classList.remove('hidden');
      form.reset();
    } catch (error) {
      msg.textContent = 'ভুল হয়েছে! আবার চেষ্টা করুন।';
      msg.classList.add('error');
      msg.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      if (label) label.textContent = 'CONFIRM RSVP';
    }
  });
})();

