document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок и плагинов
    if (typeof lucide !== 'undefined') lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    // --- 2. ЛОГИКА МОБИЛЬНОГО МЕНЮ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('is-active');
            menuOverlay.classList.toggle('is-active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Закрытие при клике на ссылку
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                menuOverlay.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 3. РОТАЦИЯ ТЕКСТА В ЗАГОЛОВКАХ ---
    const initTextRotation = () => {
        document.querySelectorAll('.text-rotate').forEach(el => {
            const words = el.getAttribute('data-words').split(', ');
            let index = 0;
            
            setInterval(() => {
                const nextIndex = (index + 1) % words.length;
                gsap.to(el, {
                    y: -10, opacity: 0, duration: 0.4,
                    onComplete: () => {
                        el.textContent = words[nextIndex];
                        gsap.fromTo(el, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
                        index = nextIndex;
                    }
                });
            }, 3000);
        });
    };
    initTextRotation();

    // --- 4. РАБОТА ФОРМЫ (ИСПРАВЛЕНО) ---
    const form = document.getElementById('ajax-form');
    if (form) {
        const captchaTask = document.getElementById('captcha-task');
        const captchaInput = document.getElementById('captcha-input');
        const phoneInput = document.getElementById('phone-input');
        const statusMsg = document.getElementById('form-status');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Генерация капчи
        let n1 = Math.floor(Math.random() * 10);
        let n2 = Math.floor(Math.random() * 5);
        let result = n1 + n2;
        if (captchaTask) captchaTask.textContent = `${n1} + ${n2}`;

        // Валидация телефона (только цифры и +)
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Проверка капчи
            if (parseInt(captchaInput.value) !== result) {
                alert('Ошибка: неверная капча!');
                return;
            }

            // Имитация отправки
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Показываем сообщение об успехе
                statusMsg.style.display = 'flex';
                statusMsg.style.opacity = '1';

                // Обновляем капчу
                n1 = Math.floor(Math.random() * 10);
                n2 = Math.floor(Math.random() * 5);
                result = n1 + n2;
                captchaTask.textContent = `${n1} + ${n2}`;

                setTimeout(() => {
                    gsap.to(statusMsg, { opacity: 0, duration: 0.5, onComplete: () => statusMsg.style.display = 'none' });
                }, 4000);
            }, 1500);
        });
    }

    // --- 5. АНИМАЦИЯ ПОЯВЛЕНИЯ (SCROLL REVEAL) ---
    const revealElements = [
        '.hero__content', '.hero__visual',
        '.about-card', '.feature-card',
        '.insight-card', '.contact-reveal'
    ];

    revealElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // Принудительное обновление триггеров
    ScrollTrigger.refresh();
    // --- ЛОГИКА COOKIE POPUP ---
    const initCookies = () => {
        const cookiePopup = document.getElementById('cookie-popup');
        const cookieAccept = document.getElementById('cookie-accept');

        // Проверяем, есть ли уже согласие в локальном хранилище
        const isAccepted = localStorage.getItem('drivon_cookies_accepted');

        if (!isAccepted && cookiePopup) {
            // Показываем плашку через 2 секунды после загрузки
            setTimeout(() => {
                cookiePopup.style.display = 'block';
                // Анимация появления снизу
                gsap.fromTo(cookiePopup, 
                    { y: 100, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
                );
            }, 2000);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                // Сохраняем выбор пользователя
                localStorage.setItem('drivon_cookies_accepted', 'true');
                
                // Анимация исчезновения
                gsap.to(cookiePopup, { 
                    y: 100, 
                    opacity: 0, 
                    duration: 0.5, 
                    ease: "power3.in",
                    onComplete: () => {
                        cookiePopup.style.display = 'none';
                    }
                });
            });
        }
    };

    // Запускаем инициализацию куки
    initCookies();
});