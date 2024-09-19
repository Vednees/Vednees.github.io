const titleElement = document.getElementById("sub_text");
const texts = [
    "Младший Специалист HR-Управления.",
    "Лидер всегда сравнивает себя с уже состоявшимися и успешными мировыми лидерами."
];
const typingDuration = 2000; // Длительность печати в миллисекундах
const deletingDuration = 2500; // Длительность стирания текста

let currentTextIndex = 0;

function typeText(element, text, duration, callback) {
    const characterCount = text.length;
    const typingSpeed = duration / characterCount; // Скорость печати (ms за символ)
    
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < characterCount) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(intervalId);
            if (callback) callback();
        }
    }, typingSpeed);
}

function deleteText(element, duration, callback) {
    const characterCount = element.textContent.length;
    const deletingSpeed = duration / characterCount; // Скорость стирания (ms за символ)
    
    let index = characterCount;
    const intervalId = setInterval(() => {
        if (index > 0) {
            element.textContent = element.textContent.slice(0, -1);
            index--;
        } else {
            clearInterval(intervalId);
            if (callback) callback();
        }
    }, deletingSpeed);
}

function loopText() {
    const text = texts[currentTextIndex];
    
    // Печать текста, затем стирание, затем повтор
    typeText(titleElement, text, typingDuration, () => {
        setTimeout(() => {
            deleteText(titleElement, deletingDuration, () => {
                currentTextIndex = (currentTextIndex + 1) % texts.length; // Переход к следующему тексту
                setTimeout(loopText, 1500); // Пауза перед повторением
            });
        }, 3000); // Пауза перед стиранием
    });
}

// Запуск анимации
loopText();
