document.addEventListener('DOMContentLoaded', function () {
    // Получаем необходимые элементы DOM
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorContainer = document.querySelector('.indicators');

    // Индекс текущего слайда, начинаем с клонированного слайда
    let currentIndex = 0;

    // Интервал для автоматического переключения слайдов
    const autoSlideInterval = 3000;

    // Флаг для отслеживания анимации
    let isTransitioning = false;

    // Клонируем первый и последний слайд
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Вставляем клоны в начало и конец слайдера
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    // Создаем индикаторы для каждого слайда
    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicatorContainer.appendChild(indicator);

        // Назначаем обработчик события на индикатор для переключения на соответствующий слайд
        indicator.addEventListener('click', function () {
            if (!isTransitioning) {
                // Учитываем клонированный слайд
                currentIndex = index + 1;
                // Обновляем слайдер
                updateSlider();
            }
        });
    });

    // Получаем все индикаторы
    const indicators = document.querySelectorAll('.indicator');

    // Функция для обновления индикаторов
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            // Подсвечиваем текущий слайд
            indicator.classList.toggle('active', index === (currentIndex - 1));
        });
    }

    // Функция для обновления слайдера
    function updateSlider() {
        // Устанавливаем флаг анимации в true
        isTransitioning = true;

        // Вычисляем значение трансформации для текущего слайда
        const translateValue = -currentIndex * 100 + '%';

        // Применяем трансформацию к слайдеру
        slider.style.transform = 'translateX(' + translateValue + ')';
        // Обновляем индикаторы
        updateIndicators();
    }

    // Функция для переключения на предыдущий слайд
    function showPrevSlide() {
        if (!isTransitioning) {
            currentIndex--;
            // Обновляем слайдер
            updateSlider();
        }
    }

    // Функция для переключения на следующий слайд
    function showNextSlide() {
        if (!isTransitioning) {
            currentIndex++;
            // Обновляем слайдер
            updateSlider();
        }
    }

    // Функция для автоматического переключения слайдов
    function autoSlide() {
        // Переключаемся на следующий слайд
        showNextSlide();
    }

    // Добавляем обработчики событий для кнопок
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Запускаем автоматическое переключение слайдов с интервалом
    const autoSlideIntervalId = setInterval(autoSlide, autoSlideInterval);

    // Приостанавливаем автоматическое переключение при наведении на слайдер
    slider.addEventListener('mouseenter', function () {
        clearInterval(autoSlideIntervalId);
    });

    // Возобновляем автоматическое переключение при выходе мыши за пределы слайдера
    slider.addEventListener('mouseleave', function () {
        clearInterval(autoSlideIntervalId);
        // Устанавливаем интервал снова
        setInterval(autoSlide, autoSlideInterval);
    });

    // Обработчик события, срабатывающий по завершении анимации
    slider.addEventListener('transitionend', function () {
        // Если текущий слайд является клоном первого слайда
        if (currentIndex === 0) {
            // Переходим к последнему оригинальному слайду
            currentIndex = slides.length;
            // Убираем анимацию для мгновенного перемещения
            slider.style.transition = 'none';
            // Обновляем слайдер
            updateSlider();
            // Принудительный рефлоу (обновление макета документа)
            slider.offsetHeight;
            // Восстанавливаем анимацию
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        // Если текущий слайд является клоном последнего слайда
        else if (currentIndex === slides.length + 1) {
            // Переходим к первому оригинальному слайду
            currentIndex = 1;
            // Убираем анимацию для мгновенного перемещения
            slider.style.transition = 'none';
            // Обновляем слайдер
            updateSlider();
            // Принудительный рефлоу (обновление макета документа)
            slider.offsetHeight;
            // Восстанавливаем анимацию
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        // Устанавливаем флаг анимации в false после завершения анимации
        isTransitioning = false;
    });

    // Запускаем автоматическое переключение слайдов при загрузке страницы
    setInterval(autoSlide, autoSlideInterval);
});