const EVENT = "local-storage-reactive";

type LocalStorageValue<T> = T | null;

// CRUD operations
const readFromStore = <T>(key: string): T | null => {
  const localStorageValue = localStorage.getItem(key);
  try {
    return localStorageValue === null ? localStorageValue : JSON.parse(localStorageValue);
  } catch {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
};

const writeToStore = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const useLocalStorageState = <T>(key: string) => {
  const EVENT_KEY = `${EVENT}-${key}`;
  const localStorageState = ref<LocalStorageValue<T>>();

  // Event listener methods
  const onChange = () => {
    const value = readFromStore(key);
    if (value !== localStorageState.value) {
      localStorageState.value = readFromStore(key);
    }
  };

  const dispatchChange = () => {
    const event = new CustomEvent(EVENT_KEY);
    window.dispatchEvent(event);
  };

  // Watchers and hooks
  watch(localStorageState, (value) => {
    writeToStore(key, value);

    if (localStorage.getItem(key) !== localStorageState.value) {
      dispatchChange();
    }
  });

  onMounted(() => {
    localStorageState.value = readFromStore(key);
    window.addEventListener(
      EVENT_KEY as keyof DocumentEventMap,
      onChange as (event: Event) => void
    );
  });

  onUnmounted(() => {
    document.removeEventListener(
      EVENT as keyof DocumentEventMap,
      onChange as (event: Event) => void
    );
  });

  return localStorageState;
};

export default useLocalStorageState;
