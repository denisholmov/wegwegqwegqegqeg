# React + Vite

## После установки проекта на новый пк вводим команду
npm install

## Запуск проекта
npm run dev

## Именование файлов и каталогов

- PascalCase - используется для файлов, содержащих React-компоненты.
- kebab-case - используется для всех остальных файлов.

## Структура проекта
 - модульная архитектура проекта.

```bash
/src
|--pages/               # Страницы: например страница регистрации/домашняя страница(главная)/страница товара/админ панель
|--modules/             # модули со своей бизнес логикой, со своей зоной ответственности. Автономные блоки с полным циклом(UI + логика + API + состояние). Пример: детали товара/корзина покупок/авторизация/поиск/комментарии
|--components/          # Менее самостоятельные куски кода(карточка товара). Можем использовать её в разных модулях. Не имеет запросов на сервер и бизнес логики.
|--ui/                  # Универсальные самые простые переиспользуемые компоненты: кнопки, input, простые компоненты.
```

### Чего не должно быть в pages:
+ Собственные API-запросы
+ Сложная бизнес-логика
+ Состояние (кроме просто ui-состояния)

### Характеристики modules
+ Имеет свою бизнес-логику
+ Работает с API
+ Имеет состояние local или global
+ Может содержать внутренние компоненты
+ Решает одну конкретную задачу

### Характеристики components
+ Переиспользуется в разных модулях/страницах
+ Нет собственных API-запросов
+ Нет сложной бизнес-логики
+ Может иметь простое состояние(isOpen, isActive) эти состояния не работают с сервером.
+ Получает данные через props

## Как определить куда что класть:
Вопрос 1: Это точка входа роутера?
ДА → pages/
НЕТ → идём дальше

Вопрос 2: Имеет сложную бизнес-логику, API, состояние?
ДА → modules/
НЕТ → идём дальше

Вопрос 3: Это базовый UI-элемент (кнопка, инпут)?
ДА → UI/
НЕТ → components/


## Пример pages
```bash
pages/
├── HomePage/                  # Главная страница
│   ├── HomePage.jsx          # Только сборка блоков
│   ├── HomeHero/             # Уникальный блок для главной
│   │   ├── HomeHero.jsx
│   │   └── HomeHero.module.css
│   └── index.js
│
├── ProductPage/              # Страница товара
│   ├── ProductPage.jsx       # Собирает модули товара
│   └── index.js
│
├── AdminPage/                # Админ-панель
│   ├── AdminPage.jsx
│   ├── AdminSidebar/         # Уникальный сайдбар для админки
│   └── AdminHeader/          # Уникальный хедер для админки
│
└── AuthPage/                 # Страница авторизации
    ├── AuthPage.jsx
    └── AuthLayout/           # Уникальный лейаут для auth-страниц
```

## Пример modules
```bash
modules/
├── ProductDetailsModule/     # Детали товара
│   ├── components/           # Внутренние компоненты
│   │   ├── ProductGallery/   # Галерея изображений
│   │   ├── ProductPrice/     # Цена со скидками
│   │   └── ProductActions/   # Кнопки "Купить", "В избранное"
│   ├── api/
│   │   ├── productDetails.api.js    # Запрос деталей товара
│   │   └── addToCart.api.js         # Добавление в корзину
│   ├── hooks/
│   │   ├── useProductDetails.js     # Загрузка данных
│   │   └── useProductActions.js     # Логика действий
│   ├── store/               # Если используешь глобальное состояние
│   │   └── productDetails.slice.js
│   ├── utils/
│   │   └── formatProductData.js     # Форматирование данных товара
│   ├── ProductDetailsModule.jsx     # Главный компонент
│   └── index.js                     # Экспорт главного компонента
│
├── CartModule/              # Корзина покупок
│   ├── api/
│   │   └── cart.api.js              # Все запросы корзины
│   ├── hooks/
│   │   ├── useCart.js               # Управление корзиной
│   │   └── useCartTotals.js         # Расчет сумм
│   ├── CartModule.jsx
│   └── index.js
│
├── AuthModule/              # Авторизация
│   ├── components/
│   │   ├── LoginForm/               # Форма логина
│   │   ├── RegisterForm/            # Форма регистрации
│   │   └── ResetPasswordForm/       # Сброс пароля
│   ├── api/
│   │   ├── login.api.js
│   │   ├── register.api.js
│   │   └── logout.api.js
│   ├── hooks/
│   │   ├── useAuth.js               # Хук авторизации
│   │   └── useAuthValidation.js     # Валидация форм
│   ├── store/
│   │   └── auth.slice.js            # Токен, пользователь
│   ├── utils/
│   │   └── tokenManager.js          # Работа с токенами
│   └── index.js
│
├── CommentsModule/          # Комментарии
│   ├── api/
│   │   ├── fetchComments.api.js
│   │   └── addComment.api.js
│   ├── hooks/
│   │   └── useComments.js           # Пагинация, фильтрация
│   └── CommentsModule.jsx
│
└── SearchModule/            # Поиск
    ├── api/
    │   └── search.api.js            # Поисковые запросы
    ├── hooks/
    │   └── useSearch.js             # Дебаунс, кэширование
    ├── utils/
    │   └── searchAlgorithms.js      # Алгоритмы поиска
    └── SearchModule.jsx
```

## Пример components
```bash
components/
├── ProductCard/             # Карточка товара
│   ├── ProductCard.jsx
│   ├── ProductCard.module.css
│   └── index.js
│
├── UserCard/                # Карточка пользователя
│   ├── UserCard.jsx         # Показывает аватар, имя, статус
│   └── index.js
│
├── Breadcrumbs/             # Хлебные крошки
│   └── Breadcrumbs.jsx      # Просто рендерит список ссылок
│
├── RatingStars/             # Звезды рейтинга
│   └── RatingStars.jsx      # Только отображение рейтинга
│
├── ImageSlider/             # Слайдер изображений
│   ├── ImageSlider.jsx      # Управляет слайдами
│   └── ImageSlider.module.css
│
├── Accordion/               # Аккордеон
│   └── Accordion.jsx        # Только открытие/закрытие
│
├── Pagination/              # Пагинация
│   └── Pagination.jsx       # Рендерит кнопки страниц
│
└── Modal/                   # Модальное окно
    ├── Modal.jsx            # Открытие/закрытие, оверлей
    └── Modal.module.css
```


## Макет
https://www.figma.com/design/rTIAAgDAufAPl61AWjYlrb/%D0%9F%D0%B8%D0%BE%D0%BD%D0%B5%D1%80?node-id=0-1&p=f