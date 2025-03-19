// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Hide scroll indicator when scrolling
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 50) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// Cursor following effect for the floating image
const floatingImage = document.querySelector('.floating-image');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 20;
    mouseY = (e.clientY - window.innerHeight / 2) / 20;
});

function animate() {
    const time = Date.now() / 1000;
    const floatX = Math.sin(time) * 5;
    const floatY = Math.cos(time) * 5;
    
    floatingImage.style.transform = `translate(calc(-50% + ${mouseX + floatX}px), calc(-50% + ${mouseY + floatY}px))`;
    requestAnimationFrame(animate);
}

animate();

// Smooth scroll functionality
document.getElementById('memes-link').addEventListener('click', function(e) {
    e.preventDefault();
    const memesSection = document.querySelector('.memes-section');
    memesSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll arrow visibility
const scrollArrow = document.querySelector('.scroll-arrow');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        scrollArrow.classList.add('hidden');
    } else {
        scrollArrow.classList.remove('hidden');
    }
});

// Make scroll arrow clickable
scrollArrow.addEventListener('click', function() {
    const memesSection = document.querySelector('.memes-section');
    memesSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to top on page load
window.onload = function() {
    window.scrollTo(0, 0);
}

// Dollar bills animation with consistent count
const billsContainer = document.querySelector('.falling-bills');
const MAX_BILLS = 15; // Maximum number of bills allowed at once

function createDollarBill() {
    // Check if we've reached the maximum number of bills
    if (billsContainer.children.length >= MAX_BILLS) {
        return;
    }

    const bill = document.createElement('img');
    bill.src = 'assets/100dollar.png';
    bill.className = 'dollar-bill';
    bill.style.left = Math.random() * 100 + '%';
    
    // Remove the bill when animation ends
    bill.addEventListener('animationend', () => {
        bill.remove();
    });
    
    billsContainer.appendChild(bill);
}

// Create initial bills with delay
for(let i = 0; i < 5; i++) {
    setTimeout(() => createDollarBill(), i * 200);
}

// Create new bills periodically, but only if under the maximum
setInterval(() => {
    if (billsContainer.children.length < MAX_BILLS) {
        createDollarBill();
    }
}, 1000);

// Music Player
const tracks = [
    { src: 'assets/ye.mp3', name: 'Ye' },
    { src: 'assets/weekend.mp3', name: 'Weekend' },
    { src: 'assets/travis.mp3', name: 'Travis' }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();
audio.volume = 0.5; // Set initial volume to 50%

// Get DOM elements
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackName = document.querySelector('.track-name');

// Load first track
audio.src = tracks[currentTrackIndex].src;
updateTrackName();

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audio.play();
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack();
});

// Next track
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Auto-play next track when current one ends
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});

function loadTrack() {
    audio.src = tracks[currentTrackIndex].src;
    updateTrackName();
    if (isPlaying) {
        audio.play();
    }
}

function updateTrackName() {
    trackName.textContent = `Now Playing: ${tracks[currentTrackIndex].name}`;
} 
