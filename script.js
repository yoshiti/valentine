// script.js - Главный скрипт с текстом "Люблю тебя" и музыкой

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Запускаем нашу историю...');
    
    // Слова "Люблю тебя" на разных языках
    const lovePhrases = [
        "Я люблю тебя", // Русский
        "I love you",   // Английский
        "Te amo",       // Испанский
        "Je t'aime",    // Французский
        "Ich liebe dich", // Немецкий
        "Ti amo",       // Итальянский
        "愛してる",     // Японский
        "사랑해",       // Корейский
        "我爱你",       // Китайский
        "Eu te amo",    // Португальский
        "أحبك",         // Арабский
        "Σ'αγαπώ",      // Греческий
        "Volim te",     // Хорватский
        "Mahal kita",   // Филиппинский
        "Szeretlek",    // Венгерский
        "Kocham Cię",   // Польский
        "Te iubesc",    // Румынский
        "Miluji tě",    // Чешский
        "Jag älskar dig", // Шведский
        "Ik hou van jou" // Голландский
    ];

    // Константы
    const START_DATE = new Date('2025-08-30');
    const TODAY = new Date();
    
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
        modalPhotoDesc: document.getElementById('modalPhotoDesc'),
        playerTitle: document.getElementById('playerTitle'),
        playerArtist: document.getElementById('playerArtist'),
        playerCover: document.getElementById('playerCover'),
        coverImage: document.getElementById('coverImage'),
        vinyl: document.getElementById('vinyl'),
        timeCurrent: document.getElementById('timeCurrent'),
        timeTotal: document.getElementById('timeTotal'),
        playerProgress: document.getElementById('playerProgress'),
        progressBar: document.querySelector('.progress-bar'),
        playBtn: document.getElementById('playBtn'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        tracksList: document.getElementById('tracksList'),
        modalTracks: document.getElementById('modalTracks')
    };
    
    // Данные приложения
    const appData = {
        photos: [],
        daysTogether: 0,
        todayFormatted: '',
        swiper: null,
        isMobile: false,
        currentTrack: 0,
        isPlaying: false,
        audio: document.getElementById('backgroundAudio'),
        particles: []
    };
    
    // Треки с названиями и цветами
    const tracks = [
        {
            src: "music/t1.m4a",
            title: "Ты и Я",
            artist: "Наша история",
            color: "#ff6b8b",
            duration: 180
        },
        {
            src: "music/t2.m4a",
            title: "Любовь в каждом мгновении",
            artist: "Вечная мелодия",
            color: "#6b8bff",
            duration: 210
        },
        {
            src: "music/t3.m4a",
            title: "Сердца бьются в такт",
            artist: "Двое навсегда",
            color: "#6bff8e",
            duration: 195
        },
        {
            src: "music/t4.m4a",
            title: "Танцуем под дождем",
            artist: "Счастливые мгновения",
            color: "#ff8e6b",
            duration: 240
        },
        {
            src: "music/t5.m4a",
            title: "Твои глаза",
            artist: "Лучшие воспоминания",
            color: "#ff6bd6",
            duration: 225
        },
        {
            src: "music/t6.m4a",
            title: "Навсегда твой",
            artist: "Любовь без границ",
            color: "#ff8e3b",
            duration: 200
        }
    ];

    // Инициализация
    async function init() {
        try {
            // 1. Создаем текст "Люблю тебя" вместо частиц
            createLoveTextParticles();
            
            // 2. Рассчитываем даты
            calculateDates();
            
            // 3. Показываем актуальную информацию
            updateDateDisplays();
            
            // 4. Загружаем фотографии
            await loadPhotos();
            
            // 5. Инициализируем плеер
            initMusicPlayer();
            
            // 6. Инициализируем остальные компоненты
            initComponents();
            
            // 7. Прячем загрузку
            hideLoadingScreen();
            
            console.log('✅ Наша история загружена!');
        } catch (error) {
            console.error('❌ Ошибка:', error);
            showErrorScreen();
        }
    }
    
    // Создание текста "Люблю тебя" как частиц
    function createLoveTextParticles() {
        const container = document.getElementById('love-particles');
        if (!container) return;
        
        // Создаем элемент для текста
        const textContainer = document.createElement('div');
        textContainer.className = 'love-text-container';
        textContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        container.appendChild(textContainer);
        
        // Создаем несколько плавающих фраз
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFloatingLovePhrase(textContainer);
            }, i * 300);
        }
        
        // Периодически создаем новые фразы
        setInterval(() => {
            if (document.hasFocus()) {
                createFloatingLovePhrase(textContainer);
            }
        }, 3000);
    }
    
    // Создание одной плавающей фразы
    function createFloatingLovePhrase(container) {
        const phrase = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
        const element = document.createElement('div');
        
        // Случайные параметры
        const size = Math.random() * 24 + 16;
        const startX = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const color = getRandomColor();
        const opacity = Math.random() * 0.6 + 0.3;
        
        element.textContent = phrase;
        element.style.cssText = `
            position: absolute;
            left: ${startX}%;
            top: 110%;
            font-size: ${size}px;
            color: ${color};
            opacity: ${opacity};
            font-weight: 600;
            pointer-events: none;
            white-space: nowrap;
            transform: translateX(-50%);
            text-shadow: 0 0 10px ${color}80;
            z-index: 0;
            animation: floatUp ${duration}s linear forwards;
        `;
        
        container.appendChild(element);
        
        // Удаляем после анимации
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, duration * 1000);
    }
    
    // Получение случайного цвета
    function getRandomColor() {
        const colors = ['#ff6b8b', '#ff8e6b', '#6b8bff', '#6bff8e', '#ff6bd6', '#ff8e3b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Рассчет дат
    function calculateDates() {
        const diffTime = Math.abs(TODAY - START_DATE);
        appData.daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        appData.todayFormatted = TODAY.toLocaleDateString('ru-RU', options);
        
        console.log(`📅 Дней вместе: ${appData.daysTogether}`);
        console.log(`📅 Сегодня: ${appData.todayFormatted}`);
    }
    
    // Обновление отображения дат
    function updateDateDisplays() {
        if (elements.currentDate) {
            elements.currentDate.textContent = appData.todayFormatted;
        }
        
        if (elements.daysCounter) {
            const numberElement = elements.daysCounter.querySelector('.number');
            if (numberElement) {
                animateCounter(numberElement, appData.daysTogether);
            }
        }
        
        if (elements.daysTogetherText) {
            elements.daysTogetherText.textContent = getDaysTogetherText(appData.daysTogether);
        }
        
        if (elements.footerDate) {
            elements.footerDate.textContent = appData.todayFormatted;
        }
        
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
        const formats = ['.jpg', '.jpeg', '.png', '.webp'];
        
        for (let i = 0; i < photoNames.length; i++) {
            const photoName = photoNames[i];
            let foundPhoto = null;
            
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
        if (elements.photosCount) {
            elements.photosCount.textContent = `${photos.length} фотографий`;
        }
        
        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = '';
            photos.forEach((photo, index) => {
                const photoElement = createPhotoElement(photo, index);
                elements.photosGrid.appendChild(photoElement);
            });
        }
        
        if (elements.photosSwiperWrapper) {
            elements.photosSwiperWrapper.innerHTML = '';
            photos.forEach((photo, index) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = createPhotoHTML(photo, index);
                elements.photosSwiperWrapper.appendChild(slide);
            });
            
            initSwiper();
        }
    }
    
    // Создание элемента фото
    function createPhotoElement(photo, index) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        div.dataset.index = index;
        div.innerHTML = createPhotoHTML(photo, index);
        
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
                    disableOnInteraction: false,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                speed: 800,
                grabCursor: true,
                watchSlidesProgress: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        autoplay: {
                            delay: 4000
                        }
                    }
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
    
    // Инициализация плеера
    function initMusicPlayer() {
        if (!appData.audio) return;
        
        // Настройка аудио
        appData.audio.volume = 0.7;
        
        // События аудио
        appData.audio.addEventListener('timeupdate', updateProgress);
        appData.audio.addEventListener('loadedmetadata', updateDuration);
        appData.audio.addEventListener('ended', nextTrack);
        
        // Кнопки управления
        if (elements.playBtn) {
            elements.playBtn.addEventListener('click', togglePlay);
        }
        
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', prevTrack);
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', nextTrack);
        }
        
        if (elements.progressBar) {
            elements.progressBar.addEventListener('click', seek);
        }
        
        // Загружаем первый трек
        loadTrack(0);
        
        // Создаем список треков
        createTracksList();
    }
    
    // Загрузка трека
    function loadTrack(index) {
        if (index < 0 || index >= tracks.length) return;
        
        appData.currentTrack = index;
        const track = tracks[index];
        
        // Обновляем интерфейс
        if (elements.playerTitle) elements.playerTitle.textContent = track.title;
        if (elements.playerArtist) elements.playerArtist.textContent = track.artist;
        if (elements.timeTotal) elements.timeTotal.textContent = formatTime(track.duration);
        
        // Обновляем обложку
        if (elements.coverImage) {
            elements.coverImage.style.background = `linear-gradient(135deg, ${track.color}40, ${track.color}80)`;
            elements.coverImage.style.color = track.color;
        }
        
        if (elements.vinyl) {
            elements.vinyl.style.borderColor = `${track.color}50`;
            elements.vinyl.style.color = track.color;
        }
        
        // Обновляем список
        updateTracksList();
        
        // Загружаем аудио
        appData.audio.src = track.src;
        appData.audio.load();
    }
    
    // Создание списка треков
    function createTracksList() {
        if (!elements.tracksList) return;
        
        elements.tracksList.innerHTML = '';
        tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            if (index === appData.currentTrack) {
                trackElement.classList.add('active');
            }
            
            trackElement.innerHTML = `
                <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="track-play">
                    <i class="fas fa-${index === appData.currentTrack && appData.isPlaying ? 'pause' : 'play'}"></i>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                if (index === appData.currentTrack) {
                    togglePlay();
                } else {
                    loadTrack(index);
                    play();
                }
            });
            
            elements.tracksList.appendChild(trackElement);
        });
        
        // Также для модалки
        if (elements.modalTracks) {
            elements.modalTracks.innerHTML = '';
            tracks.forEach((track, index) => {
                const trackElement = document.createElement('div');
                trackElement.className = 'track-item modal-track';
                if (index === appData.currentTrack) {
                    trackElement.classList.add('active');
                }
                
                trackElement.innerHTML = `
                    <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                    <div class="track-info">
                        <div class="track-title">${track.title}</div>
                        <div class="track-artist">${track.artist}</div>
                    </div>
                    <div class="track-duration">${formatTime(track.duration)}</div>
                `;
                
                trackElement.addEventListener('click', () => {
                    if (index === appData.currentTrack) {
                        togglePlay();
                    } else {
                        loadTrack(index);
                        play();
                    }
                });
                
                elements.modalTracks.appendChild(trackElement);
            });
        }
    }
    
    // Обновление списка треков
    function updateTracksList() {
        document.querySelectorAll('.track-item').forEach((item, index) => {
            item.classList.toggle('active', index === appData.currentTrack);
            const icon = item.querySelector('.track-play i');
            if (icon) {
                icon.className = `fas fa-${index === appData.currentTrack && appData.isPlaying ? 'pause' : 'play'}`;
            }
        });
    }
    
    // Воспроизведение
    function play() {
        appData.audio.play().then(() => {
            appData.isPlaying = true;
            updatePlayButton();
            if (elements.vinyl) elements.vinyl.classList.add('playing');
        }).catch(error => {
            console.error('Ошибка воспроизведения:', error);
            appData.isPlaying = false;
            updatePlayButton();
        });
    }
    
    // Пауза
    function pause() {
        appData.audio.pause();
        appData.isPlaying = false;
        updatePlayButton();
        if (elements.vinyl) elements.vinyl.classList.remove('playing');
    }
    
    // Переключение воспроизведения
    function togglePlay() {
        if (appData.isPlaying) {
            pause();
        } else {
            play();
        }
    }
    
    // Обновление кнопки play
    function updatePlayButton() {
        const icon = elements.playBtn.querySelector('i');
        if (icon) {
            icon.className = appData.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        updateTracksList();
    }
    
    // Следующий трек
    function nextTrack() {
        let newIndex = appData.currentTrack + 1;
        if (newIndex >= tracks.length) newIndex = 0;
        loadTrack(newIndex);
        if (appData.isPlaying) play();
    }
    
    // Предыдущий трек
    function prevTrack() {
        let newIndex = appData.currentTrack - 1;
        if (newIndex < 0) newIndex = tracks.length - 1;
        loadTrack(newIndex);
        if (appData.isPlaying) play();
    }
    
    // Обновление прогресса
    function updateProgress() {
        if (appData.audio.duration) {
            const progress = (appData.audio.currentTime / appData.audio.duration) * 100;
            if (elements.playerProgress) {
                elements.playerProgress.style.width = `${progress}%`;
            }
            if (elements.timeCurrent) {
                elements.timeCurrent.textContent = formatTime(appData.audio.currentTime);
            }
        }
    }
    
    // Обновление длительности
    function updateDuration() {
        if (appData.audio.duration && elements.timeTotal) {
            elements.timeTotal.textContent = formatTime(appData.audio.duration);
        }
    }
    
    // Перемотка
    function seek(e) {
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (appData.audio.duration) {
            appData.audio.currentTime = percent * appData.audio.duration;
        }
    }
    
    // Форматирование времени
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeBtn.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                }
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
        
        // Для мыши
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.cursor = 'grabbing';
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
        
        // Для тач-устройств
        track.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        track.addEventListener('touchend', () => {
            isDown = false;
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Воспоминания
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
        
        memories.push({
            date: "30 августа 2025",
            text: "Начало нашей истории"
        });
        
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
                
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
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
    
    // Запуск
    init();
    
    // Автообновление даты каждый день
    function scheduleDateUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 1, 0);
        
        const timeUntilTomorrow = tomorrow - now;
        
        setTimeout(() => {
            location.reload();
        }, timeUntilTomorrow);
    }
    
    scheduleDateUpdate();
    
    // Экспортируем функции
    window.app = {
        openPhotoModal,
        getDaysTogether: () => appData.daysTogether,
        getPhotos: () => appData.photos,
        playMusic: play,
        pauseMusic: pause,
        nextTrack: nextTrack,
        prevTrack: prevTrack
    };
});

// Стили для анимаций и текста
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Анимация для плавающего текста */
    @keyframes floatUp {
        0% {
            transform: translateX(-50%) translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateX(${Math.random() * 100 - 50}px) translateY(-100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
    
    /* Стили для треков в модалке */
    .modal-track .track-duration {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-left: auto;
        padding-right: 10px;
    }
    
    .modal-track {
        margin-bottom: 8px;
    }
    
    /* Стили для плавающего текста */
    .love-text-container {
        font-family: 'Inter', sans-serif;
    }
    
    /* Адаптивные стили для iPhone */
    @media (max-width: 768px) {
        .love-text-container div {
            font-size: 18px !important;
        }
        
        .player-main {
            flex-direction: column;
            text-align: center;
        }
        
        .player-cover {
            margin: 0 auto 20px !important;
        }
    }
    
    /* Исправление для Safari на iPhone */
    @supports (-webkit-touch-callout: none) {
        .main-header {
            min-height: -webkit-fill-available;
        }
        
        body {
            min-height: -webkit-fill-available;
        }
    }
    
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
        width: 200px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 15px;
        border: 1px solid rgba(255, 107, 139, 0.2);
        cursor: grab;
        backdrop-filter: blur(10px);
    }
    
    .swipe-card:active {
        cursor: grabbing;
    }
    
    .card-date {
        font-size: 0.8rem;
        color: #ff8e6b;
        margin-bottom: 8px;
        font-weight: 500;
    }
    
    .card-text {
        font-size: 1rem;
        color: white;
        margin-bottom: 12px;
        line-height: 1.4;
    }
    
    .card-heart {
        color: #ff6b8b;
        font-size: 1.3rem;
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
    
    /* Адаптивность для iPhone */
    @media (max-width: 430px) {
        .main-title {
            font-size: 2rem !important;
        }
        
        .photos-swiper {
            height: 300px !important;
        }
        
        .swipe-card {
            width: 180px;
        }
    }
`;
document.head.appendChild(additionalStyles);