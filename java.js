@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #222629; /* Темный фон */
  color: #ffffff; /* Светлый текст */
  transition: all 0.3s ease-in-out;
}

.container {
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
  padding-bottom: 70px;
}
.balance {
    font-size: 2em;
    margin: 35px 0px;
}
.balance-section {
    padding: 7px;
    background-color: #262a2f;
    border-radius: 12px;
    box-shadow: inset 0px 0px 12px rgb(132 255 26 / 32%);
}
.button-container {
    padding: 7px;
    background-color: #262a2f;
    border-radius: 12px;
    box-shadow: inset 0 0 8px 4px #364d31;
    margin-top: 15px;
    height: 89px;
}

.button-container .btn {
    width: 111px;
    height: 80px;
    background-color: #3d4148; /* Цвет кнопок для минималистичного дизайна */
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    padding: 7px;
    transition: background-color 0.3s ease;
    margin: 0 2px;
    text-align: center;
    box-shadow: inset 0px 0px 12px rgb(0 0 0 / 27%);
    margin: 5px 2px;
    display: inline-grid;
}

.button-container .btn:hover {
    background-color: #4b5159; /* Темный оттенок для эффекта наведения */
}
.rating-info {
    font-size: 1em;
    color: #ffffff;
    padding: 7px;
    text-align: center;
    background-color: #262a2f;
    border-radius: 8px;
    box-shadow: inset 0px 0px 7px rgb(255 255 2 / 58%);
    height: 27px;
    width: 160px;
    margin-bottom: 5px;
    text-align: center;
}


/* Кнопка пополнения баланса */
.top-up-btn {
  background-color: #61892F; /* Зелёный */
  border: none;
  padding: 15px;
  font-size: 1.5em;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  color: #fff;
}

.top-up-btn:hover {
  background-color: #86C232; /* Ярко-зелёный при наведении */
  box-shadow: 0 0 10px rgba(134, 194, 50, 0.6);
}

/* Секция заявок */
.order-section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.order-section .btn {
    width: 163px;
    height: 104px;
    aspect-ratio: 1 / 1;
    border-radius: 15px;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3e3e3ea3;
    color: #ffffff;
    box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
    margin: 2px 7px;
    border: none;
    padding: 13px;
    margin-top: 20px;
    flex-direction: column;
    align-items: stretch;
}


.order-section .btn:hover {
    background-color: #37412a;
}


/* Минималистичные кнопки */
.minimal-btn {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #61892F; /* Зелёная рамка */
  padding: 10px;
  font-size: 1.2em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  box-shadow: inset 0px 0px 12px rgb(0 0 0 / 27%);
}

.minimal-btn:hover {
  background-color: #61892F;
  color: white;
  transform: translateY(-5px);
}

/* Стили для формы заявки */
.order-form {
  background-color: #262a2f; /* Серый фон */
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(134, 194, 50, 0.3); /* Зелёное свечение */
  margin: 20px auto;
  max-width: 90%;
  text-align: left;
}

.order-form label {
  color: #86C232; /* Ярко-зелёный для меток */
  font-weight: bold;
}

.order-form input,
.order-form select,
.order-form textarea {
  width: 325px;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: none;
  background-color: #333537; /* Темно-серый фон полей */
  color: #ffffff;
}

.order-form textarea {
  resize: none;
  height: 100px;
}

.order-form .btn {
  width: 48%;
  margin: 10px 1%;
  background-color: #61892F;
  color: white;
  border: none;
  padding: 10px;
  font-size: 1.1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-form .btn:hover {
  background-color: #86C232;
}

/* Всплывающее окно для уведомления */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    background-color: #2b2e33;
    color: #ffffff;
    padding: 20px;
    width: 90%;
    max-width: 300px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 1.1em;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.popup.show {
  opacity: 1;
  visibility: visible;
}

/* Стили для новых заявок */
.order-item {
  padding: 20px;
  background-color: #262a2f;
  color: #ffffff;
  border-radius: 12px;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 3%; /* Отступ снизу */
  transition: box-shadow 0.5s ease; /* Плавный переход для тени */
}

.order-item.unconfirmed {
  box-shadow: inset 0px 0px 20px 0px yellow; /* Жёлтая тень для неподтвержденных заявок */
}

.order-item.confirmed {
  box-shadow: inset 0px 0px 20px 0px green; /* Зелёная тень для подтвержденных заявок */
  opacity: 1; /* Подтверждённые заявки остаются яркими */
}

.order-item p {
  margin: 5px 0;
}

.order-item hr {
  border: 1px solid #86C232;
}

/* Кнопка отмены заявки */
.cancel-btn {
  background-color: rgb(247 0 0 / 0%);
  border: 2px solid #ff5e5ed4;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #86C232;
}

/* Кнопки редактирования и подтверждения */
.edit-btn, .confirm-btn {
  background-color: #61892F;
  color: #ffffff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover, .confirm-btn:hover {
  background-color: #86C232;
}

/* Стили для заголовка "Мои заявки" */
.my-orders-title {
  font-size: 1.5em;
  color: #ffffff;
  margin-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  display: inline-block;
  width: 100%;
}

/* Стили для страницы Чат */
#chat {
  padding: 20px;
  background-color: #262a2f;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 20px 0px rgb(105 146 49 / 49%);
  text-align: center;
  width: 90%; /* Ширина */
}

#chat h1 {
  color: #86C232;
}

#chat p {
  margin-top: 15px;
  font-size: 1.2em;
}

/* Нижнее меню с эмодзи */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #222629;
  padding: 12px 0;
  z-index: 1000;
}

.nav-btn {
  background-color: transparent;
  border: none;
  color: #f0f0f0;
  font-size: 1.3em;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease-in-out;
}

.nav-btn:hover {
  transform: scale(1.1);
  color: #86C232;
}

/* Блокировка страниц до регистрации */
.page {
  display: none;
}

.page.active {
  display: block;
}

/* Скрытый элемент */
.hidden {
  display: none;
}

/* Анимации для страниц */
@keyframes fadeInPage {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOutPage {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Анимации для других элементов */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-section {
  margin-top: 35px;
  padding: 25px;
  background-color: #262a2f;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgb(0 0 0 / 30%);
  text-align: left;
  margin-bottom: 4%;
}

.info-section h2, .info-section h3 {
  color: #86C232;
  margin-bottom: 18px;
}

.info-section p {
  margin-bottom: 18px;
  line-height: 1.7;
  font-size: 1.1em;
}

.support-link {
  color: #61892F;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.support-link:hover {
  color: #86C232;
}

/* Контейнер для аватара */
#avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 15px; /* Закругленные края */
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Легкая тень */
}

/* Стили для изображения аватара */
#user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px; /* Закругленные края изображения */
}

/* Пример изменения цвета кнопки при активации */
.active-nav-btn {
  color: #86C232;
}

/* Убрать полосу прокрутки для всей страницы */
::-webkit-scrollbar {
  width: 0;
}

  /* Стили для уведомлений */
  .notification {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #217a5d;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      box-shadow: inset 0px 0px 12px rgb(0 0 0 / 27%);
    }
    .order-item.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

/* Стили для кнопки "Закрепить" */
.pin-btn {
  background-color: rgb(247 0 0 / 0%);
  border: 2px solid #61892F;
  color: white;
  padding: 9px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.pin-btn:hover {
  background-color: #86C232;
}

/* Стили для списка подсказок городов */
#city-suggestions {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  position: absolute;
  background-color: #61892f;
  color: #ffffff;
  border-radius: 8px;
  z-index: 100;
  max-height: 150px;
  overflow-y: auto;
}

#city-suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#city-suggestions li:hover {
  background-color: #333537;
}

/* Всплывающее меню закрепления заявки */
#pin-menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8); /* Начальная трансформация */
  background-color: #2b2e33; /* Темный фон */
  color: #ffffff;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Глубокая тень */
  text-align: center;
  font-size: 1.1em;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, transform 0.4s ease; /* Плавное появление */
}

/* Стили для текста и кнопок */
#pin-menu p {
  margin-bottom: 20px;
  font-size: 1.2em;
  color: #ffffff;
}

/* Кнопки подтверждения и отмены в всплывающем меню */
#pin-menu .btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #61892F; /* Основной зеленый */
  border: none;
  color: #ffffff;
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#pin-menu .btn:hover {
  background-color: #86C232; /* Более яркий зеленый при наведении */
}

/* Отмена - кнопка с другим стилем */
#pin-cancel-btn {
  background-color: #b7381e; /* Темно-красный для отмены */
}

#pin-cancel-btn:hover {
  background-color: #ff4d4d; /* Ярко-красный при наведении */
}

/* Анимация для появления и исчезновения */
#pin-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1); /* Конечная трансформация */
}

@keyframes moveDownLeft {
  from {
    transform: translate(1px, 6px);
  }
  to {
    transform: translate(1px, 6px); /* Измените значения на нужные вам */
  }
}

/* Стили для полноэкранного меню подписки */
.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 38, 41, 0.95);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s;
}

.fullscreen-menu.show {
  opacity: 1;
  visibility: visible;
}

.menu-content {
  text-align: center;
  padding: 30px;
  background-color: #2b2e33;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  width: 320px;
}

.menu-content h2 {
  font-size: 1.8em;
  color: #ffffff;
  margin-bottom: 20px;
}

.menu-content label {
  display: block;
  font-size: 1.1em;
  color: #86C232;
  margin-top: 15px;
  margin-bottom: 5px;
}

.menu-content select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #333537;
  color: #ffffff;
  font-size: 1em;
  margin-bottom: 20px;
}

#subscription-price {
  font-size: 1.2em;
  color: #ffffff;
  margin-bottom: 20px;
}

#subscribe-confirm-btn,
#subscribe-cancel-btn {
  display: inline-block;
  padding: 12px 20px;
  background-color: #61892F;
  border: none;
  color: #ffffff;
  border-radius: 8px;
  margin: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

#subscribe-confirm-btn:hover {
  background-color: #86C232;
}

#subscribe-cancel-btn {
  background-color: #b7381e;
}

#subscribe-cancel-btn:hover {
  background-color: #ff4d4d;
}

.subscription-description {
      padding: 7px;
    background-color: #262a2f;
    border-radius: 12px;
    box-shadow: inset 0px 0px 12px rgb(255 0 0 / 76%);
    margin-top: 15px;
}

.subscription-info {
  margin-top: 0px;
  font-size: 1em;
  color: #ffffff;
  padding: 7px;
  text-align: center;
  background-color: #262a2f;
  border-radius: 8px;
  box-shadow: inset 0px 0px 8px rgb(255 255 255 / 61%);
  height: 27px;
  width: 120px;
  margin: -23px 0px;
  margin-bottom: 5px;
  text-align: center;
}

#cancel-subscription-menu {
  /* ... (другие стили) ... */
}

/* Кнопка "нет" */
#cancel-subscription-menu .btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    color: #000000;
    border-radius: 8px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #688f41;
    width: 100px;
    height: 46px;
}

/* Кнопка "Да" */
#cancel-subscription-confirm-btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    color: #000000;
    border-radius: 8px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #8f2f2f;
    width: 100px;
    height: 50px;

#cancel-subscription-confirm-btn:hover {
  background-color: #cc0000; /* Темнее красный при наведении */
}
