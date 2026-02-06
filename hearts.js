// hearts.js - Улучшенные летающие сердечки
document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartTypes = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
    const colors = ['#ff6b8b', '#ff8e6b', '#6b8bff', '#ff6bd6', '#6bff8e', '#ffd166'];
    
    // Создание сердечек при загрузке
    function createInitialHearts() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createFloatingHeart(), i * 100);
        }
    }
    
    // Создание одного летающего сердечка
    function createFloatingHeart(x = null, y = null) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        const size = Math.random() * 30 + 20;
        const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 10 + 8;
        const startX = x !== null ? x : Math.random() * window.innerWidth;
        const startY = y !== null ? y : window.innerHeight + 50;
        const sway = Math.random() * 200 - 100;
        
        heart.innerHTML = heartType;
        heart.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            font-size: ${size}px;
            color: ${color};
            pointer-events: none;
            z-index: 999;
            opacity: ${Math.random() * 0.5 + 0.3};
            filter: drop-shadow(0 0 10px ${color});
            transform: translateY(0) rotate(0deg);
            user-select: none;
            transition: opacity 0.5s;
        `;
        
        heartsContainer.appendChild(heart);
        
        // Анимация полета
        const keyframes = [
            { 
                transform: `translateY(0px) translateX(0px) rotate(0deg) scale(1)`,
                opacity: heart.style.opacity
            },
            { 
                transform: `translateY(-${window.innerHeight + 200}px) translateX(${sway}px) rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`,
                opacity: 0
            }
        ];
        
        const animation = heart.animate(keyframes, {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Удаление после анимации
        animation.onfinish = () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
            // Создание нового сердечка
            if (document.hasFocus()) {
                setTimeout(() => createFloatingHeart(), Math.random() * 3000);
            }
        };
    }
    
    // Создание сердечек при клике
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    e.clientX + (Math.random() * 100 - 50),
                    e.clientY + (Math.random() * 100 - 50)
                );
            }, i * 100);
        }
    });
    
    // Создание сердечек при движении мыши
    let mouseMoveTimer;
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.9) {
            clearTimeout(mouseMoveTimer);
            mouseMoveTimer = setTimeout(() => {
                createFloatingHeart(
                    e.clientX + (Math.random() * 80 - 40),
                    e.clientY + (Math.random() * 80 - 40)
                );
            }, 50);
        }
    });
    
    // Автоматическое создание сердечек
    setInterval(() => {
        if (document.hasFocus()) {
            createFloatingHeart();
        }
    }, 1500);
    
    // Запуск
    createInitialHearts();
    
    // Экспорт функции для использования в других скриптах
    window.createHeart = createFloatingHeart;
});