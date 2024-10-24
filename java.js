document.addEventListener('DOMContentLoaded', () => {
  const createOrderButton = document.getElementById('create-order-btn');
  const cancelOrderButton = document.getElementById('cancel-order-btn');
  const submitOrderButton = document.getElementById('submit-order-btn');
  const orderForm = document.getElementById('create-order-form');
  const orderCreatedPopup = document.getElementById('order-created-popup');
  const viewActiveOrdersBtn = document.getElementById('view-active-orders-btn'); // Кнопка для перехода к активным заявкам

  // Функция открытия формы создания заявки
  function openOrderForm() {
    createOrderButton.style.display = 'none'; // Прячем кнопку "Создать заявку"
    orderForm.classList.remove('hidden'); // Показываем форму заявки
    orderForm.classList.add('full-screen'); // Разворачиваем форму на весь экран
  }

  // Функция закрытия формы заявки
  function closeOrderForm() {
    orderForm.classList.add('hidden'); // Скрываем форму заявки
    orderForm.classList.remove('full-screen'); // Убираем полный экран
    createOrderButton.style.display = 'block'; // Возвращаем кнопку "Создать заявку"
  }

  // Функция показа уведомления "Заявка создана"
  function showOrderCreatedPopup() {
    orderCreatedPopup.classList.add('show');
    setTimeout(() => {
      orderCreatedPopup.classList.remove('show');
    }, 2000); // Убираем окно через 2 секунды
  }

  // Функция удаления заявки
  function deleteOrder(orderElement) {
    orderElement.remove();
  }

  // Функция отправки заявки
  function submitOrder() {
    const city = document.getElementById('city').value;  // Получаем выбранный город
    const address = document.getElementById('address').value;
    const task = document.getElementById('task').value;
    const startTime = document.getElementById('start-time').value;
    const payment = document.getElementById('payment').value;
    const people = document.getElementById('people').value;
    const comment = document.getElementById('comment').value;  // Получаем комментарий

    if (city && address && task && startTime && payment && people) {
      // Создаем новый элемент заявки
      const newOrder = document.createElement('div');
      newOrder.classList.add('order-item');
      newOrder.innerHTML = `
          <p><strong>🏙️ Город:</strong> ${city}</p>  <!-- Добавляем отображение города -->
          <p><strong>📍 Адрес:</strong> ${address}</p>
          <p><strong>📝 Задание:</strong> ${task}</p>
          <p><strong>⏰ Время начала:</strong> ${startTime}</p>
          <p><strong>💰 Оплата(руб/час):</strong> ${payment} ₽</p>
          <p><strong>👥 Количество людей:</strong> ${people}</p>
          <p><strong>💬 Комментарий:</strong> ${comment}</p>  <!-- Добавляем отображение комментария -->
          <button class="btn cancel-btn">Отменить заявку</button>
      `;

      // Кнопка отмены заявки
      const cancelBtn = newOrder.querySelector('.cancel-btn');
      cancelBtn.addEventListener('click', () => deleteOrder(newOrder));

      // Добавляем заявку в раздел "📝 Мои заявки"
      const myOrdersSection = document.querySelector('.my-orders-title');
      myOrdersSection.insertAdjacentElement('afterend', newOrder); // Теперь заявка добавляется сюда

      // Показываем уведомление о создании заявки
      showOrderCreatedPopup();

      // Закрываем форму после успешной отправки
      closeOrderForm();
    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  }

  // Событие для перехода на страницу "Активные заявки"
  function showOrdersPage() {
    showPage('orders'); // Переключаем на страницу с активными заявками
  }

  // События
  createOrderButton?.addEventListener('click', openOrderForm); // Открытие формы заявки при нажатии кнопки
  cancelOrderButton?.addEventListener('click', closeOrderForm); // Закрытие формы заявки при нажатии "Отмена"
  submitOrderButton?.addEventListener('click', submitOrder); // Отправка заявки

  // Добавляем событие клика на кнопку "Посмотреть активные заявки"
  viewActiveOrdersBtn?.addEventListener('click', showOrdersPage); // Переход на страницу с активными заявками

  // Логика переключения страниц
  window.showPage = function(pageId) {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
      activePage.classList.remove('active');
      activePage.style.animation = 'fadeOutPage 0.5s ease forwards'; // Анимация исчезновения страницы
    }

    setTimeout(() => {
      const newPage = document.getElementById(pageId);
      if (newPage) {  // Проверяем существование страницы
        newPage.classList.add('active');
        newPage.style.animation = 'fadeInPage 0.5s ease forwards'; // Анимация появления страницы
      }
    }, 500);
  };

  // Показываем страницу "home" при запуске
  showPage('home');
});
