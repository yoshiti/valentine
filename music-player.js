// music-player.js - Расширенный аудиоплеер с исправлениями
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const mainPlayPauseBtn = document.getElementById('mainPlayPause');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicProgress = document.getElementById('musicProgress');
    const trackProgress = document.getElementById('trackProgress');
    const mainProgressBar = document.getElementById('mainProgressBar');
    const currentSongElement = document.getElementById('currentSong');
    const nowPlayingElement = document.getElementById('nowPlaying');
    const footerSongElement = document.getElementById('footerSong');
    const currentTimeElement = document.getElementById('currentTime');
    const totalTimeElement = document.getElementById('totalTime');
    const currentAlbumElement = document.getElementById('currentAlbum');
    const vinyl = document.getElementById('vinyl');
    const currentCover = document.getElementById('currentCover');
    const prevTrackBtn = document.getElementById('prevTrack');
    const nextTrackBtn = document.getElementById('nextTrack');
    
    // Исправляем путь к музыке
    if (audio.querySelector('source[type="audio/mp4"]')) {
        const m4aSource = audio.querySelector('source[type="audio/mp4"]');
        m4aSource.src = "music/t1.m4a";
    }
    
    // Плейлист
    const tracks = [
        {
            title: 'Наша песня #1',
            album: 'Трек из нашей истории',
            duration: 180, // секунды
            color: '#ff6b8b',
            // Если у тебя есть несколько треков, можешь указать их здесь:
            // src: 'music/t1.m4a'
        },
        {
            title: 'Наша песня #2',
            album: 'Вторая тема',
            duration: 200,
            color: '#6b8bff'
        },
        {
            title: 'Наша песня #3',
            album: 'Третья тема',
            duration: 220,
            color: '#ff8e6b'
        }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    // Инициализация
    function init() {
        // Настройка аудио
        audio.volume = volumeSlider.value / 100;
        audio.loop = false;
        
        // Загрузка первого трека
        loadTrack(currentTrackIndex);
        
        // События для аудио
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextTrack);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('canplay', function() {
            console.log('Аудио готово к воспроизведению');
            // Попытка автовоспроизведения после загрузки
            setTimeout(attemptAutoPlay, 500);
        });
        
        // Обработка ошибок аудио
        audio.addEventListener('error', function(e) {
            console.error('Ошибка загрузки аудио:', audio.error);
            console.log('Попытка загрузить fallback...');
            
            // Пробуем использовать другой источник
            const mp3Source = audio.querySelector('source[type="audio/mpeg"]');
            if (mp3Source) {
                audio.src = mp3Source.src;
                audio.load();
            }
        });
        
        // События для элементов управления
        playPauseBtn.addEventListener('click', togglePlay);
        mainPlayPauseBtn.addEventListener('click', togglePlay);
        muteBtn.addEventListener('click', toggleMute);
        volumeSlider.addEventListener('input', changeVolume);
        mainProgressBar.addEventListener('click', seek);
        
        // Навигация по трекам
        prevTrackBtn.addEventListener('click', prevTrack);
        nextTrackBtn.addEventListener('click', nextTrack);
        
        // События для треков в списке
        document.querySelectorAll('.track-item').forEach((item, index) => {
            item.addEventListener('click', () => playTrack(index));
        });
        
        // События для треков в сайдбаре
        document.querySelectorAll('.sidebar-tracks .track-item').forEach((item, index) => {
            item.addEventListener('click', () => playTrack(index));
        });
        
        // Принудительно загружаем аудио
        audio.load();
    }
    
    function attemptAutoPlay() {
        console.log('Попытка автовоспроизведения...');
        
        // Проверяем, загружено ли аудио
        if (audio.readyState < 2) {
            console.log('Аудио еще не загружено, ждем...');
            setTimeout(attemptAutoPlay, 500);
            return;
        }
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Автовоспроизведение успешно!');
                setPlaying(true);
            }).catch(error => {
                console.log("Автовоспроизведение заблокировано. Требуется клик пользователя.");
                // Показываем подсказку
                showPlayHint();
            });
        }
    }
    
    function showPlayHint() {
        const hint = document.createElement('div');
        hint.className = 'play-hint';
        hint.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 107, 139, 0.9);
                color: white;
                padding: 15px;
                border-radius: 10px;
                z-index: 10000;
                animation: fadeIn 0.5s;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            ">
                <p style="margin: 0; font-size: 14px;">
                    <i class="fas fa-music"></i> Нажми на любую кнопку воспроизведения
                </p>
            </div>
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 5000);
    }
    
    function loadTrack(index) {
        currentTrackIndex = index;
        const track = tracks[index];
        
        // Обновление информации
        nowPlayingElement.textContent = track.title;
        currentSongElement.textContent = track.title;
        footerSongElement.textContent = track.title;
        currentAlbumElement.textContent = track.album;
        currentCover.style.background = `linear-gradient(135deg, ${track.color}30, ${track.color}60)`;
        currentCover.style.color = track.color;
        
        // Обновление времени
        totalTimeElement.textContent = formatTime(track.duration);
        
        // Обновление активного трека в списках
        updateActiveTrack();
        
        // Анимация винила
        vinyl.style.borderColor = `${track.color}50`;
        vinyl.style.color = track.color;
        
        // Создание сердечек в цвет трека
        createTrackHearts(track.color);
    }
    
    function playTrack(index) {
        console.log('Запуск трека:', index);
        
        if (index === currentTrackIndex && isPlaying) {
            togglePlay();
            return;
        }
        
        if (index !== currentTrackIndex) {
            loadTrack(index);
        }
        
        // Если аудио еще не загружено, загружаем
        if (audio.readyState === 0) {
            audio.load();
        }
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setPlaying(true);
                console.log('Трек запущен');
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
                // Показываем сообщение об ошибке
                alert('Для воспроизведения музыки нажмите "Разрешить" или обновите страницу');
            });
        }
    }
    
    function togglePlay() {
        console.log('Toggle play, текущий статус:', isPlaying);
        
        if (isPlaying) {
            audio.pause();
            setPlaying(false);
        } else {
            // Если аудио еще не загружено, загружаем
            if (audio.readyState === 0) {
                audio.load();
            }
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setPlaying(true);
                }).catch(error => {
                    console.error('Ошибка воспроизведения:', error);
                    // Показываем простое сообщение
                    currentSongElement.textContent = 'Нажмите еще раз для запуска';
                    currentSongElement.style.animation = 'pulse 1s infinite';
                });
            }
        }
        
        // Убираем анимацию пульсации
        playPauseBtn.style.animation = '';
        mainPlayPauseBtn.style.animation = '';
    }
    
    function setPlaying(playing) {
        isPlaying = playing;
        
        if (playing) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.classList.add('playing');
            mainPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            mainPlayPauseBtn.classList.add('playing');
            vinyl.classList.add('spinning');
            currentSongElement.style.animation = '';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('playing');
            mainPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            mainPlayPauseBtn.classList.remove('playing');
            vinyl.classList.remove('spinning');
        }
    }
    
    function toggleMute() {
        audio.muted = !audio.muted;
        
        if (audio.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteBtn.style.color = '#666';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            muteBtn.style.color = '#ff6b8b';
        }
    }
    
    function changeVolume() {
        audio.volume = volumeSlider.value / 100;
        
        if (audio.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteBtn.style.color = '#666';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            muteBtn.style.color = '#ff6b8b';
        }
    }
    
    function updateProgress() {
        if (audio.duration && !isNaN(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            musicProgress.style.width = `${progress}%`;
            trackProgress.style.width = `${progress}%`;
            currentTimeElement.textContent = formatTime(audio.currentTime);
        }
    }
    
    function updateDuration() {
        if (audio.duration && !isNaN(audio.duration)) {
            totalTimeElement.textContent = formatTime(audio.duration);
            // Обновляем длительность в массиве треков
            if (tracks[currentTrackIndex]) {
                tracks[currentTrackIndex].duration = audio.duration;
            }
        }
    }
    
    function seek(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (audio.duration && !isNaN(audio.duration)) {
            audio.currentTime = percent * audio.duration;
        }
    }
    
    function prevTrack() {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = tracks.length - 1;
        }
        loadTrack(currentTrackIndex);
        
        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(console.error);
            }
        }
    }
    
    function nextTrack() {
        currentTrackIndex++;
        if (currentTrackIndex >= tracks.length) {
            currentTrackIndex = 0;
        }
        loadTrack(currentTrackIndex);
        
        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(console.error);
            }
        }
    }
    
    function updateActiveTrack() {
        // Обновление главного списка
        document.querySelectorAll('.track-item').forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active');
                const icon = item.querySelector('.track-play i');
                if (icon) {
                    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
                }
            } else {
                item.classList.remove('active');
                const icon = item.querySelector('.track-play i');
                if (icon) {
                    icon.className = 'fas fa-play';
                }
            }
        });
        
        // Обновление сайдбара
        document.querySelectorAll('.sidebar-tracks .track-item').forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function createTrackHearts(color) {
        // Создаем 3 сердечка в цвет трека
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (typeof window.createValentineHeart === 'function') {
                    const x = Math.random() * window.innerWidth;
                    const y = window.innerHeight;
                    const size = Math.random() * 25 + 15;
                    window.createValentineHeart(x, y, size, color);
                }
            }, i * 300);
        }
    }
    
    // Инициализация плеера
    init();
    
    // Экспорт функций для глобального использования
    window.musicPlayer = {
        play: () => {
            audio.play().then(() => setPlaying(true)).catch(console.error);
        },
        pause: () => {
            audio.pause();
            setPlaying(false);
        },
        playTrack,
        nextTrack,
        prevTrack,
        getCurrentTrack: () => tracks[currentTrackIndex],
        getCurrentTrackIndex: () => currentTrackIndex
    };
    
    // Для отладки
    console.log('Аудиоплеер инициализирован');
    console.log('Источники аудио:', {
        m4a: audio.querySelector('source[type="audio/mp4"]')?.src,
        mp3: audio.querySelector('source[type="audio/mpeg"]')?.src
    });
});