window.showPage = function (pageId) {
  const activePage = document.querySelector('.page.active');

  if (activePage) {
    activePage.style.animation = 'fadeOutPage 0.07s ease forwards';

    activePage.addEventListener('animationend', function handleFadeOut() {
      activePage.classList.remove('active');
      activePage.style.animation = '';
      activePage.removeEventListener('animationend', handleFadeOut);

      const newPage = document.getElementById(pageId);
      if (newPage) {
        newPage.classList.add('active');
        newPage.style.animation = 'fadeInPage 0.07s ease forwards';
      }
    });
  } else {
    const newPage = document.getElementById(pageId);
    if (newPage) {
      newPage.classList.add('active');
      newPage.style.animation = 'fadeInPage 0.07s ease forwards';
    }
  }

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav-btn'));
  const activeButton = document.querySelector(`.nav-btn[onclick="showPage('${pageId}')"]`);
  if (activeButton) {
    activeButton.classList.add('active-nav-btn');
  }
};

document.getElementById('support-btn').addEventListener('click', () => {
  window.open('https://t.me/GrandGruz2bot', '_blank');
});

document.addEventListener('DOMContentLoaded', () => {
  const topUpButton = document.querySelector('.button-container .btn:nth-child(2)');
  const topUpMenu = document.getElementById('top-up-menu');
  const topUpConfirmButton = document.getElementById('top-up-confirm-btn');
  const topUpCancelButton = document.getElementById('top-up-cancel-btn');
  const balanceDisplay = document.querySelector('.balance');
  const topUpAmountInput = document.getElementById('top-up-amount');

  topUpButton.addEventListener('click', () => {
    topUpMenu.classList.remove('hidden');
    topUpMenu.classList.add('show');
  });

  topUpCancelButton.addEventListener('click', () => {
    topUpMenu.classList.remove('show');
    setTimeout(() => topUpMenu.classList.add('hidden'), 400);
  });

  topUpConfirmButton.addEventListener('click', () => {
    const topUpAmount = parseFloat(topUpAmountInput.value);
    if (topUpAmount > 0) {
      let currentBalance = parseFloat(balanceDisplay.textContent.replace(/[₽\s]/g, ''));
      currentBalance += topUpAmount;
      balanceDisplay.textContent = `₽${currentBalance.toFixed(2)}`;

      topUpAmountInput.value = '';
      topUpMenu.classList.remove('show');
      setTimeout(() => topUpMenu.classList.add('hidden'), 400);
    } else {
      alert("Введите сумму больше нуля");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buySubscriptionButton = document.querySelector('.button-container .btn:first-child');
  const subscriptionMenu = document.getElementById('subscription-menu');
  const cancelSubscriptionButton = document.getElementById('subscribe-cancel-btn');
  const confirmSubscriptionButton = document.getElementById('subscribe-confirm-btn');
  const subscriptionTypeSelect = document.getElementById('subscription-type');
  const subscriptionDurationSelect = document.getElementById('subscription-duration');
  const subscriptionPrice = document.getElementById('subscription-price');
  const subscriptionDescription = document.getElementById('subscription-description');
  const activeSubscriptionsDiv = document.getElementById('active-subscription');
  const cancelSubscriptionMenu = document.getElementById('cancel-subscription-menu');
  const cancelSubscriptionConfirmBtn = document.getElementById('cancel-subscription-confirm-btn');
  const cancelSubscriptionCancelBtn = document.getElementById('cancel-subscription-cancel-btn');

  const prices = {
    client: { 1: 600, 3: 1600, 6: 3000 },
    mover: { 1: 150, 3: 350, 6: 650 }
  };

  const descriptions = {
    client: `
      <h3>Что даёт подписка Заказчик+</h3>
      <p>💼Неограниченное количество заявок</p>
      <p>📌Бесплатное закрепление заявок</p>
    `,
    mover: `
      <h3>Что даёт подписка Грузчик+</h3>
      <p>⭐Высокий приоритет на заявку</p>
    `
  };

  function updateSubscriptionInfo() {
    const type = subscriptionTypeSelect.value;
    const duration = subscriptionDurationSelect.value;
    const price = prices[type][duration];
    subscriptionPrice.textContent = `Цена: ${price} руб`;
    subscriptionDescription.innerHTML = descriptions[type];
  }

  function displayActiveSubscriptions() {
    activeSubscriptionsDiv.innerHTML = '';
    const activeSubscriptions = JSON.parse(localStorage.getItem('activeSubscriptions')) || [];

    if (activeSubscriptions.length > 0) {
      activeSubscriptions.forEach(subscription => {
        const subscriptionElement = document.createElement('div');
        subscriptionElement.classList.add('subscription-item');
        subscriptionElement.innerHTML = `<strong>${subscription.type}</strong>`;
        activeSubscriptionsDiv.appendChild(subscriptionElement);
      });
      activeSubscriptionsDiv.style.display = "block";
    } else {
      activeSubscriptionsDiv.style.display = "none";
    }
  }

  buySubscriptionButton.addEventListener('click', () => {
    subscriptionMenu.classList.remove('hidden');
    subscriptionMenu.classList.add('show');
    updateSubscriptionInfo();
  });

  cancelSubscriptionButton.addEventListener('click', () => {
    subscriptionMenu.classList.remove('show');
    setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
  });

  subscriptionTypeSelect.addEventListener('change', updateSubscriptionInfo);
  subscriptionDurationSelect.addEventListener('change', updateSubscriptionInfo);

  confirmSubscriptionButton.addEventListener('click', () => {
    const selectedType = subscriptionTypeSelect.options[subscriptionTypeSelect.selectedIndex].text;
    const selectedDuration = subscriptionDurationSelect.value;
    const newSubscription = {
      type: selectedType,
      duration: selectedDuration
    };

    let activeSubscriptions = JSON.parse(localStorage.getItem('activeSubscriptions')) || [];

    const existingIndex = activeSubscriptions.findIndex(sub => sub.type === selectedType);
    if (existingIndex !== -1) {
      activeSubscriptions[existingIndex] = newSubscription;
    } else {
      activeSubscriptions.push(newSubscription);
    }

    localStorage.setItem('activeSubscriptions', JSON.stringify(activeSubscriptions));
    displayActiveSubscriptions();

    subscriptionMenu.classList.remove('show');
    setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
  });

  activeSubscriptionsDiv.addEventListener('click', () => {
    cancelSubscriptionMenu.classList.remove('hidden');
    cancelSubscriptionMenu.classList.add('show');
  });

  cancelSubscriptionCancelBtn.addEventListener('click', () => {
    cancelSubscriptionMenu.classList.remove('show');
    setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
  });

  cancelSubscriptionConfirmBtn.addEventListener('click', () => {
    localStorage.removeItem('activeSubscriptions');
    cancelSubscriptionMenu.classList.remove('show');
    setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
    activeSubscriptionsDiv.style.display = 'none';
  });

  displayActiveSubscriptions();
});

document.addEventListener('DOMContentLoaded', () => {
  const createOrderButton = document.getElementById('create-order-btn');
  const cancelOrderButton = document.getElementById('cancel-order-btn');
  const submitOrderButton = document.getElementById('submit-order-btn');
  const orderForm = document.getElementById('create-order-form');
  const notification = document.getElementById('notification');
  const viewActiveOrdersButton = document.getElementById('view-active-orders-btn'); // Проверка на null
  const cityInput = document.getElementById('city');
  const citySuggestions = document.getElementById('city-suggestions');
  const pinMenu = document.getElementById('pin-menu');
  const pinConfirmButton = document.getElementById('pin-confirm-btn');

  const availableCities = ["Москва", "Тюмень", "Курган", "Челябинск","Санкт-Петербург", /*... другие города ...*/];

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
      pinMenu.classList.remove('hidden');
      pinMenu.classList.add('show');
      pinMenu.currentOrderElement = orderElement;
      pinMenu.currentPinBtn = pinBtn;
    });
  }

  function submitOrder() {
    const city = cityInput.value;
    const address = document.getElementById('address').value;
    const task = document.getElementById('task').value;
    const Dataz = document.getElementById('Dataz').value;
    const startTime = document.getElementById('start-time').value;
    const payment = document.getElementById('payment').value;
    const people = document.getElementById('people').value;
    const comment = document.getElementById('comment').value;

    if (availableCities.includes(city)) {
      const newOrder = document.createElement('div');
      newOrder.classList.add('order-item', 'unconfirmed');
      newOrder.innerHTML = `
        <p><strong>🏙️ Город:</strong> ${city}</p>
        <p><strong>📍 Адрес:</strong> ${address}</p>
        <p><strong>📝 Задание:</strong> ${task}</p>
        <p><strong>📅 Дата:</strong> ${Dataz}</p>
        <p><strong>⏰ Время начала:</strong> ${startTime}</p>
        <p><strong>💰 Оплата(руб/час):</strong> ${payment} ₽</p>
        <p><strong>👥 Количество людей:</strong> ${people}</p>
        <p><strong>💬 Комментарий:</strong> ${comment}</p>
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
    const suggestions = availableCities.filter(city => city.toLowerCase().includes(inputValue));
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

  document.getElementById('pin-cancel-btn').addEventListener('click', () => {
    pinMenu.classList.remove('show');
    setTimeout(() => pinMenu.classList.add('hidden'), 400);
  });

  pinConfirmButton.addEventListener('click', () => {
    pinMenu.classList.remove('show');
    setTimeout(() => pinMenu.classList.add('hidden'), 400);
    if (pinMenu.currentPinBtn) {
      pinMenu.currentPinBtn.remove();
      const lightningImg = document.createElement('img');
      lightningImg.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/High%20Voltage.webp";
      lightningImg.alt = "High Voltage";
      lightningImg.width = 25;
      lightningImg.height = 25;
      lightningImg.style.animation = 'moveDownLeft 1s linear forwards';
      pinMenu.currentOrderElement.appendChild(lightningImg);
    }
  });

  cityInput.addEventListener('input', updateCitySuggestions);
  cityInput.addEventListener('blur', () => setTimeout(() => citySuggestions.classList.add('hidden'), 200));

  createOrderButton?.addEventListener('click', openOrderForm);
  cancelOrderButton?.addEventListener('click', closeOrderForm);
  submitOrderButton?.addEventListener('click', submitOrder);

  // Проверка наличия viewActiveOrdersButton перед добавлением обработчика событий
  if (viewActiveOrdersButton) {
    viewActiveOrdersButton.addEventListener('click', () => showPage('orders'));
  }

  showPage('home');
});
