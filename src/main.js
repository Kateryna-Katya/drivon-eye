document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Смена фона хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '14px 0';
            header.style.backgroundColor = 'rgba(15, 17, 21, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(15, 17, 21, 0.8)';
        }
    });

    // Мобильное меню (заготовка)
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        // Логика будет расширена при необходимости
        console.log('Mobile menu toggled');
    });
    // Функция ротации текста
function initTextRotation() {
    const rotateElements = document.querySelectorAll('.text-rotate');

    rotateElements.forEach(el => {
        const words = el.getAttribute('data-words').split(', ');
        let currentIndex = 0;

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % words.length;
            
            // Анимация ухода текущего слова и появления нового
            gsap.to(el, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    el.textContent = words[nextIndex];
                    gsap.fromTo(el, 
                        { y: 20, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.4 }
                    );
                    currentIndex = nextIndex;
                }
            });
        }, 3000); // Интервал 3 секунды
    });
}

// Добавляем вызов функции в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initTextRotation();
    
    // Плавное появление элементов Hero
    gsap.from('.fade-in', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
});
    // Внутри DOMContentLoaded
gsap.registerPlugin(ScrollTrigger);

// Анимация появления карточек при скролле
gsap.from('.scroll-reveal', {
    scrollTrigger: {
        trigger: '.about__grid',
        start: 'top 80%', // Анимация начнется, когда верх сетки будет на 80% высоты экрана
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2, // Появление по очереди
    ease: "power2.out"
});
    // Анимация появления Bento-сетки
gsap.from('.bento-reveal', {
    scrollTrigger: {
        trigger: '.features__grid',
        start: 'top 80%',
    },
    opacity: 0,
    scale: 0.9,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "expo.out"
});
});