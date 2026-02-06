// parallax.js - Эффекты параллакса и анимации
document.addEventListener('DOMContentLoaded', function() {
    // Параллакс для фотографий при движении мыши
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Параллакс для фотографий
        document.querySelectorAll('.photo-frame').forEach((frame, index) => {
            const speed = 0.02;
            const x = (mouseX - 0.5) * speed * 100 * (index % 2 === 0 ? 1 : -1);
            const y = (mouseY - 0.5) * speed * 100;
            
            frame.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Параллакс для цитат
        document.querySelectorAll('.quote-card').forEach((card, index) => {
            const speed = 0.015;
            const x = (mouseX - 0.5) * speed * 80 * ((index + 1) % 3 === 0 ? -1 : 1);
            const y = (mouseY - 0.5) * speed * 80;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Параллакс для заголовка
        const title = document.querySelector('.main-title');
        const speed = 0.005;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        title.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Анимация для фото
                if (entry.target.classList.contains('photo-item')) {
                    const img = entry.target.querySelector('.photo-img');
                    const overlay = entry.target.querySelector('.photo-overlay');
                    const heart = entry.target.querySelector('.photo-heart');
                    
                    setTimeout(() => {
                        if (img) img.classList.remove('grayscale');
                        if (overlay) overlay.style.opacity = '1';
                        if (overlay) overlay.style.transform = 'translateY(0)';
                    }, 300);
                    
                    setTimeout(() => {
                        if (heart) {
                            heart.style.opacity = '1';
                            heart.style.transform = 'scale(1) rotate(360deg)';
                        }
                    }, 600);
                }
            } else {
                // Сброс анимации при выходе из viewport
                if (entry.target.classList.contains('photo-item')) {
                    const img = entry.target.querySelector('.photo-img');
                    const overlay = entry.target.querySelector('.photo-overlay');
                    const heart = entry.target.querySelector('.photo-heart');
                    
                    if (img) img.classList.add('grayscale');
                    if (overlay) overlay.style.opacity = '0';
                    if (overlay) overlay.style.transform = 'translateY(30px)';
                    if (heart) {
                        heart.style.opacity = '0';
                        heart.style.transform = 'scale(0) rotate(0deg)';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    document.querySelectorAll('.photo-item, .quote-card, .track-item, .interactive-container').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Плавный скролл для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект параллакса при скролле
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Параллакс для хедера
        const header = document.querySelector('.header-content');
        if (header) {
            header.style.transform = `translateY(${rate * 0.5}px)`;
        }
        
        // Эффект появления элементов при скролле
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                el.classList.add('visible');
            }
        });
    });
    
    // Анимация нажатия на кнопки
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Эффект волны для кликов
    document.addEventListener('click', function(e) {
        const wave = document.createElement('div');
        wave.className = 'click-wave';
        wave.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 107, 139, 0.3);
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 50}px;
            top: ${e.clientY - 50}px;
            transform: scale(0);
            animation: waveExpand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 600);
    });
    
    // Добавляем стили для волны
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waveExpand {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});