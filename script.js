// script.js - Главный скрипт с автоматической датой и загрузкой фото

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Запускаем нашу историю...');
    
    // Константы
    const START_DATE = new Date('2025-08-30'); // Начало отношений
    const TODAY = new Date(); // Текущая дата
    
    // Элементы
    const elements = {
        loadingScreen: document.getElementById('loadingScreen'),
        loadingText: document.getElementById('loadingText'),
        currentDate: document.getElementById('currentDate'),
        daysCounter: document.getElementById('daysCounter'),
        daysTogetherText: document.getElementById('daysTogetherText'),
        photosGrid: document.getElementById('photosGrid'),
        photosSwiperWrapper: document.getElementById('photosSwiperWrapper'),
        photosInfo: document.getElementById('photosInfo'),
        photosCount: document.getElementById('photosCount'),
        timeline: document.getElementById('timeline'),
        footerDate: document.getElementById('footerDate'),
        totalDays: document.getElementById('totalDays'),
        chatContainer: document.getElementById('chatContainer'),
        swipeTrack: document.getElementById('swipeTrack'),
        playlistModal: document.getElementById('playlistModal'),
        photoModal: document.getElementById('photoModal'),
        modalPhotoImage: document.getElementById('modalPhotoImage'),
        modalPhotoDate: document.getElementById('modalPhotoDate'),
        modalPhotoDesc: document.getElementById('modalPhotoDesc')
    };
    
    // Данные
    const appData = {
        photos: [],
        tracks: [],
        messages: [],
        memories: [],
        daysTogether: 0,
        todayFormatted: '',
        swiper: null
    };
    
    // Инициализация
    async function init() {
        try {
            // 1. Рассчитываем даты
            calculateDates();
            
            // 2. Показываем актуальную информацию
            updateDateDisplays();
            
            // 3. Загружаем фотографии
            await loadPhotos();
            
            // 4. Инициализируем остальные компоненты
            initComponents();
            
            // 5. Прячем загрузку
            hideLoadingScreen();
            
            console.log('✅ Наша история загружена!');
        } catch (error) {
            console.error('❌ Ошибка:', error);
            showErrorScreen();
        }
    }
    
    // Рассчет дат
    function calculateDates() {
        // Разница в днях
        const diffTime = Math.abs(TODAY - START_DATE);
        appData.daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Форматируем сегодняшнюю дату
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        appData.todayFormatted = TODAY.toLocaleDateString('ru-RU', options);
        
        console.log(`📅 Дней вместе: ${appData.daysTogether}`);
        console.log(`📅 Сегодня: ${appData.todayFormatted}`);
    }
    
    // Обновление отображения дат
    function updateDateDisplays() {
        // Текущая дата в хедере
        if (elements.currentDate) {
            elements.currentDate.textContent = appData.todayFormatted;
        }
        
        // Счетчик дней
        if (elements.daysCounter) {
            const numberElement = elements.daysCounter.querySelector('.number');
            if (numberElement) {
                animateCounter(numberElement, appData.daysTogether);
            }
        }
        
        // Текст о днях вместе
        if (elements.daysTogetherText) {
            elements.daysTogetherText.textContent = getDaysTogetherText(appData.daysTogether);
        }
        
        // Дата в футере
        if (elements.footerDate) {
            elements.footerDate.textContent = appData.todayFormatted;
        }
        
        // Счетчик в футере
        if (elements.totalDays) {
            animateCounter(elements.totalDays, appData.daysTogether);
        }
    }
    
    // Анимация счетчика
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 100);
        const duration = 2000;
        const stepTime = Math.max(duration / target, 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current > target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, stepTime);
    }
    
    // Текст о днях вместе
    function getDaysTogetherText(days) {
        if (days < 30) {
            return `${days} дней нашей любви`;
        } else if (days < 365) {
            const months = Math.floor(days / 30);
            return `${months} ${getMonthWord(months)} вместе`;
        } else {
            const years = Math.floor(days / 365);
            const remainingDays = days % 365;
            return `${years} ${getYearWord(years)} и ${remainingDays} дней`;
        }
    }
    
    function getMonthWord(months) {
        if (months === 1) return 'месяц';
        if (months >= 2 && months <= 4) return 'месяца';
        return 'месяцев';
    }
    
    function getYearWord(years) {
        if (years === 1) return 'год';
        if (years >= 2 && years <= 4) return 'года';
        return 'лет';
    }
    
    // Загрузка фотографий
    async function loadPhotos() {
        console.log('🖼️ Ищем фотографии...');
        
        if (elements.loadingText) {
            elements.loadingText.textContent = 'Ищем ваши фотографии...';
        }
        
        // Ищем фото в папке images
        const foundPhotos = await findPhotos();
        appData.photos = foundPhotos;
        
        if (foundPhotos.length > 0) {
            renderPhotos(foundPhotos);
            console.log(`✅ Найдено ${foundPhotos.length} фотографий`);
        } else {
            showNoPhotosMessage();
            console.log('ℹ️ Фотографии не найдены');
        }
    }
    
    // Поиск фотографий
    async function findPhotos() {
        const photos = [];
        const photoNames = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6'];
        const formats = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];
        
        for (let i = 0; i < photoNames.length; i++) {
            const photoName = photoNames[i];
            let foundPhoto = null;
            
            // Пробуем все форматы
            for (const format of formats) {
                const path = `images/${photoName}${format}`;
                if (await fileExists(path)) {
                    foundPhoto = {
                        src: path,
                        index: i + 1,
                        date: generatePhotoDate(i),
                        desc: getPhotoDescription(i)
                    };
                    break;
                }
            }
            
            if (foundPhoto) {
                photos.push(foundPhoto);
            }
        }
        
        return photos;
    }
    
    // Проверка существования файла
    function fileExists(url) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, true);
            xhr.onload = () => resolve(xhr.status === 200);
            xhr.onerror = () => resolve(false);
            xhr.send();
        });
    }
    
    // Генерация даты для фото
    function generatePhotoDate(index) {
        const dates = [
            '30.08.2025 - Наше начало',
            '15.09.2025 - Первое свидание',
            '01.10.2025 - Осенняя прогулка',
            '20.10.2025 - Вечер разговоров',
            '05.11.2025 - Дождливый день',
            '25.12.2025 - Первое Рождество'
        ];
        return dates[index] || 'Наш день';
    }
    
    // Описание для фото
    function getPhotoDescription(index) {
        const descriptions = [
            'Тот самый день, когда всё началось',
            'Помнишь наше первое свидание?',
            'Прогулка, которая изменила всё',
            'Вечер, когда мы говорили обо всём',
            'Даже дождь не испортил настроение',
            'Наш первый праздник вместе'
        ];
        return descriptions[index] || 'Наш прекрасный момент';
    }
    
    // Рендер фотографий
    function renderPhotos(photos) {
        // Обновляем счетчик
        if (elements.photosCount) {
            elements.photosCount.textContent = `${photos.length} фотографий`;
        }
        
        // Рендерим сетку
        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = '';
            photos.forEach((photo, index) => {
                const photoElement = createPhotoElement(photo, index);
                elements.photosGrid.appendChild(photoElement);
            });
        }
        
        // Рендерим слайдер
        if (elements.photosSwiperWrapper) {
            elements.photosSwiperWrapper.innerHTML = '';
            photos.forEach((photo, index) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = createPhotoHTML(photo, index);
                elements.photosSwiperWrapper.appendChild(slide);
            });
            
            // Инициализируем Swiper
            initSwiper();
        }
    }
    
    // Создание элемента фото
    function createPhotoElement(photo, index) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        div.dataset.index = index;
        div.innerHTML = createPhotoHTML(photo, index);
        
        // Клик для открытия
        div.addEventListener('click', () => openPhotoModal(photo));
        
        return div;
    }
    
    // HTML для фото
    function createPhotoHTML(photo, index) {
        return `
            <div class="photo-wrapper">
                <div class="photo-frame">
                    <img src="${photo.src}" 
                         alt="${photo.desc}"
                         class="photo-image"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"300\"><rect width=\"400\" height=\"300\" fill=\"%23202b63\"/><text x=\"200\" y=\"150\" font-family=\"Arial\" font-size=\"20\" fill=\"%23ff6b8b\" text-anchor=\"middle\" dy=\".3em\">Фото ${index + 1}</text></svg>'">
                    <div class="photo-overlay">
                        <div class="photo-date">${photo.date.split(' - ')[0]}</div>
                        <div class="photo-desc">${photo.desc}</div>
                    </div>
                    <div class="photo-heart">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                <div class="photo-number">#${index + 1}</div>
            </div>
        `;
    }
    
    // Инициализация Swiper
    function initSwiper() {
        if (typeof Swiper !== 'undefined' && elements.photosSwiperWrapper.children.length > 0) {
            appData.swiper = new Swiper('.photos-swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                }
            });
        }
    }
    
    // Сообщение если нет фото
    function showNoPhotosMessage() {
        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = `
                <div class="no-photos-message">
                    <div class="no-photos-icon">
                        <i class="fas fa-camera"></i>
                    </div>
                    <h3>Добавьте ваши фотографии</h3>
                    <p>Создайте папку <strong>images</strong> и добавьте туда:</p>
                    <div class="photo-examples">
                        <div class="photo-example">photo1.jpg</div>
                        <div class="photo-example">photo2.jpg</div>
                        <div class="photo-example">photo3.jpg</div>
                    </div>
                    <p class="hint">Страница обновится автоматически</p>
                </div>
            `;
        }
    }
    
    // Открытие фото в модалке
    function openPhotoModal(photo) {
        if (elements.modalPhotoImage && elements.modalPhotoDate && elements.modalPhotoDesc) {
            elements.modalPhotoImage.src = photo.src;
            elements.modalPhotoDate.textContent = photo.date;
            elements.modalPhotoDesc.textContent = photo.desc;
            
            elements.photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Инициализация компонентов
    function initComponents() {
        initMobileMenu();
        initPlaylistButton();
        initMessages();
        initMemories();
        initPhotoModal();
        initHeartButton();
        initScrollAnimations();
    }
    
    // Мобильное меню
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const closeBtn = document.getElementById('menuClose');
        
        if (menuBtn && menu && closeBtn) {
            menuBtn.addEventListener('click', () => {
                menu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeBtn.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    // Кнопка плейлиста
    function initPlaylistButton() {
        const btn = document.getElementById('playlistBtn');
        const modal = document.getElementById('playlistModal');
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        
        if (btn && modal && overlay && closeBtn) {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            overlay.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
            
            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    // Переписки
    function initMessages() {
        if (elements.chatContainer) {
            const messages = generateMessages();
            elements.chatContainer.innerHTML = messages.map(msg => `
                <div class="message ${msg.type}">
                    <div class="message-content">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            `).join('');
        }
        
        if (elements.swipeTrack) {
            const cards = generateMemoryCards();
            elements.swipeTrack.innerHTML = cards.map(card => `
                <div class="swipe-card">
                    <div class="card-date">${card.date}</div>
                    <div class="card-text">${card.text}</div>
                    <div class="card-heart">❤️</div>
                </div>
            `).join('');
            
            // Инициализация свайпа
            initSwipeCards();
        }
    }
    
    function generateMessages() {
        return [
            { text: "Привет, солнышко! Как твой день?", time: "09:30", type: "you" },
            { text: "Привет! Только думал о тебе ❤️", time: "09:32", type: "me" },
            { text: "Правда? А я как раз слушала нашу песню", time: "09:35", type: "you" },
            { text: "Ту самую, с того вечера?", time: "09:37", type: "me" },
            { text: "Да, именно её! Она напоминает мне о тебе", time: "09:40", type: "you" },
            { text: "Каждый день с тобой - лучший день", time: "09:45", type: "me" },
            { text: "Согласна на 100%! Люблю тебя", time: "09:50", type: "you" },
            { text: "Я тебя тоже, больше всего на свете 💝", time: "09:55", type: "me" }
        ];
    }
    
    function generateMemoryCards() {
        return [
            { date: "30.08.2025", text: "День, когда всё началось" },
            { date: "Первая неделя", text: "Нескончаемые разговоры" },
            { date: "Осень 2025", text: "Прогулки под дождём" },
            { date: "Первое свидание", text: "Нервы и счастье" },
            { date: "Совместные планы", text: "Мечты о будущем" },
            { date: "Каждый день", text: "Счастье быть вместе" }
        ];
    }
    
    function initSwipeCards() {
        const track = elements.swipeTrack;
        if (!track) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        track.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Воспоминания (таймлайн)
    function initMemories() {
        if (elements.timeline) {
            const memories = generateMemories();
            elements.timeline.innerHTML = memories.map((memory, index) => `
                <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">${memory.date}</div>
                        <div class="timeline-text">${memory.text}</div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function generateMemories() {
        const start = new Date(START_DATE);
        const memories = [];
        
        // Добавляем стартовую дату
        memories.push({
            date: "30 августа 2025",
            text: "Начало нашей истории"
        });
        
        // Добавляем промежуточные даты
        const monthNames = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль'];
        let currentDate = new Date(start);
        
        for (let i = 1; i <= 6; i++) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            if (currentDate > TODAY) break;
            
            memories.push({
                date: `${monthNames[i-1]} 2025`,
                text: getMemoryText(i)
            });
        }
        
        // Добавляем сегодня
        memories.push({
            date: "Сегодня",
            text: `${appData.daysTogether} дней счастья вместе`
        });
        
        return memories;
    }
    
    function getMemoryText(month) {
        const texts = [
            "Первые свидания и знакомство",
            "Углубление отношений и доверие",
            "Совместные планы и мечты",
            "Подготовка к праздникам",
            "Новый год вместе",
            "Настоящая любовь каждый день"
        ];
        return texts[month - 1] || "Наш прекрасный месяц";
    }
    
    // Модалка фото
    function initPhotoModal() {
        const overlay = document.getElementById('photoModalOverlay');
        const closeBtn = document.getElementById('photoModalClose');
        
        if (overlay && closeBtn) {
            overlay.addEventListener('click', closePhotoModal);
            closeBtn.addEventListener('click', closePhotoModal);
            
            function closePhotoModal() {
                elements.photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    // Кнопка сердечка
    function initHeartButton() {
        const heartBtn = document.getElementById('letterHeart');
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                this.classList.add('pulse');
                
                // Создаем летающие сердечки
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        if (typeof window.createValentineHeart === 'function') {
                            const rect = this.getBoundingClientRect();
                            window.createValentineHeart(
                                rect.left + rect.width / 2,
                                rect.top + rect.height / 2,
                                Math.random() * 20 + 15,
                                '#ff6b8b'
                            );
                        }
                    }, i * 100);
                }
                
                // Вибрация
                if ('vibrate' in navigator) {
                    navigator.vibrate(100);
                }
                
                setTimeout(() => this.classList.remove('pulse'), 1000);
            });
        }
    }
    
    // Анимации при скролле
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.section, .photo-item, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Скрытие экрана загрузки
    function hideLoadingScreen() {
        setTimeout(() => {
            if (elements.loadingScreen) {
                elements.loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    elements.loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }
    
    // Экран ошибки
    function showErrorScreen() {
        if (elements.loadingScreen) {
            elements.loadingScreen.innerHTML = `
                <div class="error-screen">
                    <div class="error-icon">
                        <i class="fas fa-heart-broken"></i>
                    </div>
                    <h2>Что-то пошло не так</h2>
                    <p>Но наша любовь всё равно сильнее!</p>
                    <button onclick="location.reload()" class="reload-btn">
                        Обновить страницу
                    </button>
                </div>
            `;
        }
    }
    
    // Автообновление даты каждый день
    function scheduleDateUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 1, 0); // 00:00:01 следующего дня
        
        const timeUntilTomorrow = tomorrow - now;
        
        setTimeout(() => {
            location.reload();
        }, timeUntilTomorrow);
    }
    
    // Запуск
    init();
    
    // Планируем автообновление на следующий день
    scheduleDateUpdate();
    
    // Экспортируем функции
    window.app = {
        openPhotoModal,
        getDaysTogether: () => appData.daysTogether,
        getPhotos: () => appData.photos
    };
});

// Стили для сообщений
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .no-photos-message {
        text-align: center;
        padding: 40px 20px;
        background: rgba(255, 107, 139, 0.1);
        border-radius: 20px;
        border: 2px dashed rgba(255, 107, 139, 0.3);
        margin: 20px 0;
    }
    
    .no-photos-icon {
        font-size: 3rem;
        color: #ff6b8b;
        margin-bottom: 20px;
        opacity: 0.7;
    }
    
    .no-photos-message h3 {
        color: white;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .no-photos-message p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 15px;
        font-size: 1rem;
    }
    
    .photo-examples {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
        flex-wrap: wrap;
    }
    
    .photo-example {
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 15px;
        border-radius: 10px;
        font-family: monospace;
        color: #ff8e6b;
        font-size: 0.9rem;
    }
    
    .hint {
        font-size: 0.9rem;
        color: #6b8bff !important;
        margin-top: 20px;
    }
    
    .error-screen {
        text-align: center;
        color: white;
        padding: 40px;
    }
    
    .error-icon {
        font-size: 4rem;
        color: #ff6b8b;
        margin-bottom: 20px;
    }
    
    .error-screen h2 {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .error-screen p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.8;
    }
    
    .reload-btn {
        background: #ff6b8b;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .reload-btn:hover {
        background: #ff8e6b;
        transform: scale(1.05);
    }
    
    .swipe-card {
        flex: 0 0 auto;
        width: 250px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 20px;
        border: 1px solid rgba(255, 107, 139, 0.2);
        cursor: grab;
        backdrop-filter: blur(10px);
    }
    
    .swipe-card:active {
        cursor: grabbing;
    }
    
    .card-date {
        font-size: 0.9rem;
        color: #ff8e6b;
        margin-bottom: 10px;
        font-weight: 500;
    }
    
    .card-text {
        font-size: 1.1rem;
        color: white;
        margin-bottom: 15px;
        line-height: 1.4;
    }
    
    .card-heart {
        color: #ff6b8b;
        font-size: 1.5rem;
        text-align: right;
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(additionalStyles);