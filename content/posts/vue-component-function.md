---
title: Рендеринг модальных окон с помощью функций на Vue
tags:
  - typescript
  - vue
  - web
description: >
  Недавно столкнулся с интересной задачей: нужно создать модальные окна, которые бы рендерились с помощью вызовов функций. После ресерча различных библиотек и статей собрал все ведомые мне способы в одной статье. Под катом подробнее.
date: 2023-05-08
origin:
  type: Habr
  url: https://habr.com/ru/articles/733852/
---

Мы специально не будем рассматривать стандартное размещение попапов с помощью `teleport` и `v-show` с реактивным состоянием внутри родительского компонента. Данная статья рассматривает случаи, когда попапы не должны засорять другие компоненты данными для своих пропсов. Также мы не будем рассматривать паттерн UIState, где для каждого попапа в сторе (Vuex/Pinia) прописывается состояние открыт ли попап.

# Эмиттинг ивентов
Данный способ основывается на паттерне pub/sub. К слову это самый примитивный способ и _некрасивый_ способ, что можно придумать.

Мы можем реализовать паттерн pub/sub сами, это сделать не так уж и сложно, внизу предоставлена примитивная реализация pub/sub, которая будет только вызывать ивенты и подписываться на них.

```ts [emitter.ts]
// Список заранее прописанных ивентов
export enum EmitterEvents {
  SHOW_POPUP
}

// Интерфейс для эмиттера (объекта, который будет содержать все функции
// которые нужно вызвать при тригере)
type Emitter = Record<EmitterEvents, Array<() => void>>;

const emitter: Emitter = {
  [EmitterEvents.SHOW_POPUP]: []
};

// Используем composable для того чтобы вернуть нужные нам функции
export const useEmitter = () => {
  const trigger = (event: EmitterEvents) => emitter[event].forEach(cb => cb());

  const bind = (event: EmitterEvents, callback: () => void) => {
    if (emitter[event].includes(callback)) {
      console.warn('This callback is already in emitter! 👾');
      return;
    }

    emitter[event].push(callback);
  }

  const unbind = (event: EmitterEvents, callback: () => void) => {
    const callbackIndex = emitter[event].findIndex(item => item === callback);

    if (callbackIndex === -1) {

      // Создаем ошибку для отслеживания стека вызовов
      console.error(new Error('There\'s no event to delete! 🤖'));
      return;
    }

    emitter[event].splice(callbackIndex, 1);
  }

  return {trigger, bind, unbind};
}
```

Естественно можно немного переписать данный эмиттер и добавить возможность передавать в коллбэки аргументы, но нам пока что это ни к чему, нам нужно просто отрисовать модальное окно.

Теперь все что нам нужно сделать - разместить наш попап где-либо (например в `App.vue`) и триггерить его с помощью `useEmitter`.

Реализация попапа будет примерно следующая:

```vue [Popup.vue]
<template>
  <div class="popup">
  <!-- ... -->
  </div>
</template>

<script setup lang="ts">
  import { useEmitter, EmitterEvents } from 'composables/useEmitter';
  const isVisible = ref(false);

  const { bind } = useEmitter();
  bind(EmitterEvents.SHOW_POPUP, () => {
    isVisible.value = true;
  })
</script>
```

Теперь внутри компонента, с помощью которого нам нужно вызывать данный попап - нужно прописать триггер для ивента:

```vue [Parent.vue]
<template>
  <!-- ... -->
  <button @click="showPopup">Показать попап</button>
  <!-- ... -->
</template>

<script setup lang="ts">
  import { useEmitter, EmitterEvents } from 'composables/useEmitter';
  const { trigger } = useEmitter();

  const showPopup = () => {
    trigger(EmitterEvents.SHOW_POPUP);
  };
</script>
```

Теперь рассмотрим плюсы и минусы такого подхода:

**Плюсы**:
- Достаточно легкая реализация;

**Минусы**:
- Сложно отлаживать в случае возникновения бага;
- Будет создано большое количество ивентов в случае если попапов много;
- Легко создать коллбэкхэлл;
- Если паттерн pub/sub будет использоваться не только для отображения попапов, то легко написать паста-код;

# Использование provide/inject
В данном случае provide/inject будет сильно похож на паттерн pub/sub. Смысл заключается в том, что мы создадим реактивное состояние (открыт ли попап) и будем прокидывать его туда, где он нам нужен.

> Данный способ не сильно отличается и от паттерна UIState, где мы в сторе указываем булевы значения какие части графического интерфейса сейчас активны. Отличие в том, что мы используем встроенные возможности Vue без использования сторонних библиотек.

Для того чтобы использовать данный метод нам нужно создать словарь из символов и реактивных состояний в отдельном файле:

```ts [popupState.ts]
import { reactive } from 'vue';
import type { InjectionKey } from 'vue';

export {
  ourPopup: {
    key: Symbol() as InjectionKey<boolean>,
    state: reactive({
      isVisible: false,
      options: {}, // Здесь можем добавить и типизировать пропсы
    }),
  }
}
```

Теперь нам нужно создать реактивную переменную в корне приложения (`App.vue`), которую мы сможем изменять когда нам это понадобится:

```vue [App.vue]
<script setup lang="ts">
  import { ourPopup } from './popupState';
  provide(ourPopup.key, ourPopup.state);
</script>
```

Внутри попапа нам нужно будет прицепиться к значению:

```vue [Popup.vue]
<script setup lang="ts">
  import { ourPopup } from './popupState';
  const ourPopupState = inject(ourPopup.key);
</script>
```

Поменять данное значение внутри другого компонента мы можем банально используя реактивное значение:

```vue [TriggerParent.vue]
<script setup lang="ts">
  import {ourPopup} from './popupState';
  const {isVisible: isOurPopupVisible = inject(ourPopup.key);

  const togglePopup(state: boolean) {
    isOutPopupVisible.value = state;
  }
</script>

```

Вверху приведены примеры для понимания работы данного принципа. Методы togglePopup можно перенести отдельно, чтобы они не лежали внутри компонента, думаю это всем понятно, но на всякий случай решил уточнить 👀

**Плюсы**:

- Мы обошлись без pub/sub;
- Реализация оказалась еще проще;

**Минусы**:
- Баг все еще будет сложно словить, так как любой компонент может использовать inject;
- Мы оставляем в глобальной области видимости много данных;
- Если будут другие provide/inject, то работа с попапами и их состояниями усложнится;

# Отдельное приложение

**Важно уточнить** что создавать отдельное приложение для рендеринга модального окна кажется излишним, хотя бы потому что потребление памяти сильно вырастет, однако этот вариант тоже нужно показать.

Способ достаточно простой: мы создадим composable, в который сможем передать контекст приложения и пропсы, которые нужно отрендерить, а затем примонтируем его.

```ts [composable/ourPopup.ts]
import { AppContext, createApp } from 'vue'
import OurPopupComponent, {ComponentProps} from './Component';

interface UseOurPopupArgs {
  mountNode?: Element,
  props: ComponentProps,
  appContext?: AppContext,
}

export default function renderComponent({ mountNode, props, appContext }: UseOurPopupArgs) {
  let app = createApp(OurPopupComponent, props)

  if (appContext) {
    Object.assign(app._context, appContext) // Дополняем исходный контекст приложения
  }

  const show = () => {
    // Маунтим к специфической ноде или ноде по дефолту (#popup)
    app
      .mount(mountNode ?? document.getElementById('#popup') as Element);
  };

  const hide = () => {
    app.unmount()
  }

  return {
    show,
    hide,
  }
}
```

Теперь все что нужно сделать в компоненте из которого мы будем вызывать наш попап - использовать созданный нами `composable`:

```vue [ParentComponent.vue]
<script setup lang="ts">
  import { useOurPopup } from 'composables/useOurPopup';

  const popup = useOurPopup();
  popup.show();
</script>
```

**Плюсы**:
- Создание попапов очень легко скейлится. Нам нужно изменять только один файл;
- Состояния компонента находятся внутри composable, а значит состояния не находятся в глобальной области видимости;
- Код легко отлаживать;

**Минусы**:
- Для каждого нового попапа будет создаваться отдельное приложение, из-за чего высока вероятность утечки памяти;

# Внешний рендеринг с помощью createVNode

Данный способ я считаю самым лучшим для рендеринга модальных окон с помощью функций. Суть состоит в том, что мы будем превращать компонент в виртуальную ноду (VNode), а затем и вовсе рендерить ее напрямую в DOM-дерево, без создания нового приложения.

Для начала нам потребуется создать composable, в котором мы будем создавать нашу виртуальную ноду и рендерить ее:


```ts [composable/ourPopup.ts]
import { AppContext, createApp } from 'vue'
import OurPopupComponent, {ComponentProps} from './Component';

interface UseOurPopupArgs {
  mountNode?: Element,
  props: ComponentProps,
  appContext?: AppContext,
}

import { createVNode, render } from 'vue'

export default function useOurPopup({mountNode, props, appContext}: UseOurPopupArgs) {
  let vnode = createVNode(OurPopupComponent, props)
  vnode.appContext = appContext ?? null;

  const show = () => {
    const defaultNode = document.getElementById('#popup') as Element;
    render(vnode, mountNode ?? defaultNode);
  };

  const hide = () => {
    const defaultNode = document.getElementById('#popup') as Element;
    render(null, mountNode ?? defaultNode);
  };

  return {
    show,
    hide
  };
}
```

Может показаться что практически ничего не поменялось, однако в данном фрагменте кода мы вместо того чтобы создавать новое приложение напрямую рендерим наш компонент в DOM-дерево. Потребление памяти будет гораздо ниже.

Использование такого composable не будет отличаться от того, что мы видели при создании приложения:

```vue [ParentComponent.vue]
<script setup lang="ts">
  import { useOurPopup } from 'composables/useOurPopup';

  const popup = useOurPopup();
  popup.show();
</script>
```

**Плюсы**:
- Мы легко можем расширять наш набор попапов;
- Потребление памяти гораздо ниже по сравнению с предыдущим вариантом;
- Состояния компонента находятся в скоупе composable/useOurPopup.ts;
- Баги легко отследить (отладить);

