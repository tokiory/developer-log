import type { ComputedRef, Ref } from "vue";

interface Coordinates {
  x: number;
  y: number;
}

const getImageViewportPercentageModifier = (elementInformation: ComputedRef<DOMRect>): Coordinates => {
  const imageVisibleViewport = {
    width: elementInformation.value.width > window.innerWidth ? window.innerWidth : elementInformation.value.width,

    height: elementInformation.value.height > window.innerHeight ? window.innerHeight : elementInformation.value.height,
  };

  return {
    x: imageVisibleViewport.width / 100,
    y: imageVisibleViewport.height / 100,
  };
};

const getMouseCenterRelativePercentages = (mousePositionPercentages: Coordinates): Coordinates => {
  const result: Coordinates = {
    x: (mousePositionPercentages.x - 50) * -1,
    y: (mousePositionPercentages.y - 50) * -1,
  };

  const ADDITIONAL_FORCE_MODIFIER: Coordinates = {
    x: 1.2,
    y: 1.1,
  };

  let coordinateName: keyof Coordinates;
  for (coordinateName in result) {
    if (Math.abs(result[coordinateName]) > 75) {
      result[coordinateName] += result[coordinateName] >= 0 ? -25 : 25;
    }

    result[coordinateName] *= ADDITIONAL_FORCE_MODIFIER[coordinateName];
  }

  return result;
};

export default function (elementReference: Ref<HTMLElement | undefined>) {
  const isActive = ref(false);
  const toggle = (state: boolean) => (isActive.value = state);
  const reload = () => {
    isActive.value = false;
    isActive.value = true;
  };
  const elementInformation = computed(() => elementReference.value?.getBoundingClientRect());

  const onMouseMove = (event: MouseEvent) => {
    if (!elementInformation.value) {
      return;
    }

    if (!elementReference.value) {
      return;
    }

    const imagePercentageModifier = getImageViewportPercentageModifier(elementInformation as ComputedRef<DOMRect>);

    const absoluteMousePositionPercentage: Coordinates = {
      x: Math.round(event.x / imagePercentageModifier.x),
      y: Math.round(event.y / imagePercentageModifier.y),
    };

    const centerMousePositionPercentage = getMouseCenterRelativePercentages(absoluteMousePositionPercentage);

    elementReference.value.style.translate = `${centerMousePositionPercentage.x}% ${centerMousePositionPercentage.y}%`;
  };

  const resetPosition = () => {
    if (!elementReference.value) {
      return;
    }

    elementReference.value.style.translate = "";
  };

  watch(isActive, (state) => {
    if (!elementReference.value) {
      return;
    }

    if (state) {
      elementReference.value.addEventListener("mousemove", onMouseMove);
      return;
    }

    elementReference.value.removeEventListener("mousemove", onMouseMove);
    elementReference.value.style.translate = "";
  });
  return {
    toggle,
    resetPosition,
    reload,
  };
}
