---
title: Хуки для обновления данных после переподключения
tags:
  - vue
date: 2023-06-20
---

Сегодня была задача по обновлению данных после переподключения пользователя.

Я решил эту задачу следующим способом:

- Для обычного подключения использовать `window.ononline` и `window.onoffline`;
- Для подключения [Socket.io](https://socket.io) использовать `socket.on('connect')` и `socket.on('disconnect')`;

# Решение для обычного подключения

Я хотел сделать методы максимально похожие на стандартные хуки жизненного цикла во Vue. Сам composable выглядит следующим образом:

```tsx
import {onUnmounted} from 'vue';

export const useOnlineHook = () => {
  const callbacks = {
    online: [],
    offline: [],
  };

  /**
   * Хук, который выполнит коллбэк, когда приложение будет онлайн
   * @param {() => void} callback
   */
  const onOnline = callback => {
		callbacks.online.push(callback);
		window.ononline(callback);
	};

  /**
   * Хук, который выполнит коллбэк, когда приложение будет оффлайн
   * @param {() => void} callback
   */
  const onOffline = callback => {
		callbacks.offline.push(callback);
		window.onoffline(callback);
	};

  // Чистим ивенты
  onUnmounted(() => {
    callbacks.online.forEach(callback => {
	    window.removeEventListener('online', callback)
    });

    callbacks.offline.forEach(callback => {
      window.removeEventListener('offline', callback)
    });
  });

  return {
    onOnline,
    onOffline,
  };
};
```

# Решение для Socket.io

Решение [Socket.io](http://Socket.io) выглядит похожим образом, однако тут мы пользуемся `on('connect/disconnect')`, как уже было упомянуто выше:

```tsx
import socket from '@/service/socket.js'; // Инициализированный Socket.io клиент
import {onUnmounted} from 'vue';

export const useOnlineHook = () => {
  const callbacks = {
    online: [],
    offline: [],
  };

  /**
   * Хук, который выполнит коллбэк, когда приложение будет онлайн
   * @param {() => void} callback
   */
  const onOnline = callback => {
    callbacks.online.push(callback);
    socket.on('connect', callback);
  };

  /**
   * Хук, который выполнит коллбэк, когда приложение будет оффлайн
   * @param {() => void} callback
   */
  const onOffline = callback => {
    callbacks.offline.push(callback);
    socket.on('disconnect', callback);
  };

  // Чистим коллбэки в socket.io
  onUnmounted(() => {
    callbacks.online.forEach(callback => {
      socket.off('connect', callback);
    });

    callbacks.offline.forEach(callback => {
      socket.off('disconnect', callback);
    });
  });

  return {
    onOnline,
    onOffline,
  };
};
```

# Использование хуков

Использовать такие хуки достаточно просто (используются они как тот же `onMounted`).

Для начала я создаю метод для подтягивания всех необходимых данных. Обычно я называю его `fetchData`:

```tsx
import {onMounted} from 'vue';
import {useOnline} from './hooks/useOnline';

const {onOnline} = useOnline();

const fetchData = () => {/* ... */};
onMounted(fetchData);
onOnline(fetchData);
```

Так как мы производили чистку ивентов в самом composable, чистка в самом компоненте с помощью `onUnmounted` — нам не требуется.
