// hearts.js - Анимация летающих сердечек

document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartColors = ['#ff6b8b', '#ff8e6b', '#6b8bff', '#ff6bd6', '#6bff8e'];
    const heartIcons = ['❤️', '💖', '💗', '💓', '💞', '💕'];
    
    // Создание сердечек при загрузке
    function createInitialHearts() {
        for (let i = 0; i < 25; i++) {
            setTimeout(() => createHeart(), i * 150);
        }
    }
    
    // Функция создания одного сердечка
    function createHeart(x = null, y = null, size = null) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Случайные свойства
        const posX = x !== null ? x : Math.random() * window.innerWidth;
        const posY = y !== null ? y : window.innerHeight + 50;
        const heartSize = size !== null ? size : Math.random() * 20 + 10;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        const icon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        const sway = Math.random() * 100 - 50;
        
        // Установка стилей
        heart.innerHTML = icon;
        heart.style.cssText = `
            position: fixed;
            left: ${posX}px;
            top: ${posY}px;
            font-size: ${heartSize}px;
            color: ${color};
            pointer-events: none;
            z-index: 999;
            opacity: ${Math.random() * 0.7 + 0.3};
            transform: translateY(0) rotate(0deg);
            user-select: none;
            text-shadow: 0 0 10px ${color}80;
        `;
        
        heartsContainer.appendChild(heart);
        
        // Анимация полета
        const keyframes = [
            { 
                transform: `translateY(0px) translateX(0px) rotate(0deg)`, 
                opacity: heart.style.opacity 
            },
            { 
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${sway}px) rotate(${Math.random() * 360}deg)`, 
                opacity: 0 
            }
        ];
        
        const options = {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
            fill: 'forwards'
        };
        
        const animation = heart.animate(keyframes, options);
        
        // Удаление после завершения анимации
        animation.onfinish = () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
            // Создание нового сердечка
            if (document.hasFocus()) {
                setTimeout(() => createHeart(), Math.random() * 2000);
            }
        };
    }
    
    // Создание сердечек при клике
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createHeart(
                    e.clientX + (Math.random() * 100 - 50),
                    e.clientY,
                    Math.random() * 25 + 15
                );
            }, i * 100);
        }
    });
    
    // Создание сердечек при движении мыши
    let mouseTimer;
    document.addEventListener('mousemove', function(e) {
        clearTimeout(mouseTimer);
        
        mouseTimer = setTimeout(() => {
            if (Math.random() > 0.7) {
                createHeart(
                    e.clientX + (Math.random() * 80 - 40),
                    e.clientY + (Math.random() * 80 - 40),
                    Math.random() * 15 + 8
                );
            }
        }, 100);
    });
    
    // Создание сердечек каждые несколько секунд
    setInterval(() => {
        if (document.hasFocus() && Math.random() > 0.5) {
            createHeart();
        }
    }, 2000);
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', function() {
        // Удаляем все сердечки при сильном изменении размера
        if (window.resizeTimer) clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            document.querySelectorAll('.floating-heart').forEach(heart => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            });
        }, 1000);
    });
    
    // Запуск
    createInitialHearts();
    
    // Дополнительная функция для создания сердечка вручную
    window.createValentineHeart = function(x, y, size) {
        createHeart(x, y, size);
    };
    
    console.log('💝 Valentine hearts initialized!');
});