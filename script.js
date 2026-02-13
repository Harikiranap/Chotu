document.addEventListener('DOMContentLoaded', () => {
    // 1. Envelope Interaction
    const envelope = document.querySelector('.envelope-container');
    const letter = document.querySelector('.letter');
    
    // Add click event to open/close
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            createConfetti();
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
    const animatedElements = document.querySelectorAll('.gallery-item, .section-title, .instruction');
    
    // Initial styles for animation
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3. Optional Music Player Logic
    const playBtn = document.getElementById('play-pause');
    const audio = new Audio('music.mp3'); // Placeholder for user's music file
    let isPlaying = false;

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                audio.play().catch(e => console.log("Audio file not found or interaction required"));
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. Dynamic Greeting based on time (Optional but nice)
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('h1');
    if (hour < 12) {
        // morning specific if needed
    } else if (hour > 18) {
        // evening specific if needed
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

