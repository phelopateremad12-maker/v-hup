document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const passwordScreen = document.getElementById('password-screen');
    const video1Screen = document.getElementById('video1-screen');
    const video2Screen = document.getElementById('video2-screen');
    const finalScreen = document.getElementById('final-screen');
    
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    
    const video1 = document.getElementById('video1');
    const next1Btn = document.getElementById('next1-btn');
    
    const video2 = document.getElementById('video2');
    const next2Btn = document.getElementById('next2-btn');

    const replayBtn = document.getElementById('replay-btn');
    const heartsContainer = document.getElementById('hearts-container');
    const photoGrid = document.getElementById('photo-grid');
    const bgMusic = document.getElementById('bg-music');

    // --- Audio Logic ---
    function playAudio() {
        bgMusic.play().catch(e => console.log("Audio autoplay blocked", e));
    }

    function pauseAudio() {
        bgMusic.pause();
    }

    video1.addEventListener('play', pauseAudio);
    video1.addEventListener('pause', playAudio);
    video1.addEventListener('ended', playAudio);

    video2.addEventListener('play', pauseAudio);
    video2.addEventListener('pause', playAudio);
    video2.addEventListener('ended', playAudio);

    // --- Photo Rain Effect ---
    const photos = [
        "WhatsApp Image 2026-05-12 at 12.49.06 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.07 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.08 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.08 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.09 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.09 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.10 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.10 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.10 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.10 AM (4).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.10 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.11 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.11 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.11 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.11 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.12 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.12 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.12 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.12 AM (4).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.12 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM (4).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM (5).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.13 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (4).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (5).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM (6).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.14 AM.jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.15 AM (1).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.15 AM (2).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.15 AM (3).jpeg",
        "WhatsApp Image 2026-05-12 at 12.49.15 AM.jpeg"
    ];

    function createFallingPhoto() {
        const img = document.createElement('img');
        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        img.src = randomPhoto;
        img.classList.add('falling-photo');
        
        // Random start position and animation duration
        img.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 4 + 4; // 4 to 8 seconds
        img.style.animationDuration = duration + 's';

        document.body.appendChild(img);

        // When animation ends, add to grid
        setTimeout(() => {
            img.remove();
            addPhotoToGrid(randomPhoto);
        }, duration * 1000);
    }

    function addPhotoToGrid(photoSrc) {
        // Prevent grid from having too many photos and crashing browser
        if (photoGrid.children.length > 200) return;

        const gridImg = document.createElement('img');
        gridImg.src = photoSrc;
        gridImg.classList.add('grid-photo');
        photoGrid.appendChild(gridImg);
    }

    // Generate falling photos periodically
    setInterval(createFallingPhoto, 1500); // 1 photo every 1.5s

    // Still keep some rainy hearts for extra effect
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }
    setInterval(createHeart, 500);

    // --- Navigation Logic ---
    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        setTimeout(() => {
            hideScreen.classList.add('hidden');
            showScreen.classList.remove('hidden');
            void showScreen.offsetWidth;
            showScreen.classList.add('active');
        }, 500);
    }

    // --- Password Validation ---
    function checkPassword() {
        if (passwordInput.value === '12525') {
            errorMessage.classList.add('hidden');
            playAudio(); // Start background music on unlock
            switchScreen(passwordScreen, video1Screen);
            
            setTimeout(() => {
                video1.play().catch(e => console.log("Autoplay blocked"));
            }, 600);
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
            errorMessage.style.animation = 'none';
            void errorMessage.offsetWidth;
            errorMessage.style.animation = 'shake 0.5s';
        }
    }

    loginBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // --- Video 1 Logic ---
    video1.addEventListener('ended', () => {
        next1Btn.classList.remove('hidden');
    });

    next1Btn.addEventListener('click', () => {
        switchScreen(video1Screen, video2Screen);
        setTimeout(() => {
            video2.play().catch(e => console.log("Autoplay blocked"));
        }, 600);
    });

    // --- Video 2 Logic ---
    video2.addEventListener('ended', () => {
        next2Btn.classList.remove('hidden');
    });

    next2Btn.addEventListener('click', () => {
        switchScreen(video2Screen, finalScreen);
    });

    // --- Final Screen Logic ---
    replayBtn.addEventListener('click', () => {
        next1Btn.classList.add('hidden');
        next2Btn.classList.add('hidden');
        passwordInput.value = '';
        pauseAudio();
        bgMusic.currentTime = 0;
        switchScreen(finalScreen, passwordScreen);
        // Clear grid on replay
        photoGrid.innerHTML = '';
    });
});
