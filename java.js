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
        newPage.style.animation = 'fadeInPage 0.5s ease forwards'; // Проигрывается 1 раз
      }
    });
  } else {
    const newPage = document.getElementById(pageId);
    if (newPage) {
      newPage.classList.add('active');
      newPage.style.animation = 'fadeInPage 0.5s ease forwards'; // Проигрывается 1 раз
    }
  }

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav-btn'));
  const activeButton = document.querySelector(`.nav-btn[onclick="showPage('${pageId}')"]`);
  if (activeButton) {
    activeButton.classList.add('active-nav-btn');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const buySubscriptionButton = document.querySelector('.button-container .btn:first-child');
  const subscriptionMenu = document.getElementById('subscription-menu');
  const cancelSubscriptionButton = document.getElementById('subscribe-cancel-btn');
  const confirmSubscriptionButton = document.getElementById('subscribe-confirm-btn');
  const subscriptionTypeSelect = document.getElementById('subscription-type');
  const subscriptionDurationSelect = document.getElementById('subscription-duration');
  const subscriptionPrice = document.getElementById('subscription-price');
  const subscriptionDescription = document.getElementById('subscription-description');
  const activeSubscriptionDiv = document.getElementById('active-subscription');
  const cancelSubscriptionConfirmButton = document.getElementById('cancel-subscription-confirm-btn');
  const cancelSubscriptionCancelButton = document.getElementById('cancel-subscription-cancel-btn');
  const cancelSubscriptionMenu = document.getElementById('cancel-subscription-menu');

  // Стоимости подписок
  const prices = {
    client: { 1: 600, 3: 1400, 6: 4000 },
    mover: { 1: 150, 3: 350, 6: 800 }
  };

  // Описания подписок
  const descriptions = {
    client: `
      <h3>Что даёт подписка Заказчик+</h3>
      <p>💼Неограниченное количество заявок</p>
      <p>📌Бесплатное закрепление заявок</p>
    `,
    mover: `
      <h3>Что даёт подписка Грузчик+</h3>
      <p>⭐ Приоритет на заявку</p>
    `
  };

  // Функция для обновления стоимости и описания
  function updateSubscriptionInfo() {
    const type = subscriptionTypeSelect.value;
    const duration = subscriptionDurationSelect.value;
    const price = prices[type][duration];
    subscriptionPrice.textContent = `Цена: ${price} руб`;
    subscriptionDescription.innerHTML = descriptions[type];
  }

  // Функция для отображения активной подписки
  function displayActiveSubscription() {
    const activeSubscription = JSON.parse(localStorage.getItem('activeSubscription'));
    if (activeSubscription) {
      activeSubscriptionDiv.textContent = activeSubscription.type;
      activeSubscriptionDiv.style.display = "block"; // Отображаем информацию о подписке
    } else {
      activeSubscriptionDiv.textContent = ""; // Очищаем текст, если подписка не куплена
      activeSubscriptionDiv.style.display = "none"; // Скрываем блок с подпиской
    }
  }

  // Открыть меню подписки
  buySubscriptionButton.addEventListener('click', () => {
    subscriptionMenu.classList.remove('hidden');
    subscriptionMenu.classList.add('show');
    updateSubscriptionInfo(); // Обновление информации при открытии
  });

  // Закрыть меню подписки
  cancelSubscriptionButton.addEventListener('click', () => {
    subscriptionMenu.classList.remove('show');
    setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
  });

  // Обновить цену и описание при изменении типа или длительности подписки
  subscriptionTypeSelect.addEventListener('change', updateSubscriptionInfo);
  subscriptionDurationSelect.addEventListener('change', updateSubscriptionInfo);

  // Подтверждение подписки
  confirmSubscriptionButton.addEventListener('click', () => {
    const selectedType = subscriptionTypeSelect.options[subscriptionTypeSelect.selectedIndex].text;
    const selectedDuration = subscriptionDurationSelect.value;
    const price = subscriptionPrice.textContent.match(/\d+/)[0];

    // Сохранение активной подписки в localStorage
    localStorage.setItem('activeSubscription', JSON.stringify({
      type: selectedType
    }));

    displayActiveSubscription(); // Обновить отображение активной подписки

    subscriptionMenu.classList.remove('show');
    setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
  });

  // Отображение активной подписки при загрузке страницы
  displayActiveSubscription();

  // Отмена подписки
  activeSubscriptionDiv.addEventListener('click', () => {
    cancelSubscriptionMenu.classList.remove('hidden');
    cancelSubscriptionMenu.classList.add('show');
  });

  // Подтверждение отмены подписки
  cancelSubscriptionConfirmButton.addEventListener('click', () => {
    localStorage.removeItem('activeSubscription'); // Удаляем информацию о подписке
    displayActiveSubscription(); // Обновляем отображение активной подписки
    cancelSubscriptionMenu.classList.remove('show');
    setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
  });

  // Отмена отмены подписки
  cancelSubscriptionCancelButton.addEventListener('click', () => {
    cancelSubscriptionMenu.classList.remove('show');
    setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
  });
});

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
  "Москва", "Тюмень", "Курган", "Челябинск", "Санкт-Петербург", "Екатеринбург","Казань","Владивосток","Омск",
  "Новосибирск", "Красноярск", "Пермь", "Нижний Новгород", "Краснодар", "Воронеж", "Ростов-на-Дону", 
  "Уфа", "Самара", "Чебоксары", "Ижевск", "Ярославль", "Хабаровск", "Саратов", "Тольятти", "Барнаул", 
  "Иркутск", "Ульяновск", "Волгоград", "Калининград", "Махачкала", "Новокузнецк", "Кемерово", "Рязань", 
  "Набережные Челны", "Ставрополь", "Оренбург", "Сочи", "Тверь", "Владимир", "Курск", "Липецк", 
  "Тула", "Киров", "Челябинск", "Вологда", "Чита", "Пенза", "Брянск", "Архангельск", "Калуга", 
  "Смоленск", "Астрахань", "Белгород", "Нижний Тагил", "Петрозаводск", "Сыктывкар", "Череповец", 
  "Якутск", "Химки", "Балашиха", "Красногорск", "Подольск", "Королёв", "Люберцы", "Мытищи", 
  "Одинцово", "Дзержинский", "Электросталь", "Реутов", "Коломна", "Серпухов", "Видное", "Щёлково", 
  "Домодедово", "Раменское", "Новосибирск", "Красноярск", "Пермь", "Нижний Новгород", "Краснодар", 
  "Воронеж", "Ростов-на-Дону", "Уфа", "Самара", "Чебоксары", "Ижевск", "Ярославль", "Хабаровск", "Саратов", 
  "Тольятти", "Барнаул", "Иркутск", "Ульяновск", "Волгоград", "Калининград", "Махачкала", "Новокузнецк", 
  "Кемерово", "Рязань", "Набережные Челны", "Ставрополь", "Оренбург", "Сочи", "Тверь", "Владимир", 
  "Курск", "Липецк", "Тула", "Киров", "Челябинск", "Вологда", "Чита", "Пенза", "Брянск", "Архангельск", 
  "Калуга", "Смоленск", "Астрахань", "Белгород", "Нижний Тагил", "Петрозаводск", "Сыктывкар", 
  "Череповец", "Якутск", "Химки", "Балашиха", "Красногорск", "Подольск", "Королёв", "Люберцы", 
  "Мытищи", "Одинцово", "Дзержинский", "Электросталь", "Реутов", "Коломна", "Серпухов", "Видное", 
  "Щёлково", "Домодедово", "Раменское", "Крым", "Донецк", "Луганск", "Мариуполь"
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

      // Создаем элемент изображения
      const lightningImg = document.createElement('img');
      lightningImg.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/High%20Voltage.webp";
      lightningImg.alt = "High Voltage";
      lightningImg.width = 25;
      lightningImg.height = 25;
      lightningImg.style.animation = 'moveDownLeft 1s linear forwards'; // Анимация

      pinMenu.currentOrderElement.appendChild(lightningImg); // Добавляем изображение
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
