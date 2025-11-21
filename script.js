// পার্টির তারিখ সেট করো: 17 ডিসেম্বর, 2026, সকাল 9:00 টা 
const partyDate = new Date("Dec 17, 2026 09:00:00").getTime();

// --- কাউন্টডাউন টাইমার ফাংশন ---
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = partyDate - now;
    
    // গণনার সূত্র
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // HTML এলিমেন্টে মানগুলি দেখাও (00 ফরম্যাটে)
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    // যদি পার্টি শেষ হয়ে যায়
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown-timer").innerHTML = "<p class='party-message'>🎉 পার্টি শুরু হয়ে গেছে! সকলকে স্বাগতম! 🎉</p>";
    }
}, 1000); 


// --- স্ক্রোল অ্যানিমেশন ফাংশন (Animation on Scroll) ---

const contentSections = document.querySelectorAll('.content-section');

function checkVisibility() {
    // প্রতিটা সেকশনের জন্য চেক করা হবে
    contentSections.forEach(section => {
        // সেকশনের উপরের প্রান্ত স্ক্রিনের নিচে থেকে কত দূরে
        const sectionTop = section.getBoundingClientRect().top;
        
        // যদি সেকশনটি স্ক্রিনের মাঝামাঝি চলে আসে (অর্থাৎ 80% ভিউপোর্ট উচ্চতার উপরে)
        if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add('fade-in'); // CSS ক্লাস যোগ করা হলো
        }
    });
}

// লোড হওয়ার সময় একবার এবং স্ক্রোল করার সময় ফাংশনটি চালানো
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


// --- 🌟 Lightbox কার্যকারিতা 🌟 ---

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-media'); // গ্যালারির সব ছবি ও ভিডিও সিলেক্ট করা হলো

// ১. Lightbox খোলার ফাংশন
function openLightbox(mediaSrc, mediaType) {
    // আগের কন্টেন্ট পরিষ্কার করা
    lightboxContent.innerHTML = ''; 
    
    // ছবি অথবা ভিডিও ট্যাগ তৈরি করা
    if (mediaType === 'IMG') {
        const img = document.createElement('img');
        img.src = mediaSrc;
        lightboxContent.appendChild(img);
    } else if (mediaType === 'VIDEO') {
        const video = document.createElement('video');
        video.src = mediaSrc;
        video.setAttribute('controls', 'true');
        video.setAttribute('autoplay', 'true'); // স্বয়ংক্রিয়ভাবে প্লে শুরু হবে
        video.loop = true; // লুপ করা ভালো অভিজ্ঞতার জন্য
        lightboxContent.appendChild(video);
    }
    
    // Lightbox দেখানো
    lightbox.style.display = 'block';
}

// ২. গ্যালারি আইটেমগুলিতে ক্লিক লিসেনার যোগ করা
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        let src = '';
        let type = '';
        
        if (item.tagName === 'IMG') {
            // যদি ছবিটি হয়
            src = item.src;
            type = 'IMG';
        } else if (item.tagName === 'VIDEO') {
            // যদি ভিডিও হয়, Source ট্যাগের src নিতে হবে
            const source = item.querySelector('source');
            if (source) {
                src = source.src;
                type = 'VIDEO';
            }
        }

        if (src) {
            openLightbox(src, type);
        }
    });
});


// ৩. Lightbox বন্ধ করার জন্য ইভেন্ট লিসেনার
// বন্ধ করার বাটন
closeBtn.onclick = function() {
    lightbox.style.display = "none";
    // বন্ধ করার সময় ভিডিও প্লে হওয়া বন্ধ করতে হবে
    lightboxContent.innerHTML = ''; 
}

// স্ক্রিনের বাইরে ক্লিক করলে বন্ধ হবে
lightbox.onclick = function(event) {
    // যদি সরাসরি lightbox DIV-এ ক্লিক করা হয়, তবে বন্ধ করো
    if (event.target === lightbox) {
        lightbox.style.display = "none";
        lightboxContent.innerHTML = '';
    }
}