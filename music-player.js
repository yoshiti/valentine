// music-player.js - Продвинутый аудиоплеер

class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundAudio');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playerProgress = document.getElementById('playerProgress');
        this.progressBar = document.querySelector('.progress-bar');
        this.timeCurrent = document.getElementById('timeCurrent');
        this.timeTotal = document.getElementById('timeTotal');
        this.playerTitle = document.getElementById('playerTitle');
        this.playerArtist = document.getElementById('playerArtist');
        this.coverImage = document.getElementById('coverImage');
        this.vinyl = document.getElementById('vinyl');
        this.tracksList = document.getElementById('tracksList');
        
        this.tracks = window.app?.tracksData || [
            { title: 'Наша песня #1', artist: 'Воспоминание', duration: 225, color: '#ff6b8b', file: 't1.m4a' },
            { title: 'Наша песня #2', artist: 'Дорога домой', duration: 260, color: '#6b8bff', file: 't2.m4a' },
            { title: 'Наша песня #3', artist: 'Тихий вечер', duration: 195, color: '#ff8e6b', file: 't3.m4a' },
            { title: 'Наша песня #4', artist: 'Утреннее солнце', duration: 245, color: '#6bff8e', file: 't4.m4a' },
            { title: 'Наша песня #5', artist: 'Ночной разговор', duration: 230, color: '#ff6bd6', file: 't5.m4a' }
        ];
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.volume = 0.7;
        
        this.init();
    }
    
    init() {
        this.setupAudio();
        this.setupControls();
        this.setupTracksList();
        this.loadTrack(this.currentTrackIndex);
        
        // Попытка автовоспроизведения
        this.attemptAutoPlay();
        
        console.log('🎵 Музыкальный плеер инициализирован');
    }
    
    setupAudio() {
        this.audio.volume = this.volume;
        this.audio.loop = false;
        
        // События аудио
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('canplay', () => {
            console.log('Аудио готово к воспроизведению');
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Ошибка аудио:', this.audio.error);
            this.showAudioError();
        });
    }
    
    setupControls() {
        // Кнопка play/pause
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // Кнопки переключения треков
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Прогресс-бар
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        
        // Громкость через свайп на мобильных
        this.setupVolumeControl();
    }
    
    setupTracksList() {
        this.tracksList.innerHTML = '';
        
        this.tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            if (index === this.currentTrackIndex) {
                trackElement.classList.add('active');
            }
            
            trackElement.innerHTML = `
                <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="track-play">
                    <i class="fas fa-${index === this.currentTrackIndex && this.isPlaying ? 'pause' : 'play'}"></i>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                if (index === this.currentTrackIndex) {
                    this.togglePlay();
                } else {
                    this.loadTrack(index);
                    this.play();
                }
            });
            
            this.tracksList.appendChild(trackElement);
        });
    }
    
    setupVolumeControl() {
        // Свайп вверх/вниз для громкости на мобильных
        let touchStartY;
        let initialVolume = this.volume;
        
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.player-controls')) {
                touchStartY = e.touches[0].clientY;
                initialVolume = this.audio.volume;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (touchStartY !== undefined && e.target.closest('.player-controls')) {
                e.preventDefault();
                const touchY = e.touches[0].clientY;
                const diff = touchStartY - touchY;
                const volumeChange = diff / 200; // 200px = полная громкость
                
                let newVolume = initialVolume + volumeChange;
                newVolume = Math.max(0, Math.min(1, newVolume));
                
                this.audio.volume = newVolume;
                this.showVolumeIndicator(newVolume);
            }
        });
        
        document.addEventListener('touchend', () => {
            touchStartY = undefined;
            setTimeout(() => {
                this.hideVolumeIndicator();
            }, 1000);
        });
    }
    
    showVolumeIndicator(volume) {
        let indicator = document.getElementById('volumeIndicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'volumeIndicator';
            indicator.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px 30px;
                border-radius: 20px;
                font-size: 1.5rem;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            document.body.appendChild(indicator);
        }
        
        const volumePercent = Math.round(volume * 100);
        indicator.innerHTML = `
            <i class="fas fa-volume-${volumePercent > 50 ? 'up' : volumePercent > 0 ? 'down' : 'mute'}"></i>
            <span>${volumePercent}%</span>
        `;
        
        indicator.style.display = 'flex';
    }
    
    hideVolumeIndicator() {
        const indicator = document.getElementById('volumeIndicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }
    
    attemptAutoPlay() {
        // Ждем немного перед автовоспроизведением
        setTimeout(() => {
            if (this.audio.readyState >= 2) {
                this.play().catch(error => {
                    console.log('Автовоспроизведение заблокировано:', error);
                    this.showPlayHint();
                });
            } else {
                // Если аудио еще не загружено, ждем
                this.audio.addEventListener('canplay', () => {
                    this.play().catch(error => {
                        console.log('Автовоспроизведение заблокировано после загрузки:', error);
                        this.showPlayHint();
                    });
                }, { once: true });
            }
        }, 2000);
    }
    
    showPlayHint() {
        const hint = document.createElement('div');
        hint.className = 'play-hint';
        hint.innerHTML = `
            <div style="
                position: fixed;
                bottom: 100px;
                left: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff6b8b, #ff8e6b);
                color: white;
                padding: 20px;
                border-radius: 20px;
                z-index: 10000;
                animation: slideUp 0.5s;
                box-shadow: 0 10px 30px rgba(255, 107, 139, 0.4);
                text-align: center;
                font-size: 1.1rem;
                font-weight: 600;
            ">
                <i class="fas fa-music" style="margin-right: 10px;"></i>
                Нажми на кнопку воспроизведения, чтобы запустить музыку
            </div>
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 5000);
    }
    
    showAudioError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: rgba(255, 86, 86, 0.9);
            color: white;
            padding: 20px;
            border-radius: 15px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 86, 86, 0.4);
        `;
        
        errorDiv.innerHTML = `
            <h3 style="margin-bottom: 10px;">
                <i class="fas fa-exclamation-triangle"></i> Ошибка загрузки музыки
            </h3>
            <p style="margin-bottom: 15px; font-size: 0.9rem;">
                Проверьте папку "music" и наличие файлов t1.m4a, t2.m4a и т.д.
            </p>
            <button onclick="this.parentNode.remove()" style="
                background: white;
                color: #ff5656;
                border: none;
                padding: 8px 20px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">
                Понятно
            </button>
        `;
        
        document.body.appendChild(errorDiv);
    }
    
    loadTrack(index) {
        if (index < 0 || index >= this.tracks.length) return;
        
        this.currentTrackIndex = index;
        const track = this.tracks[index];
        
        // Обновляем интерфейс
        this.playerTitle.textContent = track.title;
        this.playerArtist.textContent = track.artist;
        this.timeTotal.textContent = this.formatTime(track.duration);
        
        // Обновляем обложку
        this.coverImage.style.background = `linear-gradient(135deg, ${track.color}40, ${track.color}80)`;
        this.coverImage.style.color = track.color;
        this.vinyl.style.borderColor = `${track.color}50`;
        this.vinyl.style.color = track.color;
        
        // Обновляем список треков
        document.querySelectorAll('.track-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
            const icon = item.querySelector('.track-play i');
            if (icon) {
                icon.className = `fas fa-${i === index && this.isPlaying ? 'pause' : 'play'}`;
            }
        });
        
        // Устанавливаем источник аудио
        this.audio.src = `music/${track.file}`;
        this.audio.load();
        
        // Обновляем футер
        if (window.app && window.app.updateNowPlaying) {
            window.app.updateNowPlaying(track);
        }
        
        // Создаем сердечки в цвет трека
        this.createTrackHearts(track.color);
        
        console.log(`🎶 Загружен трек: ${track.title}`);
    }
    
    play() {
        return this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.vinyl.classList.add('playing');
            return true;
        }).catch(error => {
            console.error('Ошибка воспроизведения:', error);
            this.isPlaying = false;
            this.updatePlayButton();
            return false;
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.vinyl.classList.remove('playing');
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    updatePlayButton() {
        const icon = this.playBtn.querySelector('i');
        if (icon) {
            icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        
        // Обновляем иконку в списке треков
        const activeTrack = document.querySelector('.track-item.active');
        if (activeTrack) {
            const trackIcon = activeTrack.querySelector('.track-play i');
            if (trackIcon) {
                trackIcon.className = `fas fa-${this.isPlaying ? 'pause' : 'play'}`;
            }
        }
    }
    
    prevTrack() {
        let newIndex = this.currentTrackIndex - 1;
        if (newIndex < 0) newIndex = this.tracks.length - 1;
        
        this.loadTrack(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    nextTrack() {
        let newIndex = this.currentTrackIndex + 1;
        if (newIndex >= this.tracks.length) newIndex = 0;
        
        this.loadTrack(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.playerProgress.style.width = `${progress}%`;
            this.timeCurrent.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        if (this.audio.duration) {
            this.timeTotal.textContent = this.formatTime(this.audio.duration);
            // Обновляем длительность в массиве треков
            if (this.tracks[this.currentTrackIndex]) {
                this.tracks[this.currentTrackIndex].duration = this.audio.duration;
            }
        }
    }
    
    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (this.audio.duration) {
            this.audio.currentTime = percent * this.audio.duration;
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    createTrackHearts(color) {
        // Создаем 5 сердечек в цвет трека
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (typeof window.createValentineHeart === 'function') {
                    const x = Math.random() * window.innerWidth;
                    const y = window.innerHeight + 50;
                    const size = Math.random() * 25 + 15;
                    window.createValentineHeart(x, y, size, color);
                }
            }, i * 200);
        }
    }
    
    // Публичные методы
    playTrack(index) {
        if (index === this.currentTrackIndex && this.isPlaying) {
            this.togglePlay();
        } else {
            this.loadTrack(index);
            this.play();
        }
    }
    
    getCurrentTrack() {
        return this.tracks[this.currentTrackIndex];
    }
    
    getCurrentTrackIndex() {
        return this.currentTrackIndex;
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
    }
    
    getVolume() {
        return this.volume;
    }
}

// Инициализация плеера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.musicPlayer = new MusicPlayer();
    }, 1000);
});