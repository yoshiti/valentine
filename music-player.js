// music-player.js - Автоматический плеер

document.addEventListener('DOMContentLoaded', function() {
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
            this.modalTracks = document.getElementById('modalTracks');
            
            // Автоматический поиск треков
            this.tracks = this.findAvailableTracks();
            this.currentTrackIndex = 0;
            this.isPlaying = false;
            this.volume = 0.7;
            
            console.log(`🎵 Найдено треков: ${this.tracks.length}`);
            
            this.init();
        }
        
        // Поиск доступных треков
        findAvailableTracks() {
            const tracks = [];
            const trackNames = ['t1', 't2', 't3', 't4', 't5', 't6'];
            const formats = ['.m4a', '.mp3', '.ogg', '.wav'];
            const colors = ['#ff6b8b', '#6b8bff', '#ff8e6b', '#6bff8e', '#ff6bd6', '#ff8e3b'];
            const titles = [
                'Наша первая песня',
                'Дорога домой',
                'Тихий вечер',
                'Утреннее солнце',
                'Ночной разговор',
                'Вечная любовь'
            ];
            const artists = [
                'Наше начало',
                'Путешествие вдвоём',
                'Моменты тишины',
                'Пробуждение',
                'Секреты ночи',
                'Навсегда'
            ];
            
            // Для каждого трека проверяем существование
            trackNames.forEach((trackName, index) => {
                // Пока будем считать что все треки существуют
                // В реальном приложении здесь была бы проверка файлов
                tracks.push({
                    src: `music/${trackName}.m4a`,
                    title: titles[index] || `Наша песня #${index + 1}`,
                    artist: artists[index] || 'Наша история',
                    color: colors[index] || '#ff6b8b',
                    duration: 180 + (index * 30) // Примерная длительность
                });
            });
            
            return tracks;
        }
        
        async init() {
            this.setupAudio();
            this.setupControls();
            this.setupTracksList();
            
            if (this.tracks.length > 0) {
                this.loadTrack(this.currentTrackIndex);
                this.attemptAutoPlay();
            } else {
                this.showNoTracksMessage();
            }
        }
        
        setupAudio() {
            this.audio.volume = this.volume;
            this.audio.loop = false;
            
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('ended', () => this.nextTrack());
            this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
            
            this.audio.addEventListener('error', (e) => {
                console.error('Ошибка аудио:', this.audio.error);
                this.showAudioError();
            });
        }
        
        setupControls() {
            this.playBtn.addEventListener('click', () => this.togglePlay());
            this.prevBtn.addEventListener('click', () => this.prevTrack());
            this.nextBtn.addEventListener('click', () => this.nextTrack());
            this.progressBar.addEventListener('click', (e) => this.seek(e));
        }
        
        setupTracksList() {
            // Основной список
            if (this.tracksList) {
                this.tracksList.innerHTML = '';
                this.tracks.forEach((track, index) => {
                    this.createTrackElement(track, index, this.tracksList);
                });
            }
            
            // Модальный список
            if (this.modalTracks) {
                this.modalTracks.innerHTML = '';
                this.tracks.forEach((track, index) => {
                    this.createTrackElement(track, index, this.modalTracks);
                });
            }
        }
        
        createTrackElement(track, index, container) {
            const element = document.createElement('div');
            element.className = 'track-item';
            if (index === this.currentTrackIndex) {
                element.classList.add('active');
            }
            
            element.innerHTML = `
                <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
                <div class="track-play">
                    <i class="fas fa-${index === this.currentTrackIndex && this.isPlaying ? 'pause' : 'play'}"></i>
                </div>
            `;
            
            element.addEventListener('click', () => {
                if (index === this.currentTrackIndex) {
                    this.togglePlay();
                } else {
                    this.loadTrack(index);
                    this.play();
                }
            });
            
            container.appendChild(element);
        }
        
        attemptAutoPlay() {
            setTimeout(() => {
                if (this.audio.readyState >= 2) {
                    this.play().catch(error => {
                        console.log('Автовоспроизведение заблокировано');
                    });
                }
            }, 2000);
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
            
            // Обновляем список
            this.updateTrackList();
            
            // Устанавливаем аудио
            this.audio.src = track.src;
            this.audio.load();
            
            // Создаем сердечки
            this.createHearts(track.color);
        }
        
        updateTrackList() {
            document.querySelectorAll('.track-item').forEach((item, index) => {
                item.classList.toggle('active', index === this.currentTrackIndex);
                const icon = item.querySelector('.track-play i');
                if (icon) {
                    icon.className = `fas fa-${index === this.currentTrackIndex && this.isPlaying ? 'pause' : 'play'}`;
                }
            });
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
            this.updateTrackList();
        }
        
        prevTrack() {
            let newIndex = this.currentTrackIndex - 1;
            if (newIndex < 0) newIndex = this.tracks.length - 1;
            this.loadTrack(newIndex);
            if (this.isPlaying) this.play();
        }
        
        nextTrack() {
            let newIndex = this.currentTrackIndex + 1;
            if (newIndex >= this.tracks.length) newIndex = 0;
            this.loadTrack(newIndex);
            if (this.isPlaying) this.play();
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
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        createHearts(color) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    if (typeof window.createValentineHeart === 'function') {
                        const x = Math.random() * window.innerWidth;
                        window.createValentineHeart(x, window.innerHeight, 20, color);
                    }
                }, i * 300);
            }
        }
        
        showNoTracksMessage() {
            if (this.tracksList) {
                this.tracksList.innerHTML = `
                    <div class="no-tracks-message">
                        <i class="fas fa-music-slash"></i>
                        <p>Добавьте музыку в папку music/</p>
                    </div>
                `;
            }
        }
        
        showAudioError() {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'audio-error';
            errorDiv.innerHTML = `
                <p>Не удалось загрузить музыку. Проверьте папку music/</p>
            `;
            document.querySelector('.playlist-container').appendChild(errorDiv);
        }
    }
    
    // Инициализация
    setTimeout(() => {
        window.musicPlayer = new MusicPlayer();
    }, 1000);
});