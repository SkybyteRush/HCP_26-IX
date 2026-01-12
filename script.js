const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6nDYUKcnd7rHaHdbyPXX02rLeIZOicX6IIuXht63tAgzUVMm5ew39dMMXacZR_2YbGg/exec';

// ১. টাইমস্ট্যাম্প ডাটা হ্যান্ডলিং
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.neon-btn');
    const msg = document.getElementById('status-msg');
    
    btn.innerHTML = "SENDING TO DATA CENTER...";
    btn.disabled = true;

    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(this) })
    .then(res => {
        msg.innerHTML = "SUCCESS! DATA SAVED IN SHEET ✅";
        msg.classList.remove('hidden');
        btn.innerHTML = "DONE";
        this.reset();
    })
    .catch(err => {
        msg.innerHTML = "ERROR! TRY AGAIN.";
        btn.disabled = false;
    });
});

// ২. কাউন্টডাউন টাইমার
const target = new Date("Dec 17, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const d = target - now;
    document.getElementById('days').innerText = Math.floor(d / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes').innerText = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('seconds').innerText = Math.floor((d % (1000 * 60)) / 1000);
}, 1000);

// ৩. স্ক্রল অ্যানিমেশন
ScrollReveal().reveal('.card', { interval: 200, scale: 0.9 });
