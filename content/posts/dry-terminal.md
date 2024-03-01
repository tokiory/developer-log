---
title: Работа в "сухом" терминале
tags:
  - linux
  - devops
keywords:
  - xterm
  - fedora
date: 2021-05-15
---

**Минимализм**.
Это слово побудило меня сделать своё рабочее пространство чище, проще,
а что самое главное красивее, ведь непросто концентрироваться на сложных вещах, когда все вещи вокруг тебя сложные.

# XTerm
XTerm изначально выглядит убого.
Белый фон, чёрный текст, скролл слева и ещё куча недоразумений,
однако я все равно считаю что это один из самых лучших терминалов, вот почему:

- **Он независимый**. Он легко может быть использован в любой DE, так как не тянет за собой зависимости.
- **Он лёгкий**. Весит он всего ничего и как уже было отмечено не тянет зависимости.
- **Он простой**. Конфигурация данного терминала является файлом .Xresources, который есть опять же во всех системах
- **Он минималистичный**. Именно так, он не использует никаких наворотов.

Конфигурация терминала будет производиться с помощью изменения файла
`.Xresources` в домашней директории. Если его нет, то его нужно создать.

## Шрифты
Первее всего меня интересовали шрифты. По умолчанию они убогие и взяты из пакета `xorg-x11-fonts`.
Дабы настроить шрифты создаём файл .Xresources в домашней директории и редактируем его:

```conf
xterm*faceName: Ubuntu Mono, Source Code Pro
xterm*faceSize: 12
```

В коде вверху мы поставили первичным шрифтом Ubuntu Mono, вторичным шрифтом - Source Code Pro. Размер шрифтов - 12.


## Переменные окружения

Далее сделаем так, чтобы терминал мог читать все необходимые переменные окружения:

```conf
xterm*loginshell: true
```

## Скроллбар и скролл
Далее разбираемся со скроллбаром. Делаем его справа и скрываем (хотя можно оставить, если нужно):

```conf
xterm*rightScrollBar: true
xterm*ScrollBar: false
```

Делаем так, чтобы скролл работал не так как в TTY:

```conf
xterm*scrollTtyOutput: false
```

## Внутренний отступ
Я обожаю когда содержимое терминала не прилягает к экрану, поэтому всегда делаю внутренний отступ, когда это возможно:

```conf
xterm*internalBorder: 12
```

## Тема
Тут без лишних слов просто оставлю тему, которую нашёл на просторах интернета [base16 - tomorrow](https://terminal.sexy/)

```conf
! special
xterm*foreground:   #c5c8c6
xterm*background:   #1d1f21
xterm*cursorColor:  #c5c8c6

! black
xterm*color0:       #1d1f21
xterm*color8:       #969896

!red
xterm*color1:       #cc6666
xterm*color9:       #cc6666

!green
xterm*color2:       #b5bd68
xterm*color10:      #b5bd68

!yellow
xterm*color3:       #f0c674
xterm*color11:      #f0c674

!blue
xterm*color4:       #81a2be
xterm*color12:      #81a2be

!magenta
xterm*color5:       #b294bb
xterm*color13:      #b294bb

!cyan
xterm*color6:       #8abeb7
xterm*color14:      #8abeb7

!white
xterm*color7:       #c5c8c6
xterm*color15:      #ffffff
```

## Разнообразные фиксы и доработки
По умолчанию в терминале не работает Backspace (что достаточно забавно, так как XTerm настолько простой, что в нём нет даже самого элементарного).

Исправляем это следующим изменением в конфигурационном файле:

```conf
*VT100.backarrowKey: false
*VT100.Translations: #override \
<Key>Delete:    string("\033[3~")\n\
<Key>Home:      string("\033[1~")\n\
<Key>End:       string("\033[4~")
*ttyModes: erase ^?
```

Также мне нравится когда терминал выделяет важное жирным текстом, но если вам не нравится, то поставьте значение в true:

```conf
xterm*boldMode: false
```

Мне нужно, чтобы при нажатии Alt терминал посылал соответствующий сигнал в терминальные утилиты, поэтому я прописал следующее в конфигурационном файле:

```conf
xterm*metaSendsEscape: true
```

::ContentDetails
---
title: Полная конфигурация
---

```conf
xterm*faceName: Ubuntu Mono, Source Code Pro
xterm*faceSize: 12
! Every shell is a login shell by default (for inclusion
! of all necessary environment variables)
xterm*loginshell: true

! right hand side scrollbar
xterm*rightScrollBar: true
xterm*ScrollBar: false

! stop output to terminal from jumping down to bottom of scroll again
xterm*scrollTtyOutput: false

! border for the terminal
xterm*internalBorder: 12

! without bold text
xterm*boldMode: false

! alt sends escape
xterm*metaSendsEscape: true

! fix backspace
*VT100.backarrowKey: false
*VT100.Translations: #override \
          <Key>Delete:    string("\033[3~")\n\
          <Key>Home:      string("\033[1~")\n\
          <Key>End:       string("\033[4~")
*ttyModes: erase ^?

! special
xterm*foreground:   #c5c8c6
xterm*background:   #1d1f21
xterm*cursorColor:  #c5c8c6

! black
xterm*color0:       #1d1f21
xterm*color8:       #969896

!red
xterm*color1:       #cc6666
xterm*color9:       #cc6666

!green
xterm*color2:       #b5bd68
xterm*color10:      #b5bd68

!yellow
xterm*color3:       #f0c674
xterm*color11:      #f0c674

!blue
xterm*color4:       #81a2be
xterm*color12:      #81a2be

!magenta
xterm*color5:       #b294bb
xterm*color13:      #b294bb

!cyan
xterm*color6:       #8abeb7
xterm*color14:      #8abeb7

!white
xterm*color7:       #c5c8c6
xterm*color15:      #ffffff
```
::

# Шелл (fish)
Стандартный bash хорош, однако иногда я могу забыть что значит определенный ключ у утилиты, или мне нужно быстро ввести какую-либо команду, которую я уже вводил и в этом мне помогает fish.

```bash
curl -L https://get.oh-my.fish | fish
```

После этого устанавливаем тему. Я установлю тему под названием lavender:

```bash
omf install lavender
```

После установки наш терминал выглядит вот так:

![](/posts/dry-terminal/fish.png)

# tmux
tmux - терминальный мультиплексор. Терминальные мультиплексоры используются для того, чтобы "разделить"
окно терминала на несколько подокон или вовсе на несколько рабочих пространств.

В XTerm нет нативной поддержки табов. Вы не можете нажать `Ctrl + Shift + t`
для того, чтобы открылся новый таб с отдельным терминалом, именно поэтому мы используем tmux.

> Конфигурация tmux находится в `~/.tmux.conf`

## Горячие клавиши

Для того чтобы упростить себе жизнь мы поменяем клавишу сигнала tmux (специальное сочетание клавиш, которое будет использоваться для взаимодействия с tmux) с Ctrl + b на Ctrl + a.

```tmux
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix
```

### Панели. Разделение окон
Далее мы поменяем сочетания клавиш для создания новых панелей. Панели - разделение одного окна на меньшие части.

По умолчанию для того чтобы разделить окно используется сочетание клавиш:

- `Ctrl + b + "` - Разделение горизонтально
- `Ctrl + b + %` - Разделение вертикально.

Однако мы уже изменили клавишу сигнала tmux с `Ctrl + b` на `Ctrl + a`, следовательно теперь комбинации которые мы будем использовать будут следующие:

- `Ctrl + a + "` - Разделение горизонтально
- `Ctrl + a + %` - Разделение вертикально.

Назовём комбинацию клавиш `Ctrl + a` - **sig**, для краткости.
Поменяем разделение экрана на следующие комбинации клавиш:

- `sig + |` - Разделение вертилкально.
- `sig + -` - Разделение горизонтально.

```tmux
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %
```

### Перемещение между панелями
Теперь нужно сделать так, чтобы мы могли перемещаться с помощью клавиш h,j,k,l:

- `sig + (h,j,k,l)` - перемещение влево (вниз, вверх, вправо).

```tmux
bind l select-pane -R
bind k select-pane -U
bind j select-pane -D
bind h select-pane -L
```

### Быстрая перезагрузка
Для того чтобы быстро перезагрузить конфигурацию добавим следующий код:

```tmux
bind r source-file ~/.tmux.conf
```

### Поддержка мыши
Для того чтобы включить поддержку мыши, нужно написать в конфигурационный файл:

```tmux
set -g mouse on
```

### Тема
Отключаем звуки уведомлений:

```tmux
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none
```

На комбинацию клавиш `sig + t` можно отобразить часы. Внизу мы изменяем их внешний вид (цвет):

```tmux
setw -g clock-mode-colour colour5
setw -g mode-style 'fg=colour1 bg=colour18 bold'
```

Изменяем внешний вид панелей. Активная панель теперь зелёная, а неактивная - красная:

```tmux
set -g pane-border-style 'fg=colour9 bg=colour0'
set -g pane-active-border-style 'bg=colour0 fg=colour2'
```

Апгрейдим статусбар, чтобы он показывал время, дату, а также подчёркивал рабочее пространство, на котором мы сейчас находимся:

```tmux
set -g window-status-current-style "underscore"
set -g status-position bottom
set -g status-justify left
set -g status-style 'bg=colour2 fg=colour0'
set -g status-left ' '
set -g status-right '#[fg=colour0,bg=colour2] Date: %d/%m, %H:%M:%S '
set -g status-right-length 100
set -g status-left-length 100
```

::ContentDetails
---
title: Полная конфигурация
---
```tmux
# Shortcuts
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

## split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

## changing panes
bind h select-pane -L
bind l select-pane -R
bind k select-pane -U
bind j select-pane -D

## reload config file (change file location to your
## the tmux.conf you want to use)
bind r source-file ~/.tmux.conf


# Misc
## If running inside tmux ($TMUX is set),
## then change the status line to red
%if #{TMUX}
set -g status-bg red
%endif

## enable mouse control (clickable windows, panes, resizable panes)
set -g mouse on


# Theme
## silent sound
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none

## time
setw -g clock-mode-colour colour5
setw -g mode-style 'fg=colour1 bg=colour18 bold'

## panes
set -g pane-border-style 'fg=colour9 bg=colour0'
set -g pane-active-border-style 'bg=colour0 fg=colour2'

## statusbar
set -g window-status-current-style "underscore"
set -g status-position bottom
set -g status-justify left
set -g status-style 'bg=colour2 fg=colour0'
set -g status-left ' '
set -g status-right '#[fg=colour0,bg=colour2] Date: %d/%m, %H:%M:%S '
set -g status-right-length 100
set -g status-left-length 100

## messages
set -g message-style 'fg=colour232 bg=colour16 bold'
```
::

В результате имеем вполне красивый и рабочий терминал, в котором есть табы,
воркспейсы, внутренний буфер (tmux), автодополнение (fish), простота и скорость (xterm).
