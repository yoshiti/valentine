// hearts.js - Анимация летающих сердечек для Valentine

document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartColors = ['#ff6b8b', '#ff8e6b', '#6b8bff', '#6bff8e', '#ff6bd6', '#ff8e3b'];
    const heartIcons = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
    
    // Массив активных сердечек
    let activeHearts = [];
    let heartCount = 0;
    const maxHearts = 50;
    
    // Создание начальных сердечек
    function createInitialHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart(
                    Math.random() * window.innerWidth,
                    window.innerHeight + 50,
                    Math.random() * 20 + 15
                );
            }, i * 300);
        }
    }
    
    // Создание одного сердечка
    function createHeart(x, y, size, color = null) {
        if (activeHearts.length >= maxHearts) {
            // Удаляем самое старое сердечко
            const oldestHeart = activeHearts.shift();
            if (oldestHeart && oldestHeart.element.parentNode) {
                oldestHeart.element.parentNode.removeChild(oldestHeart.element);
            }
        }
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.dataset.id = ++heartCount;
        
        // Случайные или заданные параметры
        const posX = x !== undefined ? x : Math.random() * window.innerWidth;
        const posY = y !== undefined ? y : window.innerHeight + 50;
        const heartSize = size !== undefined ? size : Math.random() * 20 + 10;
        const heartColor = color || heartColors[Math.floor(Math.random() * heartColors.length)];
        const icon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 2;
        const sway = Math.random() * 100 - 50;
        const rotation = Math.random() * 360;
        const scale = Math.random() * 0.5 + 0.8;
        
        // Установка начальных стилей
        heart.innerHTML = icon;
        heart.style.cssText = `
            position: fixed;
            left: ${posX}px;
            top: ${posY}px;
            font-size: ${heartSize}px;
            color: ${heartColor};
            pointer-events: none;
            z-index: 9999;
            opacity: ${Math.random() * 0.7 + 0.3};
            transform: translate(0, 0) rotate(${rotation}deg) scale(${scale});
            user-select: none;
            text-shadow: 0 0 20px ${heartColor}80;
            filter: drop-shadow(0 0 10px ${heartColor}50);
            will-change: transform, opacity;
        `;
        
        heartsContainer.appendChild(heart);
        
        // Сохраняем информацию о сердечке
        const heartInfo = {
            element: heart,
            startX: posX,
            startY: posY,
            sway: sway,
            duration: duration,
            scale: scale,
            color: heartColor
        };
        
        activeHearts.push(heartInfo);
        
        // Анимация полета
        animateHeart(heartInfo);
        
        return heart;
    }
    
    // Анимация сердечка
    function animateHeart(heartInfo) {
        const { element, sway, duration, scale } = heartInfo;
        
        const keyframes = [
            { 
                transform: `translate(0, 0) rotate(0deg) scale(${scale})`, 
                opacity: element.style.opacity 
            },
            { 
                transform: `translate(${sway}px, -${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg) scale(${scale * 0.5})`, 
                opacity: 0 
            }
        ];
        
        const options = {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
            fill: 'forwards'
        };
        
        const animation = element.animate(keyframes, options);
        
        // Удаление после завершения анимации
        animation.onfinish = () => {
            // Удаляем из массива активных
            const index = activeHearts.findIndex(h => h.element === element);
            if (index > -1) {
                activeHearts.splice(index, 1);
            }
            
            // Удаляем из DOM
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            
            // Создание нового сердечка
            if (document.hasFocus() && Math.random() > 0.3) {
                setTimeout(() => {
                    createHeart();
                }, Math.random() * 2000 + 1000);
            }
        };
    }
    
    // Создание сердечек при клике
    document.addEventListener('click', function(e) {
        const heartCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                createHeart(
                    e.clientX + (Math.random() * 100 - 50),
                    e.clientY,
                    Math.random() * 25 + 15
                );
            }, i * 100);
        }
        
        // Вибрация на мобильных
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    });
    
    // Создание сердечек при движении мыши
    let mouseTimer;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        clearTimeout(mouseTimer);
        
        mouseTimer = setTimeout(() => {
            if (Math.random() > 0.8) {
                createHeart(
                    e.clientX + (Math.random() * 80 - 40),
                    e.clientY + (Math.random() * 80 - 40),
                    Math.random() * 15 + 8
                );
            }
        }, 150);
    });
    
    // Создание сердечек при скролле
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(() => {
            if (Math.random() > 0.7 && document.hasFocus()) {
                createHeart(
                    Math.random() * window.innerWidth,
                    window.innerHeight * 0.8,
                    Math.random() * 12 + 6
                );
            }
        }, 300);
    });
    
    // Создание сердечек каждые несколько секунд
    const interval = setInterval(() => {
        if (document.hasFocus() && Math.random() > 0.5) {
            createHeart();
        }
    }, 3000);
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', function() {
        // Удаляем все сердечки при сильном изменении размера
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            activeHearts.forEach(heartInfo => {
                if (heartInfo.element.parentNode) {
                    heartInfo.element.parentNode.removeChild(heartInfo.element);
                }
            });
            activeHearts = [];
        }, 500);
    });
    
    // Создание сердечек при касании на мобильных
    let touchTimer;
    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        const heartCount = 2 + Math.floor(Math.random() * 2);
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                createHeart(
                    touch.clientX + (Math.random() * 80 - 40),
                    touch.clientY,
                    Math.random() * 20 + 10
                );
            }, i * 80);
        }
        
        // Вибрация
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
        
        // Долгое нажатие создает больше сердечек
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createHeart(
                        touch.clientX + (Math.random() * 100 - 50),
                        touch.clientY + (Math.random() * 100 - 50),
                        Math.random() * 25 + 15
                    );
                }, i * 50);
            }
            
            if ('vibrate' in navigator) {
                navigator.vibrate([50, 30, 50]);
            }
        }, 500);
    });
    
    document.addEventListener('touchend', function() {
        clearTimeout(touchTimer);
    });
    
    // Создание сердечек при свайпе
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (e.changedTouches.length > 0) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);
            
            if (distance > 50) {
                // Свайп детектирован - создаем сердечки вдоль пути
                const steps = Math.floor(distance / 20);
                for (let i = 0; i < steps; i++) {
                    setTimeout(() => {
                        const progress = i / steps;
                        const x = touchStartX + diffX * progress;
                        const y = touchStartY + diffY * progress;
                        
                        createHeart(
                            x + (Math.random() * 40 - 20),
                            y + (Math.random() * 40 - 20),
                            Math.random() * 10 + 5
                        );
                    }, i * 30);
                }
            }
        }
    });
    
    // Запуск
    createInitialHearts();
    
    // Функция для создания сердечка извне
    window.createValentineHeart = function(x, y, size, color = null) {
        return createHeart(x, y, size, color);
    };
    
    // Статистика сердечек
    window.getHeartStats = function() {
        return {
            active: activeHearts.length,
            created: heartCount,
            max: maxHearts
        };
    };
    
    console.log('💝 Valentine hearts initialized!');
    
    // Создание праздничных сердечек при загрузке определенных секций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Создаем несколько сердечек для праздничного эффекта
                if (entry.target.id === 'header' || entry.target.id === 'quotes') {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            createHeart(
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerHeight,
                                Math.random() * 20 + 10
                            );
                        }, i * 200);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Наблюдаем за секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});