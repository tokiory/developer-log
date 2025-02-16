import { onMounted } from "vue";

const stopScrollBySpaceKey = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault();
  }
};

const enableScrollBySpaceKey = () => document.removeEventListener("keydown", stopScrollBySpaceKey);

const useOpenImageBySpaceKey = () => {
  // TODO: костыль - даем tabindex изображениям (найти другое решение)
  onMounted(() => {
    setTimeout(() => {
      for (const imgElement of document.querySelectorAll("img")) {
        imgElement.tabIndex = 0;
      }
    }, 2000);
  });

  // элемент изображения в фокусе по которому ожидается клик пробелом
  let currentFocusedImg: null | HTMLImageElement = null;

  const handleSpaceKeyDown = (event: KeyboardEvent) => {
    if (event?.code === "Space" && !!currentFocusedImg) {
      currentFocusedImg.click();
      console.log("клик пробелом по изображению");
    }
  };

  const removeSpaceKeyDownListener = () => currentFocusedImg?.removeEventListener("keyup", handleSpaceKeyDown);

  const handleTabKeyDown = (event: KeyboardEvent) => {
    removeSpaceKeyDownListener();
    enableScrollBySpaceKey();

    if (
      event.code === "Tab" &&
      !!document.activeElement &&
      document.activeElement.tagName === "IMG" &&
      [ ...document.activeElement.classList ].includes("post-content-image")
    ) {
      document.addEventListener("keydown", stopScrollBySpaceKey);
      currentFocusedImg = document.activeElement as HTMLImageElement;
      currentFocusedImg?.addEventListener("keyup", handleSpaceKeyDown);
    }
  };

  window.addEventListener("keyup", handleTabKeyDown);
};

export default useOpenImageBySpaceKey;
