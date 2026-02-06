// messages.js - Дополнительные функции для переписок

document.addEventListener('DOMContentLoaded', function() {
    // Анимированный ввод сообщений
    function animateMessageTyping() {
        const messages = [
            "Я так сильно по тебе скучаю...",
            "Каждый день с тобой - подарок",
            "Ты мое самое лучшее решение",
            "Люблю наши бесконечные разговоры",
            "Ты делаешь меня лучше",
            "С тобой даже тишина комфортна",
            "Жду нашей следующей встречи",
            "Ты - моя любимая история",
            "Спасибо, что ты есть",
            "Я так счастлив с тобой"
        ];
        
        const chatContainer = document.getElementById('chatContainer');
        
        // Показываем сообщения по одному с анимацией печати
        let messageIndex = 0;
        
        function showNextMessage() {
            if (messageIndex >= messages.length) return;
            
            const message = messages[messageIndex];
            const isMe = messageIndex % 2 === 0;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isMe ? 'me' : 'you'}`;
            
            // Анимация печати
            let charIndex = 0;
            const typingSpeed = 50; // мс на символ
            
            function typeNextChar() {
                if (charIndex < message.length) {
                    const text = message.substring(0, charIndex + 1);
                    messageDiv.innerHTML = `
                        <div class="message-content">${text}</div>
                        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    `;
                    
                    if (!chatContainer.contains(messageDiv)) {
                        chatContainer.appendChild(messageDiv);
                    }
                    
                    // Прокручиваем вниз
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    
                    charIndex++;
                    setTimeout(typeNextChar, typingSpeed);
                } else {
                    messageIndex++;
                    setTimeout(showNextMessage, 1000);
                }
            }
            
            typeNextChar();
        }
        
        // Начинаем анимацию через 3 секунды после загрузки
        setTimeout(showNextMessage, 3000);
    }
    
    // Интерактивные сердечки в переписках
    function makeHeartsInteractive() {
        const hearts = document.querySelectorAll('.item-heart, .message-heart');
        
        hearts.forEach(heart => {
            heart.addEventListener('click', function() {
                // Анимация нажатия
                this.style.transform = 'scale(0.8)';
                this.style.color = '#ff6b8b';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1.2)';
                    this.style.color = '#ff3333';
                }, 100);
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.color = '#ff6b8b';
                }, 200);
                
                // Создаем летающее сердечко
                createFlyingHeart(this);
                
                // Вибрация на мобильных
                if ('vibrate' in navigator) {
                    navigator.vibrate([50, 30, 50]);
                }
            });
        });
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
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flyUp {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
                opacity: 0;
            }
        }
        
        .message-heart {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .typing-indicator {
            display: inline-block;
            padding: 10px 15px;
            background: rgba(107, 139, 255, 0.2);
            border-radius: 20px;
            border: 1px solid rgba(107, 139, 255, 0.3);
            margin-bottom: 10px;
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #6b8bff;
            animation: typing 1.4s infinite;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 100% {
                opacity: 0.4;
                transform: translateY(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Запускаем функции
    setTimeout(() => {
        animateMessageTyping();
        makeHeartsInteractive();
    }, 2000);
    
    // Добавляем индикатор набора текста
    function addTypingIndicator() {
        const chatContainer = document.getElementById('chatContainer');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message you';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(typingDiv);
        
        // Убираем через 2 секунды
        setTimeout(() => {
            if (typingDiv.parentNode) {
                typingDiv.parentNode.removeChild(typingDiv);
            }
        }, 2000);
    }
    
    // Периодически показываем индикатор набора
    setInterval(addTypingIndicator, 15000);
});