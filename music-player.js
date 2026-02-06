// music-player.js - Управление музыкой
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicProgress = document.getElementById('musicProgress');
    const trackProgress = document.getElementById('trackProgress');
    const currentSongElement = document.getElementById('currentSong');
    const nowPlayingElement = document.getElementById('nowPlaying');
    const footerSongElement = document.getElementById('footerSong');
    
    // Попытка автовоспроизведения
    setTimeout(() => {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtn.classList.add('playing');
            }).catch(error => {
                console.log("Автовоспроизведение заблокировано. Требуется взаимодействие пользователя.");
                // Показываем сообщение о необходимости клика
                playPauseBtn.style.animation = 'pulse 1s infinite';
            });
        }
    }, 1000);
    
    // Управление воспроизведением
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.classList.add('playing');
            this.style.animation = '';
        } else {
            audio.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
            this.classList.remove('playing');
        }
    });
    
    // Управление громкостью
    muteBtn.addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.muted = true;
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Обновление прогресса
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100 || 0;
        musicProgress.style.width = `${progress}%`;
        trackProgress.style.width = `${progress}%`;
        
        // Обновление времени
        updateTimeDisplay();
    });
    
    function updateTimeDisplay() {
        const current = formatTime(audio.currentTime);
        const total = formatTime(audio.duration);
        
        document.querySelector('.time-current').textContent = current;
        document.querySelector('.time-total').textContent = total;
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Клик по прогресс-бару
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    });
    
    // Обработка треков из плейлиста
    document.querySelectorAll('.track-item').forEach(track => {
        track.addEventListener('click', function() {
            // Обновляем активный трек
            document.querySelectorAll('.track-item').forEach(t => {
                t.classList.remove('active');
                t.querySelector('.track-play i').className = 'fas fa-play';
            });
            
            this.classList.add('active');
            this.querySelector('.track-play i').className = 'fas fa-pause';
            
            // Обновляем информацию о текущем треке
            const title = this.querySelector('.track-title').textContent;
            currentSongElement.textContent = title;
            nowPlayingElement.textContent = title;
            footerSongElement.textContent = title;
            
            // Здесь можно добавить реальную смену трека
            // Для этого нужно иметь прямые ссылки на аудиофайлы
        });
    });
    
    // Обновление названия трека при изменении
    audio.addEventListener('play', function() {
        currentSongElement.textContent = 'Eminem, Rihanna - Love The Way You Lie';
    });
});