// script.js - Романтичный фон с созвездиями и начальным посланием

document.addEventListener('DOMContentLoaded', function() {
    console.log('💫 Запускаем нашу историю...');
    
    // ВАШИ РЕАЛЬНЫЕ ДАТЫ
    const FIRST_CONTACT = new Date('2025-08-06'); // 6 августа - первое общение
    const FIRST_WALK = new Date('2025-08-26');    // 26 августа - первая прогулка
    const FIRST_BOUQUET = new Date('2025-08-26'); // 26 августа - первый букет
    const SECOND_MEETING = new Date('2025-08-27'); // 27 августа - вторая встреча
    const RELATIONSHIP_START = new Date('2025-08-30'); // 30 августа - начало отношений
    const FIRST_BREAKFAST = new Date('2025-09-07'); // 7 сентября - завтрак в Астере
    const FIRST_SERIOUS_TALK = new Date('2025-09-11'); // 11 сентября - первый серьезный разговор
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
        modalTracks: document.getElementById('modalTracks'),
        mainMessage: document.getElementById('mainMessage'),
        romanticBackground: document.getElementById('romanticBackground')
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
        messageVisible: true,
        backgroundElements: []
    };
    
    // Треки
    const tracks = [
        {
            src: "music/t1.m4a",
            title: "fondness",
            artist: "love",
            color: "#ff6b8b",
            duration: 180
        },
        {
            src: "music/t2.m4a",
            title: "adoration",
            artist: "love",
            color: "#6b8bff",
            duration: 210
        },
        {
            src: "music/t3.m4a",
            title: "passion",
            artist: "love",
            color: "#6bff8e",
            duration: 195
        },
        {
            src: "music/t4.m4a",
            title: "devotion",
            artist: "love",
            color: "#ff8e6b",
            duration: 240
        },
        {
            src: "music/t5.m4a",
            title: "attachment",
            artist: "love",
            color: "#ff6bd6",
            duration: 225
        },
        {
            src: "music/t6.m4a",
            title: "infatuation",
            artist: "love",
            color: "#ff8e3b",
            duration: 200
        }
    ];

    // Инициализация
    async function init() {
        try {
            // 1. Создаем романтичный фон
            createRomanticBackground();
            
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
            
            // 7. Настраиваем начальное послание
            setupMainMessage();
            
            // 8. Прячем загрузку
            hideLoadingScreen();
            
            console.log('✨ Наша история загружена!');
        } catch (error) {
            console.error('❌ Ошибка:', error);
            showErrorScreen();
        }
    }
    
    // Создание романтичного фона
    function createRomanticBackground() {
        if (!elements.romanticBackground) return;
        
        const container = elements.romanticBackground.querySelector('.constellation-container');
        const stars = elements.romanticBackground.querySelector('.twinkling-stars');
        
        createConstellations(container);
        createTwinklingStars(stars);
        createMoonAnimation();
    }
    
    // Создание созвездий (без изменений)
    function createConstellations(container) {
        if (!container) return;
        
        const constellations = [
            {
                stars: [
                    { x: 20, y: 30, size: 3 },
                    { x: 30, y: 20, size: 4 },
                    { x: 40, y: 30, size: 3 },
                    { x: 35, y: 40, size: 2 },
                    { x: 25, y: 40, size: 2 }
                ],
                connections: [[0,1], [1,2], [2,3], [3,4], [4,0]]
            },
            {
                stars: [
                    { x: 70, y: 60, size: 2 },
                    { x: 75, y: 55, size: 3 },
                    { x: 80, y: 60, size: 2 },
                    { x: 77, y: 65, size: 2 },
                    { x: 73, y: 65, size: 2 }
                ],
                connections: [[0,1], [1,2], [2,3], [3,4], [4,0]]
            },
            {
                stars: [
                    { x: 10, y: 80, size: 2 },
                    { x: 25, y: 75, size: 3 },
                    { x: 40, y: 70, size: 2 },
                    { x: 55, y: 75, size: 3 },
                    { x: 70, y: 80, size: 2 }
                ],
                connections: [[0,1], [1,2], [2,3], [3,4]]
            }
        ];
        
        constellations.forEach(constellation => {
            constellation.stars.forEach(star => {
                const starEl = document.createElement('div');
                starEl.className = 'constellation-star';
                starEl.style.cssText = `
                    position: absolute;
                    left: ${star.x}%;
                    top: ${star.y}%;
                    width: ${star.size}px;
                    height: ${star.size}px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8);
                    animation: starPulse ${2 + Math.random()}s infinite alternate;
                    z-index: 1;
                `;
                container.appendChild(starEl);
                appData.backgroundElements.push(starEl);
            });
            
            constellation.connections.forEach(connection => {
                const [start, end] = connection;
                const startStar = constellation.stars[start];
                const endStar = constellation.stars[end];
                
                const dx = endStar.x - startStar.x;
                const dy = endStar.y - startStar.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                const lineEl = document.createElement('div');
                lineEl.className = 'constellation-line';
                lineEl.style.cssText = `
                    position: absolute;
                    left: ${startStar.x}%;
                    top: ${startStar.y}%;
                    width: ${length}%;
                    height: 1px;
                    background: linear-gradient(90deg, 
                        rgba(255, 107, 139, 0.6) 0%, 
                        rgba(255, 255, 255, 0.8) 50%, 
                        rgba(255, 107, 139, 0.6) 100%);
                    transform-origin: 0 0;
                    transform: rotate(${angle}deg);
                    z-index: 0;
                    animation: lineGlow ${3 + Math.random() * 2}s infinite alternate;
                `;
                container.appendChild(lineEl);
                appData.backgroundElements.push(lineEl);
            });
        });
        
        for (let i = 0; i < 20; i++) {
            const starEl = document.createElement('div');
            const size = Math.random() * 2 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            starEl.className = 'random-star';
            starEl.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.6);
                animation: starTwinkle ${3 + Math.random() * 4}s infinite alternate;
                z-index: 1;
            `;
            container.appendChild(starEl);
            appData.backgroundElements.push(starEl);
        }
    }
    
    function createTwinklingStars(container) {
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 2 + Math.random() * 3;
            
            star.className = 'twinkling-star';
            star.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                animation: starTwinkle ${duration}s infinite ${delay}s;
                z-index: 2;
            `;
            container.appendChild(star);
            appData.backgroundElements.push(star);
        }
    }
    
    function createMoonAnimation() {
        const moon = elements.romanticBackground.querySelector('.moon');
        if (!moon) return;
        
        moon.style.cssText = `
            position: absolute;
            right: 10%;
            top: 10%;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #fff8e1, #ffecb3);
            border-radius: 50%;
            box-shadow: 
                0 0 60px rgba(255, 236, 179, 0.6),
                0 0 100px rgba(255, 236, 179, 0.4),
                inset 20px -20px 20px rgba(0, 0, 0, 0.1);
            z-index: 1;
            animation: moonGlow 8s ease-in-out infinite alternate;
        `;
    }
    
    // Настройка главного послания
    function setupMainMessage() {
        if (!elements.mainMessage) return;
        
        elements.mainMessage.classList.add('active');
        
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            elements.mainMessage.classList.remove('active');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.scrollY < 100) {
                    elements.mainMessage.classList.add('active');
                }
            }, 3000);
        });
        
        elements.mainMessage.addEventListener('click', () => {
            elements.mainMessage.classList.remove('active');
        });
        
        const heart = elements.mainMessage.querySelector('.message-heart');
        if (heart) {
            setInterval(() => {
                heart.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 500);
            }, 2000);
        }
    }
    
    // Рассчет дат с вашими реальными событиями
    function calculateDates() {
        // Дни с начала отношений (30 августа)
        const diffTime = Math.abs(TODAY - RELATIONSHIP_START);
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
    
    // Загрузка фотографий - ИСПРАВЛЕНО!
    async function loadPhotos() {
        console.log('🖼️ Ищем фотографии...');
        
        if (elements.loadingText) {
            elements.loadingText.textContent = 'Загружаем фотографии...';
        }
        
        const foundPhotos = await findPhotos();
        appData.photos = foundPhotos;
        
        if (foundPhotos.length > 0) {
            renderPhotos(foundPhotos);
            console.log(`✅ Найдено ${foundPhotos.length} фотографий`);
            
            // Убираем сообщение о загрузке фото
            if (elements.photosInfo) {
                elements.photosInfo.style.display = 'none';
            }
        } else {
            // Тихо показываем что фото нет, без назойливых сообщений
            console.log('ℹ️ Фотографии не найдены');
            if (elements.photosGrid) {
                elements.photosGrid.innerHTML = '<div class="photos-placeholder"></div>';
            }
            if (elements.photosInfo) {
                elements.photosInfo.style.display = 'none';
            }
        }
    }
    
    // Поиск фотографий
    async function findPhotos() {
        const photos = [];
        const photoNames = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6'];
        const formats = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];
        
        // ВАШИ РЕАЛЬНЫЕ ДАТЫ для фото
        const photoDates = [
            '26 августа 2025 - Первая прогулка в бутербродную',
            '26 августа 2025 - Первый букет цветов',
            '27 августа 2025 - Наша вторая встреча',
            '30 августа 2025 - Начало отношений в ресторане',
            '7 сентября 2025 - Завтрак в Астере',
            '11 сентября 2025 - Прогулка по парку'
        ];
        
        const photoDescs = [
            'Пошли нямать в бутербродную первый раз',
            'Первый букет, подаренный с любовью',
            'Ни секунды не мог без клеш рояля',
            'Красивый ресторан, где все началось',
            'Вкусный завтрак в Астере',
            'Первый разговор о проблемах'
        ];
        
        for (let i = 0; i < photoNames.length; i++) {
            const photoName = photoNames[i];
            
            for (const format of formats) {
                const path = `images/${photoName}${format}`;
                if (await fileExists(path)) {
                    photos.push({
                        src: path,
                        index: i + 1,
                        date: photoDates[i] || `Наш день ${i+1}`,
                        desc: photoDescs[i] || 'Наш прекрасный момент'
                    });
                    break;
                }
            }
        }
        
        return photos;
    }
    
    // Проверка существования файла
    function fileExists(url) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, true);
            xhr.timeout = 2000;
            xhr.onload = () => resolve(xhr.status === 200);
            xhr.onerror = () => resolve(false);
            xhr.ontimeout = () => resolve(false);
            xhr.send();
        });
    }
    
    // Рендер фотографий - УБРАЛ #1, #2 и сообщение о загрузке
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
    
    // Создание элемента фото - УБРАЛ #1, #2
    function createPhotoElement(photo, index) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        div.dataset.index = index;
        
        div.innerHTML = `
            <div class="photo-wrapper">
                <div class="photo-frame">
                    <img src="${photo.src}" 
                         alt="${photo.desc}"
                         class="photo-image"
                         loading="lazy"
                         onerror="this.style.display='none'">
                    <div class="photo-overlay">
                        <div class="photo-date">${photo.date.split(' - ')[0]}</div>
                        <div class="photo-desc">${photo.desc}</div>
                    </div>
                    <div class="photo-heart">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
        `;
        
        div.addEventListener('click', () => openPhotoModal(photo));
        
        return div;
    }
    
    // HTML для фото - УБРАЛ photo-number
    function createPhotoHTML(photo, index) {
        return `
            <div class="photo-wrapper">
                <div class="photo-frame">
                    <img src="${photo.src}" 
                         alt="${photo.desc}"
                         class="photo-image"
                         loading="lazy"
                         onerror="this.style.display='none'">
                    <div class="photo-overlay">
                        <div class="photo-date">${photo.date.split(' - ')[0]}</div>
                        <div class="photo-desc">${photo.desc}</div>
                    </div>
                    <div class="photo-heart">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Инициализация Swiper
    function initSwiper() {
        if (typeof Swiper !== 'undefined' && elements.photosSwiperWrapper && elements.photosSwiperWrapper.children.length > 0) {
            appData.swiper = new Swiper('.photos-swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
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
                        spaceBetween: 20
                    }
                }
            });
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
        
        appData.audio.volume = 0.7;
        appData.audio.addEventListener('timeupdate', updateProgress);
        appData.audio.addEventListener('loadedmetadata', updateDuration);
        appData.audio.addEventListener('ended', nextTrack);
        
        if (elements.playBtn) elements.playBtn.addEventListener('click', togglePlay);
        if (elements.prevBtn) elements.prevBtn.addEventListener('click', prevTrack);
        if (elements.nextBtn) elements.nextBtn.addEventListener('click', nextTrack);
        if (elements.progressBar) elements.progressBar.addEventListener('click', seek);
        
        loadTrack(0);
        createTracksList();
    }
    
    // Загрузка трека
    function loadTrack(index) {
        if (index < 0 || index >= tracks.length) return;
        
        appData.currentTrack = index;
        const track = tracks[index];
        
        if (elements.playerTitle) elements.playerTitle.textContent = track.title;
        if (elements.playerArtist) elements.playerArtist.textContent = track.artist;
        if (elements.timeTotal) elements.timeTotal.textContent = formatTime(track.duration);
        
        if (elements.coverImage) {
            elements.coverImage.style.background = `linear-gradient(135deg, ${track.color}40, ${track.color}80)`;
            elements.coverImage.style.color = track.color;
        }
        
        if (elements.vinyl) {
            elements.vinyl.style.borderColor = `${track.color}50`;
            elements.vinyl.style.color = track.color;
        }
        
        updateTracksList();
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
    
    function pause() {
        appData.audio.pause();
        appData.isPlaying = false;
        updatePlayButton();
        if (elements.vinyl) elements.vinyl.classList.remove('playing');
    }
    
    function togglePlay() {
        if (appData.isPlaying) {
            pause();
        } else {
            play();
        }
    }
    
    function updatePlayButton() {
        const icon = elements.playBtn.querySelector('i');
        if (icon) {
            icon.className = appData.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        updateTracksList();
    }
    
    function nextTrack() {
        let newIndex = appData.currentTrack + 1;
        if (newIndex >= tracks.length) newIndex = 0;
        loadTrack(newIndex);
        if (appData.isPlaying) play();
    }
    
    function prevTrack() {
        let newIndex = appData.currentTrack - 1;
        if (newIndex < 0) newIndex = tracks.length - 1;
        loadTrack(newIndex);
        if (appData.isPlaying) play();
    }
    
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
    
    function updateDuration() {
        if (appData.audio.duration && elements.timeTotal) {
            elements.timeTotal.textContent = formatTime(appData.audio.duration);
        }
    }
    
    function seek(e) {
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (appData.audio.duration) {
            appData.audio.currentTime = percent * appData.audio.duration;
        }
    }
    
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
        initMemories(); // Важно: теперь использует реальные даты
        initPhotoModal();
        initHeartButton();
        initScrollAnimations();
    }
    
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
    
    // ВАШИ РЕАЛЬНЫЕ СООБЩЕНИЯ
    function generateMessages() {
        return [
            { text: "я вроде написал в той приложухе тебе но с лагами там капец", time: "22:30", type: "you" },
            { text: "ой, не видела блин", time: "23:22", type: "me" },
            { text: "никита написал вам, но походу судьба твинби решила иначе", time: "23:24", type: "you" },
            { text: "твинби для дураков", time: "23:28", type: "me" },
            { text: "да, согласен. я никогда не использовал это приложение", time: "23:20", type: "you" },
            { text: "правильно сделал", time: "23:35", type: "me" },
            { text: "анкета конечно привелка внимание, инста добавила", time: "23:40", type: "you" },
            { text: "спс (я скинула стикер с ланой)", time: "23:42", type: "me" }
        ];
    }
    
    function generateMemoryCards() {
        return [
            { date: "6 августа 2025", text: "Первое общение (это уже 3-4 попытка и ты еще не знаешь об этом)" },
            { date: "26 августа 2025", text: "Первая прогулка - пошли нямать в бутербродную" },
            { date: "26 августа 2025", text: "Первый букет цветов" },
            { date: "27 августа 2025", text: "Вторая встреча - ни секунды без клеш рояля" },
            { date: "30 августа 2025", text: "Начало отношений в красивом ресторане" },
            { date: "7 сентября 2025", text: "Вкусный завтрак в Астере" },
            { date: "11 сентября 2025", text: "Прогулка по парку и первый серьезный разговор" }
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
    
    // Воспоминания с ВАШИМИ РЕАЛЬНЫМИ ДАТАМИ
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
    
    // ВАШИ РЕАЛЬНЫЕ ВОСПОМИНАНИЯ
    function generateMemories() {
        return [
            {
                date: "6 августа 2025",
                text: "Первое общение (это уже 3-4 попытка и ты еще не знаешь об этом)"
            },
            {
                date: "26 августа 2025",
                text: "Первая прогулка - пошли нямать в бутербродную. Первый букет цветов"
            },
            {
                date: "27 августа 2025",
                text: "Вторая встреча - ни секунды не мог без клеш рояля"
            },
            {
                date: "30 августа 2025",
                text: "Красивый ресторан, где я была в шоке с цен. Начало наших отношений"
            },
            {
                date: "7 сентября 2025",
                text: "Вкусный завтрак в Астере"
            },
            {
                date: "11 сентября 2025",
                text: "Миленькая прогулка по парку и первый разговор о проблемах"
            },
            {
                date: appData.todayFormatted,
                text: `История продолжается... ${appData.daysTogether} дней счастья вместе`
            }
        ];
    }
    
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
    
    function initHeartButton() {
        const heartBtn = document.getElementById('letterHeart');
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                this.classList.add('pulse');
                
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        createFlyingHeart(this);
                    }, i * 100);
                }
                
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                setTimeout(() => this.classList.remove('pulse'), 1000);
            });
        }
    }
    
    function createFlyingHeart(element) {
        const rect = element.getBoundingClientRect();
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            font-size: 24px;
            z-index: 10000;
            pointer-events: none;
            animation: flyUp 1s ease-out forwards;
            color: #ff6b8b;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
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
    
    window.app = {
        openPhotoModal,
        getDaysTogether: () => appData.daysTogether,
        getPhotos: () => appData.photos
    };
});

// Стили для анимаций и фона (ОСТАВЛЯЕМ КАК ЕСТЬ)
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes starPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
    }
    
    @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes lineGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    
    @keyframes moonGlow {
        0%, 100% { box-shadow: 0 0 60px rgba(255, 236, 179, 0.6), 0 0 100px rgba(255, 236, 179, 0.4), inset 20px -20px 20px rgba(0, 0, 0, 0.1); }
        50% { box-shadow: 0 0 80px rgba(255, 236, 179, 0.8), 0 0 120px rgba(255, 236, 179, 0.6), inset 20px -20px 20px rgba(0, 0, 0, 0.1); }
    }
    
    @keyframes flyUp {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(calc(${Math.random() * 100 - 50}px), -100px) scale(0); opacity: 0; }
    }
    
    .romantic-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #0a0b2e 0%, #1a1b4e 50%, #0a0b2e 100%);
        z-index: -1;
        overflow: hidden;
    }
    
    .constellation-container, .twinkling-stars {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    
    .main-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9998;
        background: rgba(10, 11, 46, 0.9);
        backdrop-filter: blur(5px);
        transition: all 1s ease;
        opacity: 0;
        visibility: hidden;
    }
    
    .main-message.active {
        opacity: 1;
        visibility: visible;
    }
    
    .message-content {
        text-align: center;
        padding: 2rem;
        animation: messageAppear 2s ease;
    }
    
    .love-title {
        font-size: 4rem;
        font-weight: 700;
        color: #ff6b8b;
        margin-bottom: 1rem;
        font-family: 'Pacifico', cursive;
        text-shadow: 0 0 20px rgba(255, 107, 139, 0.5);
        animation: titleGlow 3s infinite alternate;
    }
    
    .love-text {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 2rem;
        line-height: 1.6;
        max-width: 500px;
    }
    
    .message-heart {
        font-size: 5rem;
        color: #ff6b8b;
        animation: heartBeat 2s infinite;
    }
    
    @keyframes messageAppear {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes titleGlow {
        0%, 100% { text-shadow: 0 0 20px rgba(255, 107, 139, 0.5); }
        50% { text-shadow: 0 0 30px rgba(255, 107, 139, 0.8); }
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @media (max-width: 768px) {
        .love-title { font-size: 2.5rem; }
        .love-text { font-size: 1.2rem; padding: 0 1rem; }
        .message-heart { font-size: 3.5rem; }
        .moon { width: 50px !important; height: 50px !important; right: 5% !important; top: 5% !important; }
    }
    
    .modal-track .track-duration {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-left: auto;
        padding-right: 10px;
    }
    
    .modal-track { margin-bottom: 8px; transition: all 0.3s ease; }
    .modal-track:hover { background: rgba(255, 107, 139, 0.1); }
    
    @media (max-width: 768px) {
        .player-main { flex-direction: column; text-align: center; }
        .player-cover { margin: 0 auto 20px !important; }
        .player-info { width: 100% !important; }
        .player-controls { justify-content: center !important; }
    }
    
    @supports (padding: max(0px)) {
        .main-message { padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); }
    }
    
    .photos-placeholder { display: none; }
    
    .error-screen {
        text-align: center; color: white; padding: 40px;
    }
    
    .error-icon {
        font-size: 4rem; color: #ff6b8b; margin-bottom: 20px;
    }
    
    .error-screen h2 {
        font-size: 2rem; margin-bottom: 10px;
    }
    
    .error-screen p {
        font-size: 1.2rem; margin-bottom: 30px; opacity: 0.8;
    }
    
    .reload-btn {
        background: #ff6b8b; color: white; border: none; padding: 12px 30px;
        border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .reload-btn:hover {
        background: #ff8e6b; transform: scale(1.05);
    }
    
    .swipe-card {
        flex: 0 0 auto; width: 220px; background: rgba(255, 255, 255, 0.05);
        border-radius: 15px; padding: 15px; border: 1px solid rgba(255, 107, 139, 0.2);
        cursor: grab; backdrop-filter: blur(10px);
    }
    
    .swipe-card:active { cursor: grabbing; }
    
    .card-date {
        font-size: 0.8rem; color: #ff8e6b; margin-bottom: 8px; font-weight: 500;
    }
    
    .card-text {
        font-size: 1rem; color: white; margin-bottom: 12px; line-height: 1.4;
    }
    
    .card-heart {
        color: #ff6b8b; font-size: 1.3rem; text-align: right; cursor: pointer;
    }
    
    .timeline-item {
        opacity: 0; transform: translateY(30px); transition: all 0.6s ease;
    }
    
    .timeline-item.visible {
        opacity: 1; transform: translateY(0);
    }
`;
document.head.appendChild(additionalStyles);