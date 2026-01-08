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
});