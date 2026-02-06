// script.js - Основная логика сайта

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Начинаем загрузку сайта...');
    
    // Элементы
    const loadingScreen = document.getElementById('loadingScreen');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const playlistBtn = document.getElementById('playlistBtn');
    const playlistModal = document.getElementById('playlistModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const daysCounter = document.getElementById('daysCounter');
    const photosGrid = document.getElementById('photosGrid');
    const photosSwiperWrapper = document.getElementById('photosSwiperWrapper');
    const photosLoading = document.getElementById('photosLoading');
    const timeline = document.getElementById('timeline');
    const nowPlayingFooter = document.getElementById('nowPlayingFooter');
    const photoModal = document.getElementById('photoModal');
    const photoModalOverlay = document.getElementById('photoModalOverlay');
    const photoModalClose = document.getElementById('photoModalClose');
    const modalPhotoImage = document.getElementById('modalPhotoImage');
    const modalPhotoDate = document.getElementById('modalPhotoDate');
    const modalPhotoDesc = document.getElementById('modalPhotoDesc');
    
    // Данные
    const photosData = [
        { src: 'images/photo1.jpg', date: '01.05.2023', desc: 'Наш первый день' },
        { src: 'images/photo2.jpg', date: '15.08.2023', desc: 'Летнее приключение' },
        { src: 'images/photo3.jpg', date: '10.11.2023', desc: 'Осенняя прогулка' },
        { src: 'images/photo4.jpg', date: '25.12.2023', desc: 'Новогодний вечер' },
        { src: 'images/photo5.jpg', date: '01.01.2024', desc: 'Первое утро года' },
        { src: 'images/photo6.jpg', date: '14.02.2024', desc: 'День влюбленных' }
    ];
    
    const tracksData = [
        { title: 'Наша песня #1', artist: 'Воспоминание', duration: '3:45', color: '#ff6b8b', file: 't1.m4a' },
        { title: 'Наша песня #2', artist: 'Дорога домой', duration: '4:20', color: '#6b8bff', file: 't2.m4a' },
        { title: 'Наша песня #3', artist: 'Тихий вечер', duration: '3:15', color: '#ff8e6b', file: 't3.m4a' },
        { title: 'Наша песня #4', artist: 'Утреннее солнце', duration: '4:05', color: '#6bff8e', file: 't4.m4a' },
        { title: 'Наша песня #5', artist: 'Ночной разговор', duration: '3:50', color: '#ff6bd6', file: 't5.m4a' }
    ];
    
    const timelineData = [
        { date: 'Май 2023', text: 'Мы встретились в тот самый день' },
        { date: 'Июнь 2023', text: 'Первое свидание и долгие разговоры' },
        { date: 'Август 2023', text: 'Путешествие, которое сблизило нас' },
        { date: 'Ноябрь 2023', text: 'Тихие вечера и теплые объятия' },
        { date: 'Декабрь 2023', text: 'Первый праздник вместе' },
        { date: 'Январь 2024', text: 'Новый год, новые мечты' },
        { date: 'Февраль 2024', text: 'Наша первая весна вместе' }
    ];
    
    // Инициализация
    init();
    
    async function init() {
        try {
            // Скрываем экран загрузки
            await hideLoadingScreen();
            
            // Инициализируем компоненты
            initMobileMenu();
            initPlaylistButton();
            initDateCounter();
            await initPhotos();
            initTimeline();
            initScrollAnimations();
            initModalWindows();
            
            // Запускаем анимации
            startAnimations();
            
            console.log('✅ Сайт успешно загружен!');
        } catch (error) {
            console.error('❌ Ошибка при загрузке:', error);
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <div class="loading-heart" style="color: #ff6b8b;">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="loading-text">Что-то пошло не так...</div>
                    <button onclick="location.reload()" style="
                        background: #ff6b8b;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-size: 1rem;
                        cursor: pointer;
                        margin-top: 20px;
                    ">
                        Обновить страницу
                    </button>
                </div>
            `;
        }
    }
    
    // Скрытие экрана загрузки
    function hideLoadingScreen() {
        return new Promise(resolve => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    resolve();
                }, 500);
            }, 1500);
        });
    }
    
    // Мобильное меню
    function initMobileMenu() {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Закрытие по клику вне меню
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Плавный скролл по клику на пункты меню
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Закрываем меню
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Плавный скролл
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });
    }
    
    // Кнопка плейлиста
    function initPlaylistButton() {
        // Обновляем бейдж
        const badge = document.getElementById('playlistBadge');
        badge.textContent = tracksData.length;
        
        // Открытие/закрытие модального окна
        playlistBtn.addEventListener('click', () => {
            playlistModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        modalOverlay.addEventListener('click', () => {
            playlistModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modalClose.addEventListener('click', () => {
            playlistModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Заполняем треки в модальном окне
        const modalTracks = document.getElementById('modalTracks');
        tracksData.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            trackElement.innerHTML = `
                <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="track-play">
                    <i class="fas fa-play"></i>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                // Здесь будет логика воспроизведения трека
                console.log(`Воспроизводим: ${track.title}`);
                // Закрываем модальное окно
                playlistModal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            modalTracks.appendChild(trackElement);
        });
    }
    
    // Счетчик дней
    function initDateCounter() {
        const startDate = new Date('2023-05-01');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Анимация счетчика
        let current = 0;
        const target = diffDays;
        const counterElement = daysCounter.querySelector('.number');
        
        const animateCounter = () => {
            const increment = Math.ceil(target / 50);
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counterElement.textContent = current;
                setTimeout(animateCounter, 30);
            }
        };
        
        setTimeout(animateCounter, 1000);
    }
    
    // Фотографии
    async function initPhotos() {
        console.log('📸 Загружаем фотографии...');
        
        // Показываем индикатор загрузки
        photosLoading.style.display = 'block';
        
        // Задержка для имитации загрузки
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Проверяем доступность фото
        const availablePhotos = await checkAvailablePhotos();
        
        if (availablePhotos.length === 0) {
            showPhotoPlaceholders();
        } else {
            renderPhotos(availablePhotos);
        }
        
        // Скрываем индикатор загрузки
        photosLoading.style.display = 'none';
        
        // Инициализируем свайпер
        initSwiper();
    }
    
    async function checkAvailablePhotos() {
        const available = [];
        
        for (const photo of photosData) {
            try {
                const exists = await checkFileExists(photo.src);
                if (exists) {
                    available.push(photo);
                }
            } catch (error) {
                console.warn(`Фото не найдено: ${photo.src}`);
            }
        }
        
        return available;
    }
    
    function checkFileExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
    
    function showPhotoPlaceholders() {
        const placeholderHTML = `
            <div class="no-photos">
                <div class="no-photos-icon">
                    <i class="fas fa-camera"></i>
                </div>
                <div class="no-photos-text">
                    <h3>Добавьте фотографии</h3>
                    <p>Создайте папку "images" и добавьте туда ваши фото</p>
                </div>
            </div>
        `;
        
        photosGrid.innerHTML = placeholderHTML;
        photosSwiperWrapper.innerHTML = '<div class="swiper-slide">' + placeholderHTML + '</div>';
    }
    
    function renderPhotos(photos) {
        // Очищаем контейнеры
        photosGrid.innerHTML = '';
        photosSwiperWrapper.innerHTML = '';
        
        // Генерируем фото для сетки (десктоп)
        photos.forEach((photo, index) => {
            // Для сетки
            const gridItem = createPhotoElement(photo, index);
            photosGrid.appendChild(gridItem);
            
            // Для свайпера
            const swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';
            swiperSlide.innerHTML = gridItem.innerHTML;
            photosSwiperWrapper.appendChild(swiperSlide);
        });
        
        // Добавляем обработчики кликов
        document.querySelectorAll('.photo-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                openPhotoModal(photos[index]);
            });
        });
    }
    
    function createPhotoElement(photo, index) {
        const div = document.createElement('div');
        div.className = 'photo-item reveal';
        div.style.animationDelay = `${index * 0.1}s`;
        
        div.innerHTML = `
            <img src="${photo.src}" 
                 alt="${photo.desc}" 
                 class="photo-img"
                 loading="lazy"
                 onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"300\" viewBox=\"0 0 400 300\"><rect width=\"400\" height=\"300\" fill=\"%23202b63\"/><text x=\"200\" y=\"150\" font-family=\"Arial\" font-size=\"24\" fill=\"%23ff6b8b\" text-anchor=\"middle\" dy=\".3em\">Фото ${index + 1}</text></svg>'">
            <div class="photo-overlay">
                <div class="photo-date">${photo.date}</div>
                <div class="photo-desc">${photo.desc}</div>
            </div>
        `;
        
        return div;
    }
    
    function initSwiper() {
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper('.photos-swiper', {
                direction: 'horizontal',
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                }
            });
        }
    }
    
    // Таймлайн
    function initTimeline() {
        timeline.innerHTML = '';
        
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item reveal';
            timelineItem.style.animationDelay = `${index * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <div class="timeline-text">${item.text}</div>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
        });
    }
    
    // Анимации при скролле
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.classList.contains('reveal')) {
                        entry.target.classList.add('active');
                    }
                    if (entry.target.classList.contains('section')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за всеми элементами
        document.querySelectorAll('.reveal, .section, .timeline-item, .photo-item').forEach(el => {
            observer.observe(el);
        });
        
        // Параллакс эффект для хедера
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const headerContent = document.querySelector('.header-content');
            if (headerContent) {
                headerContent.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
    
    // Модальные окна
    function initModalWindows() {
        // Закрытие фото-модалки
        photoModalOverlay.addEventListener('click', () => {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        photoModalClose.addEventListener('click', () => {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                playlistModal.classList.remove('active');
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Открытие фото в модальном окне
    function openPhotoModal(photo) {
        modalPhotoImage.src = photo.src;
        modalPhotoImage.alt = photo.desc;
        modalPhotoDate.textContent = photo.date;
        modalPhotoDesc.textContent = photo.desc;
        
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Запуск анимаций
    function startAnimations() {
        // Анимация плавающих элементов
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Анимация заголовка
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.3}s`;
        });
        
        // Анимация элементов хедера
        const headerElements = document.querySelectorAll('.header-element');
        headerElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2 + 1}s`;
        });
    }
    
    // Обновление текущего трека в футере
    function updateNowPlaying(track) {
        const songTitle = nowPlayingFooter.querySelector('.song-title');
        songTitle.textContent = track.title;
        
        // Анимация
        nowPlayingFooter.style.animation = 'none';
        setTimeout(() => {
            nowPlayingFooter.style.animation = 'pulse 1s ease';
        }, 10);
    }
    
    // Экспортируем функции для использования в других скриптах
    window.app = {
        updateNowPlaying,
        openPhotoModal,
        tracksData
    };
    
    // Плавный скролл для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Обработка ошибок изображений
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.opacity = '0.5';
            e.target.style.filter = 'grayscale(100%)';
        }
    }, true);
    
    // Адаптация для мобильных устройств
    function handleMobileFeatures() {
        // Вибрация при клике на сердечко (если поддерживается)
        document.querySelectorAll('.header-element.heart-pulse').forEach(el => {
            el.addEventListener('click', () => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
        });
        
        // Предотвращение зума на инпутах
        document.addEventListener('touchstart', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    handleMobileFeatures();
    
    // Инициализация переписок
    initMessages();
    
    // Инициализация цитат
    initQuotes();
});

// Инициализация переписок
function initMessages() {
    const messages = [
        { text: "Привет! Как твой день?", time: "10:00", type: "you" },
        { text: "Привет! Все отлично, только что вспоминал о тебе ❤️", time: "10:05", type: "me" },
        { text: "Правда? А я как раз слушала нашу песню", time: "10:07", type: "you" },
        { text: "Какую именно? У нас их так много уже!", time: "10:10", type: "me" },
        { text: "Ту, что играла в машине, когда мы ехали домой", time: "10:12", type: "you" },
        { text: "О да, помню! Это был лучший вечер", time: "10:15", type: "me" },
        { text: "Каждый вечер с тобой - лучший ❤️", time: "10:20", type: "you" },
        { text: "Согласен на 100%! Жду нашей следующей встречи", time: "10:25", type: "me" },
        { text: "Я тоже! Уже считаю часы ⏰", time: "10:30", type: "you" },
        { text: "Скоро увидимся, обещаю! 💝", time: "10:35", type: "me" }
    ];
    
    const chatContainer = document.getElementById('chatContainer');
    const swipeTrack = document.getElementById('swipeTrack');
    
    // Заполняем чат
    messages.forEach((msg, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.style.animationDelay = `${index * 0.1}s`;
        messageDiv.innerHTML = `
            <div class="message-content">${msg.text}</div>
            <div class="message-time">${msg.time}</div>
        `;
        chatContainer.appendChild(messageDiv);
    });
    
    // Заполняем свайп-элементы
    const swipeMessages = [
        { date: "Первое сообщение", text: "Привет! Как дела?" },
        { date: "Первое свидание", text: "Ты выглядишь потрясающе!" },
        { date: "Поздней ночью", text: "Не могу уснуть, думаю о тебе" },
        { date: "Утро выходного", text: "Доброе утро, солнышко!" },
        { date: "После работы", text: "Соскучился по тебе целый день" },
        { date: "Перед сном", text: "Спокойной ночи, моя любовь" }
    ];
    
    swipeMessages.forEach((item, index) => {
        const swipeItem = document.createElement('div');
        swipeItem.className = 'swipe-item';
        swipeItem.innerHTML = `
            <div class="item-date">${item.date}</div>
            <div class="item-text">"${item.text}"</div>
            <div class="item-heart">❤️</div>
        `;
        swipeTrack.appendChild(swipeItem);
    });
    
    // Добавляем возможность перетаскивания
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    swipeTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - swipeTrack.offsetLeft;
        scrollLeft = swipeTrack.scrollLeft;
    });
    
    swipeTrack.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    swipeTrack.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    swipeTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - swipeTrack.offsetLeft;
        const walk = (x - startX) * 2;
        swipeTrack.scrollLeft = scrollLeft - walk;
    });
    
    // Для мобильных устройств
    swipeTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - swipeTrack.offsetLeft;
        scrollLeft = swipeTrack.scrollLeft;
    });
    
    swipeTrack.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    swipeTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - swipeTrack.offsetLeft;
        const walk = (x - startX) * 2;
        swipeTrack.scrollLeft = scrollLeft - walk;
    });
}

// Инициализация цитат
function initQuotes() {
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDots = document.querySelectorAll('.quote-dots .dot');
    const quotePrev = document.querySelector('.quote-prev');
    const quoteNext = document.querySelector('.quote-next');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Скрываем все слайды
        quoteSlides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        
        // Показываем текущий слайд
        quoteSlides[index].classList.add('active');
        
        // Обновляем точки
        quoteDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    quotePrev.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = quoteSlides.length - 1;
        showSlide(newIndex);
    });
    
    quoteNext.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= quoteSlides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    quoteDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автопереключение цитат
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= quoteSlides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
}

// Добавляем стили для плавного появления
const style = document.createElement('style');
style.textContent = `
    .no-photos {
        text-align: center;
        padding: 60px 20px;
        background: rgba(20, 17, 47, 0.3);
        border-radius: 20px;
        border: 2px dashed rgba(255, 107, 139, 0.3);
    }
    
    .no-photos-icon {
        font-size: 4rem;
        color: #ff6b8b;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .no-photos-text h3 {
        font-size: 1.5rem;
        color: white;
        margin-bottom: 10px;
    }
    
    .no-photos-text p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1rem;
    }
    
    /* Анимация появления фото */
    @keyframes photoAppear {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .photo-item {
        animation: photoAppear 0.6s ease forwards;
    }
    
    /* Анимация параллакса */
    @keyframes parallaxFloat {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        25% {
            transform: translateY(-20px) rotate(5deg);
        }
        50% {
            transform: translateY(0) rotate(0deg);
        }
        75% {
            transform: translateY(10px) rotate(-5deg);
        }
    }
    
    .parallax-element {
        animation: parallaxFloat 8s ease-in-out infinite;
    }
`;
document.head.appendChild(style);