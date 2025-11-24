// পার্টির তারিখ সেট করো: 17 ডিসেম্বর, 2026, সকাল 9:00 টা 
const partyDate = new Date("Dec 17, 2026 09:00:00").getTime();

// --- ১. কাউন্টডাউন টাইমার ফাংশন ---
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


// --- ২. Lightbox কার্যকারিতা ---

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-media'); 

function openLightbox(mediaSrc, mediaType) {
    lightboxContent.innerHTML = ''; 
    
    if (mediaType === 'IMG') {
        const img = document.createElement('img');
        img.src = mediaSrc;
        lightboxContent.appendChild(img);
    } else if (mediaType === 'VIDEO') {
        const video = document.createElement('video');
        video.src = mediaSrc;
        video.setAttribute('controls', 'true');
        video.setAttribute('autoplay', 'true'); 
        video.loop = true; 
        lightboxContent.appendChild(video);
    }
    
    lightbox.style.display = 'block';
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        let src = '';
        let type = '';
        
        if (item.tagName === 'IMG') {
            src = item.src;
            type = 'IMG';
        } else if (item.tagName === 'VIDEO') {
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

closeBtn.onclick = function() {
    lightbox.style.display = "none";
    // বন্ধ করার সময় ভিডিও প্লে হওয়া বন্ধ করতে হবে
    lightboxContent.innerHTML = ''; 
}

lightbox.onclick = function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
        lightboxContent.innerHTML = '';
    }
}

// --- ৩. ScrollReveal এর মাধ্যমে হেভি অ্যানিমেশন যোগ করা ---

// ScrollReveal ইনিশিয়ালাইজ করা
ScrollReveal({ 
    distance: '60px', 
    duration: 2000,   
    easing: 'cubic-bezier(.5, 0, 0, 1)', 
    reset: false      
});

// A. হিরো সেকশনের উপাদান
ScrollReveal().reveal('.main-logo', { delay: 300, origin: 'top' });
ScrollReveal().reveal('.hero-section h2', { delay: 500, origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.theme', { delay: 700, origin: 'left' });
ScrollReveal().reveal('.time-box', { delay: 800, origin: 'top', interval: 150 }); 

// B. ইভেন্টের বিবরণ সেকশন
ScrollReveal().reveal('#description h2', { delay: 200, origin: 'left' });
ScrollReveal().reveal('#description p', { delay: 400, origin: 'right' });
ScrollReveal().reveal('.details-box', { delay: 600, origin: 'bottom', scale: 0.8 }); 

// C. আয়োজক দল (Mastermind) সেকশন
ScrollReveal().reveal('#masterminds h2', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.main-mastermind', { delay: 500, origin: 'left', rotate: { x: 90, z: 0 } }); 
ScrollReveal().reveal('.co-mastermind-row .mastermind-card', { delay: 700, origin: 'bottom', interval: 150, scale: 0.9 }); 

// D. গ্যালারি সেকশন
ScrollReveal().reveal('#gallery h2', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.gallery-media', { 
    delay: 400, 
    origin: 'right', 
    interval: 100, 
    easing: 'ease-in-out',
    duration: 1200
});
