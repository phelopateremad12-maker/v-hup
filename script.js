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

    // --- Rainy Hearts Effect ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        // Randomize starting position, size, and fall duration
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px'; // 10px to 25px
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4s to 7s

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes to prevent memory leaks
        setTimeout(() => {
            heart.remove();
        }, 7000); // Max duration is 7s
    }

    // Generate hearts continuously
    setInterval(createHeart, 300); // A new heart every 300ms

    // --- Navigation Logic ---
    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        
        // Wait for fade out
        setTimeout(() => {
            hideScreen.classList.add('hidden');
            showScreen.classList.remove('hidden');
            
            // Trigger reflow for animation
            void showScreen.offsetWidth;
            
            showScreen.classList.add('active');
        }, 500);
    }

    // --- Password Validation ---
    function checkPassword() {
        if (passwordInput.value === '12525') {
            errorMessage.classList.add('hidden');
            switchScreen(passwordScreen, video1Screen);
            
            // Try to auto-play, though browsers might block it until interacted
            setTimeout(() => {
                video1.play().catch(e => console.log("Autoplay blocked, user must click play."));
            }, 600);
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
            
            // Trigger shake animation again
            errorMessage.style.animation = 'none';
            void errorMessage.offsetWidth;
            errorMessage.style.animation = 'shake 0.5s';
        }
    }

    loginBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // --- Video 1 Logic ---
    video1.addEventListener('ended', () => {
        next1Btn.classList.remove('hidden');
    });

    next1Btn.addEventListener('click', () => {
        switchScreen(video1Screen, video2Screen);
        setTimeout(() => {
            video2.play().catch(e => console.log("Autoplay blocked, user must click play."));
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
        // Reset state
        next1Btn.classList.add('hidden');
        next2Btn.classList.add('hidden');
        passwordInput.value = '';
        switchScreen(finalScreen, passwordScreen);
    });
});
