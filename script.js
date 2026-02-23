/* ============================================
   ИНИЦИАЛИЗАЦИЯ СКРИПТОВ
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initBidButton();
  initActiveMenuLink();
  initCardClick();
});

/* ============================================
   ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
   ============================================ */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ============================================
   ОБРАБОТКА КНОПКИ "СДЕЛАТЬ СТАВКУ"
   ============================================ */
function initBidButton() {
  const bidButton = document.querySelector('.description__button');
  
  if (bidButton) {
    bidButton.addEventListener('click', function () {
      const lotsSection = document.querySelector('#lots');
      
      if (lotsSection) {
        lotsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

/* ============================================
   АКТИВНАЯ ССЫЛКА В МЕНЮ ПРИ ПРОКРУТКЕ
   ============================================ */
function initActiveMenuLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link, .footer__link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('nav__link_active');
      
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav__link_active');
      }
    });
  });
}

/* ============================================
   КЛИК ПО КАРТОЧКЕ - ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
   ============================================ */
function initCardClick() {
  const cardLinks = document.querySelectorAll('.lots__link');
  
  cardLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const card = this.querySelector('.card');
      const lotTitle = card?.querySelector('.card__title')?.textContent || 'Лот';
      
      openBidModal(lotTitle);
    });
  });
}

/* ============================================
   МОДАЛЬНОЕ ОКНО ДЛЯ СТАВОК
   ============================================ */
function openBidModal(lotTitle) {
  // Проверяем, не открыто ли уже модальное окно
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Создаём модальное окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <button class="modal__close" aria-label="Закрыть">&times;</button>
      <h3 class="modal__title">Ставка на лот</h3>
      <p class="modal__lot-title">${lotTitle}</p>
      <form class="modal__form">
        <label for="bid-amount">Ваша ставка (₽):</label>
        <input type="number" id="bid-amount" name="amount" min="100" step="100" required placeholder="1000" />
        <label for="bid-email">Ваш email:</label>
        <input type="email" id="bid-email" name="email" required placeholder="example@mail.ru" />
        <label for="bid-name">Ваше имя:</label>
        <input type="text" id="bid-name" name="name" required placeholder="Иван Иванов" />
        <button type="submit" class="modal__submit">Сделать ставку</button>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Закрытие по клику на крестик или оверлей
  const closeModal = () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => modal.remove(), 300);
  };
  
  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
  
  // Обработка формы
  modal.querySelector('.modal__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = modal.querySelector('#bid-amount').value;
    const email = modal.querySelector('#bid-email').value;
    const name = modal.querySelector('#bid-name').value;
    
    // Здесь можно добавить отправку данных на сервер
    alert(`Спасибо, ${name}!\nВаша ставка ${amount}₽ принята.\nУведомление отправлено на ${email}`);
    closeModal();
  });
  
  // Закрытие по Escape
  function onEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', onEscape);
    }
  }
  document.addEventListener('keydown', onEscape);
}