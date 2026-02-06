// parallax.js - Параллакс эффекты
document.addEventListener('DOMContentLoaded', function() {
    // Параллакс для фотографий
    document.addEventListener('mousemove', function(e) {
        const photos = document.querySelectorAll('.photo-img');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        photos.forEach(photo => {
            const speed = 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            photo.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
        
        // Параллакс для карточек
        const cards = document.querySelectorAll('.photo-frame, .quote-card, .love-letter');
        cards.forEach((card, index) => {
            const speed = 0.01;
            const x = (mouseX - 0.5) * speed * 50 * (index % 2 === 0 ? 1 : -1);
            const y = (mouseY - 0.5) * speed * 50;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Добавляем задержку для последовательной анимации
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.animationDelay = delay;
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми анимируемыми элементами
    document.querySelectorAll('.photo-item, .quote-card, .track-item, .interactive-container').forEach(el => {
        observer.observe(el);
    });
    
    // Плавный скролл для ссылок
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
});