export default defineI18nLocale(async () => {
  return {
    title: "Лог разработчика",
    header: {
      article: "Статьи",
      author: "Об авторе",
      project: "Проекты"
    },
    dialog: {
      accept: "Принять",
      decline: "Отклонить"
    },
    cookie: {
      title: "Мы используем cookie. Это позволяет нам анализировать взаимодействие посетителей с сайтом и делать его лучше.",
      description: "Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie."
    },
    error: {
      title: "Произошла ошибка!",
      description: "Команда котов-разработчиков уже работает над тем чтобы устранить данную ошибку.",
      retry: "Попробуйте перезайти позже или перейти на главную страницу",
      go: "На главную страницу"
    },
    time: {
      year: {
        less: "Меньше {n} года | Меньше {n} лет",
        fact: "{n} год | {n} года | {n} лет",
        more: "Больше {n} года | Больше {n} лет"
      }
    },
    projects: {
      neovimBoilerplate: {
        short: "Темплейт для создания конфигураций Neovim",
        long: {
          1: "Я достаточно часто писал конфигурации для Vim/Neovim и всякий раз замечал, как паттерны для структурирования конфигурации повторялись. Именно для этого и был создан Neovim Boilerplate — простой и хорошо задокументированный темплейт для написания собственной конфигурации.",
        }
      },
      interquesty: {
        short: "Приложение, которое помогает интервьюерам выбирать вопросы",
        long: {
          1: "Intquest — приложение, которое я сделал пару дней для собственного пользования. Дело в том что во время интервью не всегда удобно быстро придумывать новые вопросы для кандидата, держать список с вопросами в заметках оказалось не так удобно, как я думал. Именно в тот момент мне и пришла идея придумать приложение, которое бы имело разнообразный список вопросов с короткими ответами на них.",
          2: "Данное приложение содержит большой список вопросов по фронтенду, который в будущем еще будем расширяться. Кроме того была добавлена возможность делиться заданными вопросами (и ответами на них) с помощью ссылки, для того чтобы кандидат смог просмотреть все вопросы, которые собеседующий задавал во время интервью и найти на них верные короткие вопросы."
        }
      },
      developerLog: {
        short: "Один из моих самых больших проектов",
        long: {
          1: "Developer Log — Один из моих самых крупных проектов. Я делал его больше для себя, нежели для других людей, ибо не нашел нормальной платформы, где мог бы делиться знаниями.",
          2: "На разработку данного блога я потратил чуть больше года (данная версия — уже 3-я итерация), основная аудитория приходит на данный блог из других порталов. Данный проект является накоплением моих знаний из разных отраслей."
        }
      },
      dontdo: {
        short: "Приложение для управления списком дел",
        long: {
          1: "Don't Do - простое приложение для управления делами. Я старался делать его максимально минималистичным. Вместо директорий и групп - теги, вместо огромного количества фильтров - поиск со своим синтаксисом. Я все время использую его для того чтобы делать свои приложения.",
          2: "Несмотря на то что \"Don't Do\" был сделан за пару выходных - данное приложение является одним из моих любимых, ибо концепция приложения такая же легкая, как и его реализация",
        }
      },
      capybara: {
        short: "Кроссплатформенное приложение для код-ревью",
        long: {
          1: "Capybara — кроссплатформенное приложение для код-ревью, которое создано для того чтобы облегчить сам процесс код-ревью.",
          2: "Приложение имеет интеграцию с Github и Gitlab, а также может работать автономно с локальным репозиторием."
        }
      }
    },
    hardware: {
      theme: "Тема",
      browser: "Браузер",
      cliEditor: "Консольный редактор",
      editor: "Редактор",
      headphone: "Наушники",
      keyboard: "Клавиатура",
      pc: "Основной ПК",
      search: "Поиск",
      terminal: "Терминал",
      font: "Шрифт",
    },
    stack: {
      purpose: {
        first: "Первый язык программирования",
        main: "Основной язык программирования",
        backend: "Язык программирования, который я использую для бэкенда",
        fun: "Язык программирования, который я изучаю просто так 🌝"
      }
    },
    page: {
      privacy: {
        title: "Политика конфиденциальности"
      },
      license: {
        tabTitle: "Лицензия",
        title: "Лицензии",
        source: "Источник",
        license: "Лицензия",
        phrase: {
          test: "Тесты на",
          host: "Хостится на",
          store: "Хранится на",
          made: "Сделано с помощью",
          work: "Работает благодаря",
          thanks: "Отдельное спасибо"
        }
      },
      projects: {
        tabTitle: "Проекты",
        stack: "Стек",
        links: "Ссылки",
        chooseTitle: "Выберите один из проектов",
        chooseDescription: "Для того чтобы продолжить, вам нужно выбрать один из проектов из списка."
      },
      home: {
        tabTitle: "Домашняя",
        title: "Лог разработчика",
        description: "Лог разработки глазами разработчика",
        hero: "\"Лог разработчика\" - блог, который пишет разработчик для других разработчиков. Тут находятся статьи и заметки о современных веб-технологиях и методах разработки. Я делюсь своим опытом, знаниями и предоставляю доступные руководства по погружению в мир разработки от основ до продвинутых техник. Особенность блога – понятное изложение сложных тем для широкой аудитории. Будьте в курсе новейших тенденций и улучшайте свои навыки вместе с \"Логом разработчика\".",
        telegramButton: "Перейти в телеграм",
        subtitle: "Перейти к чтению"
      },
      posts: {
        tabTitle: "Статьи",
        searchPlaceholder: "Найти запись по названию, описанию или тегу...",
        showNotes: "Показать заметки",
        stubTitle: "Ничего не найдено",
        stubInfo: "По вашему запросу ничего не найдено.",
        stubTryAgain: "Проверьте поле поиска на опечатки или напишите другой запрос."
      },
      post: {
        neighbours: {
          next: "Следующая статья",
          previous: "Предыдушая статья",
        }
      },
      author: {
        tabTitle: "Автор",
        hello: "Привет!",
        me: "Я – опытный фронтэнд-разработчик с более чем четырьмя годами успешного опыта в создании и улучшении приложений. Мои навыки и знания охватывают широкий спектр современных веб-технологий, что позволяет мне разрабатывать высококачественные и интуитивно понятные приложения.",
        pursuit: "Я стремлюсь продолжать расти как фронтэнд-разработчик, внося свой вклад в развитие современных и инновационных веб-приложений. Я активно веду блог, а также пишу на VC, Habr и в Telegram.",
        role: "Моя роль включала разработку и поддержку веб-приложений, обеспечение их адаптивности и кросс-браузерной совместимости, а также интеграцию с бэкэнд-сервисами. Я активно участвовал в архитектурных решениях и всегда стремлюсь к улучшению процессов разработки."
      }
    }
  };
});
