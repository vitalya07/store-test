const slides = document.querySelector('.slider__slides');
const slideCount = document.querySelectorAll('.slider__slides-slide').length;
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');

let currentIndex = 0;

// Переменные для свайпов (touch и mouse)
let startX = 0;
let endX = 0;
let isDragging = false; // Флаг для предотвращения случайных срабатываний
const minSwipeDistance = 50; // Минимальная дистанция для свайпа в пикселях

function goToSlide(index) {
    if (index < 0) {
        index = slideCount - 1;
    } else if (index >= slideCount) {
        index = 0;
    }

    currentIndex = index;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// Обработчики для touch (сенсорные устройства)
slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Обработчики для mouse (десктоп и устройства без touch)
slides.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

slides.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Игнорируем, если не зажата кнопка мыши
    // Можно добавить визуальную обратную связь, например, изменение курсора
});

slides.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    endX = e.clientX;
    handleSwipe();
});

// Общая функция для обработки свайпа
function handleSwipe() {
    const deltaX = startX - endX;
    if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            // Свайп влево - следующий слайд
            goToSlide(currentIndex + 1);
        } else {
            // Свайп вправо - предыдущий слайд
            goToSlide(currentIndex - 1);
        }
    }
}

goToSlide(0);
