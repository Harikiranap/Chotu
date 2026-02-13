document.addEventListener('DOMContentLoaded', () => {
    // 1. Envelope Interaction
    const envelope = document.querySelector('.envelope-container');
    const letter = document.querySelector('.letter');
    
    // Add click event to open/close
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            createConfetti();
            attemptPlay(); // Try playing audio on interaction
        }
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.gallery-slider, .section-title, .instruction');
    
    // Initial styles for animation
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3. Optional Music Player Logic
    const playBtn = document.getElementById('play-pause');
    const audio = new Audio('music.mp3'); 
    audio.loop = true; // Loop the music
    let isPlaying = false;

    // Function to toggle play/pause
    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            audio.play().catch(e => console.log("Audio play failed:", e));
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    };

    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering other clicks
            togglePlay();
        });
    }

    // Auto-play logic
    const attemptPlay = () => {
        audio.play().then(() => {
            isPlaying = true;
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log("Autoplay prevented by browser. Waiting for interaction.");
            // Fallback: Play on first user interaction (click anywhere)
            const enableAudio = () => {
                audio.play().then(() => {
                    isPlaying = true;
                    if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Update icon
                    document.removeEventListener('click', enableAudio);
                }).catch(err => console.log("Still waiting for interaction"));
            };
            document.addEventListener('click', enableAudio);
        });
    };

    attemptPlay();

    // 4. Dynamic Greeting based on time (Optional but nice)
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('h1');
    if (hour < 12) {
        // morning specific if needed
    } else if (hour > 18) {
        // evening specific if needed
    }
    
    // 5. Love Timer
    const startDate = new Date("2025-01-1 00:00:00"); // REPLACE THIS DATE
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    setInterval(updateTimer, 1000);
    updateTimer();

    // 6. Heart Cursor Trail
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) { // Create heart 10% of the time to avoid lag
            const heart = document.createElement('div');
            heart.classList.add('cursor-heart');
            heart.style.top = e.clientY + 'px';
            heart.style.left = e.clientX + 'px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    });

    // 7. Reasons Generator
    const reasons = [
        "Your smile is my favorite thing in the world.",
        "You make the ordinary moments feel extraordinary.",
        "You are my best friend and my soulmate wrapped in one.",
        "I love how kind you are to everyone you meet.",
        "The way you laugh makes my heart skip a beat.",
        "You support my dreams like no one else.",
        "Just hearing your voice makes my day better.",
        "You accept me exactly as I am.",
        "Every day with you is a new adventure.",
        "You give the warmest, safest hugs.",
        "I love you more than all the stars in the sky."
    ];
    
    const reasonBtn = document.getElementById('reason-btn');
    const reasonText = document.getElementById('reason-text');
    
    if (reasonBtn && reasonText) {
        reasonBtn.addEventListener('click', () => {
            // Fade out
            reasonText.style.opacity = 0;
            
            setTimeout(() => {
                // Change text
                const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
                reasonText.innerText = randomReason;
                // Fade in
                reasonText.style.opacity = 1;
            }, 300);
            
            createConfetti(); // reuse confetti for fun
        });
    }

});

function createConfetti() {
    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f', '#0ff', '#e63946', '#ffccd5'];
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const bg = colors[Math.floor(Math.random() * colors.length)];
        const x = (Math.random() - 0.5) * 500; // Random X distance
        const y = (Math.random() - 1) * 500;   // Random Y distance (upwards)
        const size = Math.random() * 10 + 5;
        
        confetti.style.backgroundColor = bg;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.setProperty('--x', `${x}px`);
        confetti.style.setProperty('--y', `${y}px`);
        
        document.querySelector('.letter-section').appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 1000); // 1s matches animation
    }
}

