---
title: Установка и настройка husky + commitlint
tags:
  - nuxt
  - note
date: 2023-06-05
---

[Husky](https://www.npmjs.com/package/husky) нужен для того чтобы цепляться к хукам в Git,
[commitlint](https://www.npmjs.com/package/commitlint) же проверяет сообщение всех коммитов
на предмет соответствия [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Установка Husky + Commitlint достаточно простая:

```bash
# Скачивание необходимых пакетов
pnpm i -D husky @commitlint/cli @commitlint/config-conventional

# Добавляем хук в package.json после, для того
# чтобы npm выполнял husky install после каждой установки
npm set-script prepare "husky install"

# Инициализируем husky
pnpm husky install
```

После того как мы инициализировали husky - нам достаточно просто поместить
в конфигурационный файл для commitlint следующее:

```js [commitlint.config.cjs]
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```

Мы также можем сделать это с помощью команды в терминале:

```bash
# Creating configuration for commitlint
cat > commitlint.config.cjs << EOF
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
EOF
```

Затем нам нужно просто добавить команду для проверки сообщения коммита в хук перед коммитом. Сделать это можно с помощью
этой команды:

```bash
pnpm husky add .husky/commit-msg 'npx --no-install commitlint --edit'
```

::ContentBookmark{:url="https://gist.github.com/tokiory/5b99a68523065d86a218797d349fbbbd"}
::

::ContentDetails
---
title: Все в одной команде для терминала
---
```bash
#!/bin/bash
# Installs commitlint in current repo
# Uses pnpm
# Author: Daniil Shilo <crackidocky@gmail.com>

# Downloading required packages
pnpm i -D husky @commitlint/cli @commitlint/config-conventional

# Adding hook to npm after download
npm set-script prepare "husky install"

# Installing husky
pnpm husky install

# Creating configuration for commitlint
cat > commitlint.config.cjs << EOF
module.exports = {
extends: ["@commitlint/config-conventional"]
};
EOF

# Adding husky task before commiting a message
pnpm husky add .husky/commit-msg 'npx --no-install commitlint --edit'
```

Или в виде oneliner:
```bash
pnpm i -D husky @commitlint/cli @commitlint/config-conventional;npm set-script prepare "husky install";pnpm husky install;
pnpm husky add .husky/commit-msg 'npx --no-install commitlint --edit'; \
cat > commitlint.config.cjs << EOF
module.exports = {
extends: ["@commitlint/config-conventional"]
};
EOF
```
::
