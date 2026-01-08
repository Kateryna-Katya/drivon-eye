document.addEventListener('DOMContentLoaded', () => {
    // 1. ИНИЦИАЛИЗАЦИЯ БИБЛИОТЕК
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    // 2. МОБИЛЬНОЕ МЕНЮ (Исправленная логика)
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (menuToggle && menuOverlay) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('is-active');
            menuOverlay.classList.toggle('is-active');
            document.body.style.overflow = menuOverlay.classList.contains('is-active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 3. УНИВЕРСАЛЬНАЯ РОТАЦИЯ ТЕКСТА (По всему проекту)
    const initTextRotation = () => {
        const rotateElements = document.querySelectorAll('.text-rotate');
        rotateElements.forEach(el => {
            const wordsAttr = el.getAttribute('data-words');
            if (!wordsAttr) return;

            const words = wordsAttr.split(', ');
            let index = 0;

            setInterval(() => {
                const nextIndex = (index + 1) % words.length;
                
                const tl = gsap.timeline();
                tl.to(el, {
                    y: -10,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        el.textContent = words[nextIndex];
                        index = nextIndex;
                    }
                })
                .fromTo(el, 
                    { y: 10, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }, 3000);
        });
    };
    initTextRotation();

    // 4. НАДЕЖНАЯ ЛОГИКА ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ (Scroll Reveal)
    // Мы создаем отдельный триггер для каждого элемента, чтобы они подгружались корректно
    const revealSelectors = [
        '.fade-in', 
        '.scroll-reveal', 
        '.bento-reveal', 
        '.flow-reveal', 
        '.blog-reveal', 
        '.contact-reveal'
    ];

    revealSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", // Элемент начнет появляться, когда его верх на 90% высоты экрана
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "expo.out",
                delay: i % 3 * 0.1 // Небольшая задержка для элементов, идущих друг за другом
            });
        });
    });

    // 5. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookies-accepted')) {
        gsap.to(cookiePopup, { 
            display: 'block', 
            opacity: 1, 
            y: 0, 
            delay: 2, 
            duration: 0.8 
        });
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            gsap.to(cookiePopup, { 
                opacity: 0, 
                y: 50, 
                duration: 0.5, 
                onComplete: () => cookiePopup.style.display = 'none' 
            });
        });
    }

    // 6. ВАЛИДАЦИЯ ФОРМЫ
    const contactForm = document.getElementById('ajax-form');
    if (contactForm) {
        const phoneInput = document.getElementById('phone-input');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, '');
            });
        }
    }

    // 7. ОБНОВЛЕНИЕ SCROLLTRIGGER (Важно для корректных расчетов)
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});