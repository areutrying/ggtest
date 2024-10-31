window.showPage = function (pageId) {
  const activePage = document.querySelector('.page.active');

  if (activePage) {
    activePage.style.animation = 'fadeOutPage 0.5s ease forwards';

    activePage.addEventListener('animationend', function handleFadeOut() {
      activePage.classList.remove('active');
      activePage.style.animation = '';
      activePage.removeEventListener('animationend', handleFadeOut);

      const newPage = document.getElementById(pageId);
      if (newPage) {
        newPage.classList.add('active');
        newPage.style.animation = 'fadeInPage 0.5s ease forwards';
      }
    });
  } else {
    const newPage = document.getElementById(pageId);
    if (newPage) {
      newPage.classList.add('active');
      newPage.style.animation = 'fadeInPage 0.5s ease forwards';
    }
  }

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav-btn'));
  const activeButton = document.querySelector(`.nav-btn[onclick="showPage('${pageId}')"]`);
  if (activeButton) {
    activeButton.classList.add('active-nav-btn');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const createOrderButton = document.getElementById('create-order-btn');
  const cancelOrderButton = document.getElementById('cancel-order-btn');
  const submitOrderButton = document.getElementById('submit-order-btn');
  const orderForm = document.getElementById('create-order-form');
  const notification = document.getElementById('notification');
  const viewActiveOrdersButton = document.getElementById('view-active-orders-btn');
  const cityInput = document.getElementById('city');
  const citySuggestions = document.getElementById('city-suggestions');
  const pinMenu = document.getElementById('pin-menu');
  const pinConfirmButton = document.getElementById('pin-confirm-btn');

  const availableCities = [
    "Москва", "Тюмень", "Курган", "Челябинск", "Санкт-Петербург", "Екатеринбург",
    // Добавьте другие города здесь
  ];

  function openOrderForm() {
    createOrderButton.style.display = 'none';
    orderForm.classList.remove('hidden');
    orderForm.classList.add('full-screen');
  }

  function closeOrderForm() {
    orderForm.classList.add('hidden');
    orderForm.classList.remove('full-screen');
    createOrderButton.style.display = 'block';
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = 1;
    setTimeout(() => {
      notification.style.opacity = 0;
    }, 2000);
  }

  function deleteOrder(orderElement) {
    orderElement.classList.add('fade-out');
    setTimeout(() => {
      orderElement.remove();
    }, 500);
  }

  function confirmOrder(orderElement) {
    orderElement.classList.add('confirmed');
    orderElement.classList.remove('unconfirmed');
    orderElement.querySelector('.confirm-btn').style.display = 'none';
    
    const pinBtn = document.createElement('button');
    pinBtn.classList.add('btn', 'pin-btn');
    pinBtn.textContent = '📌 Закрепить';
    orderElement.appendChild(pinBtn);

    pinBtn.addEventListener('click', () => {
      pinMenu.classList.remove('hidden'); // Открыть меню закрепления
      pinMenu.classList.add('show'); // Добавить класс для отображения по центру

      // Сохранить текущую заявку и кнопку для обновления после закрепления
      pinMenu.currentOrderElement = orderElement;
      pinMenu.currentPinBtn = pinBtn;
    });
  }

  function submitOrder() {
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const task = document.getElementById('task').value;
    const startTime = document.getElementById('start-time').value;
    const payment = document.getElementById('payment').value;
    const people = document.getElementById('people').value;
    const comment = document.getElementById('comment').value;

    if (availableCities.includes(city)) {
      const newOrder = document.createElement('div');
      newOrder.classList.add('order-item', 'unconfirmed');

      newOrder.innerHTML = `
        <p><strong>🏙️ Город:</strong> <span data-city>${city}</span></p>
        <p><strong>📍 Адрес:</strong> <span data-address>${address}</span></p>
        <p><strong>📝 Задание:</strong> <span data-task>${task}</span></p>
        <p><strong>⏰ Время начала:</strong> <span data-start-time>${startTime}</span></p>
        <p><strong>💰 Оплата(руб/час):</strong> <span data-payment>${payment} ₽</span></p>
        <p><strong>👥 Количество людей:</strong> <span data-people>${people}</span></p>
        <p><strong>💬 Комментарий:</strong> <span data-comment>${comment}</span></p>
        <button class="btn confirm-btn">Подтвердить заявку</button>
        <button class="btn cancel-btn">Отменить заявку</button>
      `;

      newOrder.querySelector('.confirm-btn').addEventListener('click', () => confirmOrder(newOrder));
      newOrder.querySelector('.cancel-btn').addEventListener('click', () => deleteOrder(newOrder));

      const myOrdersSection = document.querySelector('.my-orders-title');
      myOrdersSection.insertAdjacentElement('afterend', newOrder);

      showNotification('Заявка создана!');
      closeOrderForm();
      showPage('orders');
    } else {
      showNotification('Неверно указан город. Пожалуйста, выберите город из списка.');
    }
  }

  function updateCitySuggestions() {
    const inputValue = cityInput.value.toLowerCase();
    const suggestions = availableCities.filter(city => 
      city.toLowerCase().includes(inputValue)
    );

    citySuggestions.innerHTML = '';
    citySuggestions.classList.remove('hidden');

    suggestions.forEach(city => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = city;
      suggestionItem.addEventListener('click', () => {
        cityInput.value = city;
        citySuggestions.classList.add('hidden');
      });
      citySuggestions.appendChild(suggestionItem);
    });

    if (suggestions.length === 0) {
      citySuggestions.classList.add('hidden');
    }
  }

  // Закрытие меню закрепления заявки по кнопке "Отмена"
  document.getElementById('pin-cancel-btn').addEventListener('click', () => {
    pinMenu.classList.remove('show'); // Убираем отображение по центру
    setTimeout(() => pinMenu.classList.add('hidden'), 400); // Убираем после анимации
  });

  // Закрепление заявки при нажатии на "Закрепить" в меню
  pinConfirmButton.addEventListener('click', () => {
    pinMenu.classList.remove('show'); // Убираем отображение по центру
    setTimeout(() => pinMenu.classList.add('hidden'), 400); // Убираем после анимации

    if (pinMenu.currentPinBtn) {
      pinMenu.currentPinBtn.remove(); // Удаляем кнопку "Закрепить"
      const lightningEmoji = document.createElement('span');
      lightningEmoji.textContent = '⚡️';
      pinMenu.currentOrderElement.appendChild(lightningEmoji); // Добавляем смайлик
    }
  });

  cityInput.addEventListener('input', updateCitySuggestions);
  cityInput.addEventListener('blur', () => {
    setTimeout(() => {
      citySuggestions.classList.add('hidden');
    }, 200);
  });

  createOrderButton?.addEventListener('click', openOrderForm);
  cancelOrderButton?.addEventListener('click', closeOrderForm);
  submitOrderButton?.addEventListener('click', submitOrder);
  viewActiveOrdersButton?.addEventListener('click', () => showPage('orders'));

  showPage('home');
});
