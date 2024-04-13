export default defineI18nLocale(async () => {
  return {
    title: "Әзірлеуші ​​журналы",
    header: { article: "Мақалалар", author: "автор туралы", project: "Жобалар" },
    dialog: { accept: "Қабылдау", decline: "Қабылдамау" },
    cookie: {
      title: "Біз cookie файлдарын қолданамыз. Бұл келушілердің сайтпен қалай әрекеттесетінін талдауға және оны жақсартуға мүмкіндік береді.",
      description: "Сайтты пайдалануды жалғастыра отырып, сіз cookie файлдарын пайдалануға келісесіз."
    },
    error: {
      title: "Қате орын алды!",
      description: "Бұл қатені түзету үшін мысықтарды дамыту тобы қазірдің өзінде жұмыс істеп жатыр.",
      retry: "Әрекетті кейінірек қайталаңыз немесе негізгі бетке өтіңіз",
      go: "Басты бетке"
    },
    time: {
      year: {
        less: "{n} жылдан аз | {n} жылдан аз",
        fact: "{n} жыл | {n} жыл | {2 жыл",
        more: "{n} жылдан астам | {n} жылдан астам"
      }
    },
    projects: {
      neovimBoilerplate: {
        short: "Neovim конфигурацияларын жасауға арналған үлгі",
        long: {
          1: "Мен Vim/Neovim конфигурацияларын жиі жаздым және әр жолы конфигурацияны құрылымдау үлгілерінің қайталану жолын байқадым. Дәл осы себепті Neovim Boilerplate жасалды - өзіңіздің конфигурацияңызды жазуға арналған қарапайым және жақсы құжатталған үлгі.",
        }
      },
      interquesty: {
        short: "Сұхбат алушыларға сұрақтарды таңдауға көмектесетін қолданба",
        long: {
          1: "Intquest - бұл бір-екі күн бұрын жеке пайдалану үшін жасаған қолданба. Әңгімелесу кезінде үміткерге жаңа сұрақтарды тез қою әрқашан қолайлы бола бермейді; сұрақтар тізімін жазбаларда сақтау мен ойлағандай ыңғайлы емес болып шықты. Дәл сол кезде маған қысқа жауаптары бар сұрақтардың әртүрлі тізімі болатын қосымшаны ойлап табу идеясы келді.",
          2: "Бұл қолданбада болашақта кеңейтілетін сұрақтардың үлкен тізімі бар. Сонымен қатар, үміткер сұхбат барысында сұхбат алушы қойған барлық сұрақтарды қарап, олар үшін дұрыс қысқа сұрақтарды таба алатындай сілтеме арқылы қойылған сұрақтарды (және олардың жауаптарын) бөлісу мүмкіндігі қосылды.",
        }
      },
      developerLog: {
        short: "Менің ең үлкен жобаларымның бірі",
        long: {
          1: "Developer Log - Менің ең үлкен жобаларымның бірі. Мен мұны басқа адамдарға қарағанда өзім үшін көбірек жасадым, өйткені мен біліммен бөлісетін қалыпты платформа таппадым.",
          2: "Мен бұл блогты әзірлеуге бір жылдан сәл астам уақыт жұмсадым (бұл нұсқа қазірдің өзінде 3-ші итерация), негізгі аудитория бұл блогқа басқа порталдардан келеді. Бұл жоба менің әртүрлі салалардағы білімімнің жинақтауы."
        }
      },
      dontdo: {
        short: "Істер тізімін басқару қолданбасы",
        long: {
          1: "Don't Do - қарапайым істерді басқару қолданбасы. Мен оны мүмкіндігінше минималистік етіп жасауға тырыстым. Каталогтар мен топтардың орнына - тегтер, көптеген сүзгілердің орнына - өзіндік синтаксиспен іздеу. Мен оны қолданбаларды жасау үшін үнемі қолданамын.",
          2: "«Don't Do» бірнеше демалыс күндері жасалғанына қарамастан, бұл қолданба менің сүйікті қолданбаларымның бірі.",
        }
      },
      capybara: {
        short: "Платформааралық кодты қарау қолданбасы",
        long: {
          1: "Capybara — кодты қарап шығу процесін жеңілдету үшін жасалған кросс-платформалық кодты қарау қолданбасы.",
          2: "Қолданбада Github және Gitlab интеграциясы бар, сонымен қатар жергілікті репозиториймен офлайн режимінде жұмыс істей алады."
        }
      },
      termprofile: {
        short: "Терминал түріндегі портфолио",
        long: {
          1: "Терминдік портфолио – браузерде терминалдық интерфейсті жүзеге асыратын шағын жоба. Бұл жобада мен ASCII кескіндерімен және қызықты мүмкіндіктерімен айналыстым.",
        }
      },
      gosha: {
        short: "Консоль тапсырмалар менеджері",
        long: {
          1: "Gosha - бұл күнделікті күнделікті жоспарымды жылдам өңдеуге, сондай-ақ Go негіздерін үйренуге арналған қарапайым Go консоль қолданбасы.",
        }
      },
    },
    hardware: {
      theme: "Тақырып",
      browser: "Браузер",
      cliEditor: "Консольдық редактор",
      editor: "Редактор",
      headphone: "Құлаққаптар",
      keyboard: "Пернетақта",
      pc: "Негізгі компьютер",
      search: "Іздеу",
      terminal: "Терминал",
      font: "Қаріп",
    },
    stack: {
      purpose: {
        first: "Бірінші программалау тілі",
        main: "Негізгі программалау тілі",
        backend: "Мен сервер үшін қолданатын бағдарламалау тілі",
        fun: "Мен ермек үшін үйреніп жүрген бағдарламалау тілі 🌝"
      }
    },
    page: {
      post: {
        neighbours: {
          next: "Келесі мақала",
          previous: "Алдыңғы мақала",
        }
      },
      license: {
        tabTitle: "Лицензия",
        title: "Лицензиялар",
        source: "Дереккөз",
        license: "Лицензия",
        phrase: {
          test: "арналған сынақтар",
          host: "Хостында",
          store: "Сақталады",
          made: "бірге жасалған",
          work: "Жұмыс істейді рахмет",
          thanks: "Ерекше рахмет"
        }
      },
      projects: {
        tabTitle: "Жобалар",
        stack: "Стек",
        links: "Сілтемелер",
        chooseTitle: "Жобалардың бірін таңдаңыз",
        chooseDescription: "Жалғастыру үшін тізімнен жобалардың бірін таңдау керек."
      },
      home: {
        tabTitle: "Үй",
        title: "Әзірлеуші ​​журналы",
        description: "Даму журналы әзірлеушінің көзімен",
        hero: "«Әзірлеуші ​​журналы» - әзірлеуші ​​басқа әзірлеушілер үшін жазған блог. Мұнда сіз заманауи веб-технологиялар мен әзірлеу әдістері туралы мақалалар мен жазбаларды таба аласыз. Мен өз тәжірибеммен, білімдермен бөлісемін және даму әлеміне негіздерден бастап озық әдістерге дейін сүңгу үшін қол жетімді нұсқаулықтарды ұсынамын. Блогтың ерекшелігі - кең аудиторияға арналған күрделі тақырыптардың анық көрсетілімі. Соңғы трендтерден хабардар болыңыз және әзірлеушілер журналымен дағдыларыңызды жетілдіріңіз.",
        telegramButton: "Телеграмға өтіңіз",
        subtitle: "Оқуға барыңыз"
      },
      posts: {
        tabTitle: "Мақалалар",
        searchPlaceholder: "Тақырып, сипаттама немесе тег бойынша жазбаны табыңыз...",
        showNotes: "Жазбаларды көрсету",
        stubTitle: "еш нәрсе табылмады",
        stubInfo: "Сұрауыңыз бойынша нәтижелер табылмады.",
        stubTryAgain: "Іздеу жолағында қателерді тексеріңіз немесе басқа сұрау жазыңыз."
      },
      author: {
        tabTitle: "Автор",
        hello: "Сәлеметсіз бе!",
        me: "Мен қосымшаларды жасау және жетілдіруде төрт жылдан астам табысты тәжірибем бар тәжірибелі фронтальды әзірлеушімін. Менің дағдыларым мен білімім заманауи веб-технологиялардың кең ауқымын қамтиды, бұл маған жоғары сапалы және интуитивті қосымшаларды әзірлеуге мүмкіндік береді.",
        pursuit: "Мен заманауи және инновациялық веб-қосымшаларды дамытуға үлес қосу арқылы алдыңғы қатарлы әзірлеуші ​​ретінде өсуді жалғастыруға тырысамын. Мен белсенді блог жүргіземін, сонымен қатар VC, Habr және Telegram-да жазамын.",
        role: "Менің рөліме веб-қосымшаларды әзірлеу және қолдау, олардың жауап беретін және кросс-браузерлермен үйлесімді болуын қамтамасыз ету және серверлік қызметтермен интеграциялау кірді. Мен сәулет шешімдеріне белсенді түрде қатыстым және әрқашан даму процестерін жақсартуға тырысамын."
      }
    }
  };

});
