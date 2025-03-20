document.addEventListener('DOMContentLoaded', () => {
    // Функция для отображения страницы
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
        const activeButton = document.querySelector(`.nav-btn[onclick="window.showPage('${pageId}')"]`);
        if (activeButton) {
            activeButton.classList.add('active-nav-btn');
        }
    };


    // Обработчик события для кнопки поддержки
    const supportBtn = document.getElementById('support-btn');
    if (supportBtn) {
        supportBtn.addEventListener('click', () => {
            window.open('https://t.me/GrandGruz2bot', '_blank');
        });
    }

    const availableCities = ["Москва", "Тюмень", "Курган", "Челябинск", "Санкт-Петербург"];
    const acceptOrdersButton = document.getElementById('accept-orders-btn');


    const cityInputSelect = document.getElementById('city-input-select');
    const citySuggestionsSelect = document.getElementById('city-suggestions-select');
    const closeCityMenuButton = document.getElementById('close-city-menu');
    const confirmCityButton = document.getElementById('confirm-city-btn');
    let selectedCity = '';

    // Функция для обновления списка подсказок
    function updateCitySuggestions(inputValue) {
        const suggestions = availableCities.filter(city =>
            city.toLowerCase().includes(inputValue.toLowerCase())
        );
        citySuggestionsSelect.innerHTML = ''; // Очищаем предыдущие подсказки
        if (suggestions.length > 0) {
            suggestions.forEach(city => {
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = city;
                suggestionItem.addEventListener('click', () => {
                    cityInputSelect.value = city;
                    selectedCity = city;
                    citySuggestionsSelect.classList.add('hidden'); // Скрываем подсказки после выбора
                });
                citySuggestionsSelect.appendChild(suggestionItem);
            });
            citySuggestionsSelect.classList.remove('hidden'); // Показываем список подсказок
        } else {
            citySuggestionsSelect.classList.add('hidden'); // Скрываем подсказки, если нет совпадений
        }
    }

    // Функция подтверждения города
    function confirmCity() {
        const city = selectedCity || cityInputSelect.value.trim();
        if (city && availableCities.includes(city)) {
            alert(`Вы выбрали город: ${city}`);
            closeCitySelectionMenu();
        } else {
            alert('Пожалуйста, выберите город из списка.');
        }
    }

    // Открытие и закрытие меню
    function openCitySelectionMenu() {
        citySelectionMenu.classList.remove('hidden');
        citySelectionMenu.classList.add('show');
        cityInputSelect.value = ''; // Сбрасываем поле ввода
        citySuggestionsSelect.classList.add('hidden'); // Скрываем подсказки
        selectedCity = ''; // Сбрасываем выбор
    }

    function closeCitySelectionMenu() {
        citySelectionMenu.classList.remove('show');
        setTimeout(() => citySelectionMenu.classList.add('hidden'), 400);
    }

    // Обработчики событий
    if (acceptOrdersButton) {
        acceptOrdersButton.addEventListener('click', openCitySelectionMenu);
    }

    if (closeCityMenuButton) {
        closeCityMenuButton.addEventListener('click', () => {
            closeCitySelectionMenu();
        });
    }

    if (confirmCityButton) {
        confirmCityButton.addEventListener('click', confirmCity);
    }

    if (cityInputSelect) {
        cityInputSelect.addEventListener('input', () => {
            updateCitySuggestions(cityInputSelect.value);
        });

        // Скрываем подсказки при потере фокуса
        cityInputSelect.addEventListener('blur', () => {
            setTimeout(() => {
                if (citySuggestionsSelect) {
                    citySuggestionsSelect.classList.add('hidden');
                }
            }, 200);
        });

        // Показываем подсказки снова при клике
        cityInputSelect.addEventListener('focus', () => {
            updateCitySuggestions(cityInputSelect.value);
        });
    }

    // Модальное окно для ввода номера телефона
    const phoneModal = document.getElementById('phone-modal');
    const phoneInput = document.getElementById('phone-input');
    const phoneSubmitBtn = document.getElementById('phone-submit-btn');
    const userPhoneElement = document.getElementById('user-phone');
    const changePhoneBtn = document.getElementById('change-phone-btn');

    // Показываем модальное окно при загрузке, если номер не сохранён
    const savedPhone = localStorage.getItem('userPhone');
    if (!savedPhone) {
        if (phoneModal) {
            phoneModal.classList.add('show');
        }
    } else {
        if (userPhoneElement) {
            userPhoneElement.textContent = savedPhone;
        }
    }

    if (phoneSubmitBtn) {
        phoneSubmitBtn.addEventListener('click', () => {
            const phoneValue = phoneInput.value.trim();
            // Проверяем номер телефона
            const phonePattern = /^\+?[78][-( ]?\d{3}[-) ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
            if (phonePattern.test(phoneValue)) {
                // Сохраняем номер и скрываем модальное окно
                localStorage.setItem('userPhone', phoneValue);
                if (userPhoneElement) {
                    userPhoneElement.textContent = phoneValue;
                }
                if (phoneModal) {
                    phoneModal.classList.remove('show');
                }
            } else {
                alert('Введите корректный номер телефона.');
            }
        });
    }

    if (changePhoneBtn) {
        changePhoneBtn.addEventListener('click', () => {
            if (phoneInput) {
                phoneInput.value = ''; // Очищаем поле ввода
            }
            if (phoneModal) {
                phoneModal.classList.add('show'); // Показываем модальное окно
            }
        });
    }

    // Инициализация Telegram Web App
    const telegramWebApp = window.Telegram.WebApp;
    if (telegramWebApp.initDataUnsafe && telegramWebApp.initDataUnsafe.user) {
        const userData = telegramWebApp.initDataUnsafe.user;
        // Устанавливаем имя пользователя
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = userData.username || `${userData.first_name} ${userData.last_name}`;
        }
        // Устанавливаем аватарку пользователя
        const userAvatarElement = document.getElementById('user-avatar');
        if (userAvatarElement) {
            if (userData.photo_url) {
                userAvatarElement.src = userData.photo_url;
                userAvatarElement.alt = 'Аватар пользователя';
                userAvatarElement.style.objectFit = 'cover';
            } else {
                userAvatarElement.src = 'image/icon.png'; // Фолбэк, если аватарки нет
            }
        }
    } else {
        console.warn("Telegram Web App не инициализирован или данные пользователя недоступны.");
    }

    // Логика пополнения баланса
    const topUpButton = document.getElementById('top-up-button');
    const topUpMenu = document.getElementById('top-up-menu');
    const topUpConfirmButton = document.getElementById('top-up-confirm-btn');
    const topUpCancelButton = document.getElementById('top-up-cancel-btn');
    const balanceDisplay = document.querySelector('.balance');
    const topUpAmountInput = document.getElementById('top-up-amount');
    const CONFIRMATION_COST = 150;
    const PIN_COST = 250;

    if (topUpButton) {
        topUpButton.addEventListener('click', () => {
            if (topUpMenu) {
                topUpMenu.classList.remove('hidden');
                topUpMenu.classList.add('show');
            }
        });
    }

    if (topUpCancelButton) {
        topUpCancelButton.addEventListener('click', () => {
            if (topUpMenu) {
                topUpMenu.classList.remove('show');
                setTimeout(() => topUpMenu.classList.add('hidden'), 400);
            }
        });
    }

    if (topUpConfirmButton) {
        topUpConfirmButton.addEventListener('click', () => {
            const topUpAmount = parseFloat(topUpAmountInput.value);
            if (topUpAmount > 0) {
                let currentBalance = parseFloat(balanceDisplay.textContent.replace(/[₽\s]/g, ''));
                currentBalance += topUpAmount;
                balanceDisplay.textContent = `${currentBalance.toFixed(0)}₽`;
                topUpAmountInput.value = '';
                if (topUpMenu) {
                    topUpMenu.classList.remove('show');
                    setTimeout(() => topUpMenu.classList.add('hidden'), 400);
                }
            }
        });
    }

    // Логика подписки
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
    const subscriptionNames = {
        client: "💎Заказчик+",
        mover: "✨Грузчик+"
    };
    const descriptions = {
        client: `
            💼Неограниченное количество заявок
            📌Бесплатное закрепление заявок
        `,
        mover: `
            ⭐Высокий приоритет на заявку
        `
    };

    function updateSubscriptionInfo() {
        const type = subscriptionTypeSelect.value;
        const duration = subscriptionDurationSelect.value;
        const price = prices[type][duration];
        if (subscriptionPrice) {
            subscriptionPrice.textContent = `Цена: ${price} руб`;
        }
        if (subscriptionDescription) {
            subscriptionDescription.innerHTML = descriptions[type];
        }
    }

    // Функция для отображения активных подписок без дублирования
    function displayActiveSubscriptions() {
        if (activeSubscriptionsDiv) {
            activeSubscriptionsDiv.innerHTML = '';
            const activeSubscriptions = JSON.parse(localStorage.getItem('activeSubscriptions')) || [];
            activeSubscriptions.forEach(subscription => {
                // Проверяем, существует ли уже элемент с такой подпиской
                const existingSubscription = activeSubscriptionsDiv.querySelector(`[data-subscription-type="${subscription.type}"]`);
                if (!existingSubscription) {
                    const subscriptionElement = document.createElement('div');
                    subscriptionElement.classList.add('subscription-item');
                    subscriptionElement.setAttribute('data-subscription-type', subscription.type);
                    const subscriptionName = subscriptionNames[subscription.type];
                    subscriptionElement.textContent = `${subscriptionName}`;
                    activeSubscriptionsDiv.appendChild(subscriptionElement);
                }
            });
            if (activeSubscriptions.length > 0) {
                activeSubscriptionsDiv.style.display = "block";
            } else {
                activeSubscriptionsDiv.style.display = "none";
            }
        }
    }

    if (buySubscriptionButton) {
        buySubscriptionButton.addEventListener('click', () => {
            if (subscriptionMenu) {
                subscriptionMenu.classList.remove('hidden');
                subscriptionMenu.classList.add('show');
                updateSubscriptionInfo();
            }
        });
    }

    if (cancelSubscriptionButton) {
        cancelSubscriptionButton.addEventListener('click', () => {
            if (subscriptionMenu) {
                subscriptionMenu.classList.remove('show');
                setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
            }
        });
    }

    if (subscriptionTypeSelect) {
        subscriptionTypeSelect.addEventListener('change', updateSubscriptionInfo);
    }

    if (subscriptionDurationSelect) {
        subscriptionDurationSelect.addEventListener('change', updateSubscriptionInfo);
    }

    function showInsufficientFunds() {
        const insufficientFundsPopup = document.getElementById('insufficient-funds-popup');
        if (insufficientFundsPopup) {
            insufficientFundsPopup.classList.add('show');
            setTimeout(() => {
                insufficientFundsPopup.classList.remove('show');
            }, 3000);
        }
    }

    function updateBalance(amount) {
        let currentBalance = parseFloat(balanceDisplay.textContent.replace(/[₽\s]/g, ''));
        const newBalance = currentBalance + amount;
        if (newBalance < 0) {
            showInsufficientFunds();
            return false;
        }
        balanceDisplay.textContent = `${newBalance.toFixed(0)}₽`;
        return true;
    }

    if (confirmSubscriptionButton) {
        confirmSubscriptionButton.addEventListener('click', () => {
            const selectedType = subscriptionTypeSelect.value;
            const selectedDuration = subscriptionDurationSelect.value;
            const price = prices[selectedType][selectedDuration];
            let currentBalance = parseFloat(balanceDisplay.textContent.replace(/[₽\s]/g, ''));
            if (currentBalance >= price) {
                currentBalance -= price;
                balanceDisplay.textContent = `${currentBalance.toFixed(0)}₽`;
                const newSubscription = {
                    type: selectedType,
                    duration: selectedDuration
                };
                let activeSubscriptions = JSON.parse(localStorage.getItem('activeSubscriptions')) || [];
                // Добавляем новую подписку только если её нет
                const isAlreadySubscribed = activeSubscriptions.some(sub => sub.type === newSubscription.type);
                if (!isAlreadySubscribed) {
                    activeSubscriptions.push(newSubscription);
                    localStorage.setItem('activeSubscriptions', JSON.stringify(activeSubscriptions));
                    displayActiveSubscriptions();
                }
                if (subscriptionMenu) {
                    subscriptionMenu.classList.remove('show');
                    setTimeout(() => subscriptionMenu.classList.add('hidden'), 400);
                }
            } else {
                showInsufficientFunds();
            }
        });
    }

    if (activeSubscriptionsDiv) {
        activeSubscriptionsDiv.addEventListener('click', () => {
            if (cancelSubscriptionMenu) {
                cancelSubscriptionMenu.classList.remove('hidden');
                cancelSubscriptionMenu.classList.add('show');
            }
        });
    }

    if (cancelSubscriptionCancelBtn) {
        cancelSubscriptionCancelBtn.addEventListener('click', () => {
            if (cancelSubscriptionMenu) {
                cancelSubscriptionMenu.classList.remove('show');
                setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
            }
        });
    }

    if (cancelSubscriptionConfirmBtn) {
        cancelSubscriptionConfirmBtn.addEventListener('click', () => {
            localStorage.removeItem('activeSubscriptions');
            if (cancelSubscriptionMenu) {
                cancelSubscriptionMenu.classList.remove('show');
                setTimeout(() => cancelSubscriptionMenu.classList.add('hidden'), 400);
            }
            if (activeSubscriptionsDiv) {
                activeSubscriptionsDiv.style.display = 'none';
            }
        });
    }

    displayActiveSubscriptions();

    // Логика создания заказа
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
    const pinCancelButton = document.getElementById('pin-cancel-btn');
    let currentOrderElement = null;

    function openOrderForm() {
        if (createOrderButton) {
            createOrderButton.style.display = 'none';
        }
        if (orderForm) {
            orderForm.classList.remove('hidden');
            orderForm.classList.add('full-screen');
        }
    }

    function closeOrderForm() {
        if (orderForm) {
            orderForm.classList.add('hidden');
            orderForm.classList.remove('full-screen');
        }
        if (createOrderButton) {
            createOrderButton.style.display = 'block';
        }
    }

    function showNotification(message) {
        if (notification) {
            notification.textContent = message;
            notification.style.opacity = 1;
            setTimeout(() => {
                notification.style.opacity = 0;
            }, 2000);
        }
    }

    function confirmOrder(orderElement) {
        if (updateBalance(-CONFIRMATION_COST)) {
            orderElement.classList.add('confirmed');
            orderElement.classList.remove('unconfirmed');
            if (orderElement.querySelector('.confirm-btn')) {
                orderElement.querySelector('.confirm-btn').style.display = 'none';
            }
            if (orderElement.querySelector('.cancel-btn')) {
                orderElement.querySelector('.cancel-btn').style.display = 'inline-block';
            }
            const pinBtn = document.createElement('button');
            pinBtn.classList.add('btn', 'pin-btn');
            pinBtn.textContent = '📌 Закрепить';
            orderElement.appendChild(pinBtn);
            pinBtn.addEventListener('click', () => {
                currentOrderElement = orderElement;
                if (pinMenu) {
                    pinMenu.classList.remove('hidden');
                    pinMenu.classList.add('show');
                }
            });
        }
    }

    if (pinConfirmButton) {
        pinConfirmButton.addEventListener('click', () => {
            if (updateBalance(-PIN_COST)) {
                if (currentOrderElement) {
                    currentOrderElement.classList.add('pinned');
                    if (currentOrderElement.querySelector('.pin-btn')) {
                        currentOrderElement.querySelector('.pin-btn').remove();
                    }
                    const lightningImg = document.createElement('img');
                    lightningImg.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/High%20Voltage.webp";
                    lightningImg.alt = "Закреплено";
                    lightningImg.width = 25;
                    lightningImg.height = 25;
                    lightningImg.style.animation = 'moveDownLeft 1s linear forwards';
                    currentOrderElement.appendChild(lightningImg);
                }
                if (pinMenu) {
                    pinMenu.classList.remove('show');
                    setTimeout(() => pinMenu.classList.add('hidden'), 400);
                }
                showNotification("Заявка закреплена.");
            }
        });
    }

    if (pinCancelButton) {
        pinCancelButton.addEventListener('click', () => {
            if (pinMenu) {
                pinMenu.classList.remove('show');
                setTimeout(() => pinMenu.classList.add('hidden'), 400);
            }
        });
    }

    function cancelOrder(orderElement) {
        if (orderElement.classList.contains('confirmed')) {
            updateBalance(CONFIRMATION_COST);
        }
        if (orderElement.classList.contains('pinned')) {
            updateBalance(PIN_COST);
        }
        orderElement.classList.add('fade-out');
        setTimeout(() => {
            orderElement.remove();
        }, 500);
    }

    function submitOrder() {
        const city = cityInput.value;
        const address = document.getElementById('address').value;
        const task = document.getElementById('task').value;
        const dataz = document.getElementById('Dataz').value;
        const startTime = document.getElementById('start-time').value;
        const payment = document.getElementById('payment').value;
        const people = document.getElementById('people').value;
        const comment = document.getElementById('comment').value;
        if (city && address && task && dataz && startTime && payment && people) {
            // Создание нового элемента заявки
            const newOrder = document.createElement('div');
            newOrder.classList.add('order-item', 'unconfirmed');
            newOrder.innerHTML = `
                <p>🏙️ Город: ${city}</p>
                <p>📍 Адрес: ${address}</p>
                <p>📝 Задание: ${task}</p>
                <p>📅 Дата: ${dataz}</p>
                <p>⏰ Время начала: ${startTime}</p>
                <p>💰 Оплата(руб/час): ${payment} ₽</p>
                <p>👥 Количество людей: ${people}</p>
                <p>💬 Комментарий: ${comment}</p>
                <button class="confirm-btn">Подтвердить заявку</button>
                <button class="cancel-btn">Отменить заявку</button>
            `;
            // Добавляем логику для кнопок заявки
            newOrder.querySelector('.confirm-btn').addEventListener('click', () => confirmOrder(newOrder));
            newOrder.querySelector('.cancel-btn').addEventListener('click', () => cancelOrder(newOrder));
            // Вставляем заявку в DOM
            const ordersSection = document.querySelector('.my-orders-title');
            if (ordersSection) {
                ordersSection.classList.remove('hidden'); // Показываем заголовок
                ordersSection.insertAdjacentElement('afterend', newOrder);
            }
            // Закрываем форму
            closeOrderForm();
            showPage('orders');
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    }


    showPage('home');
});