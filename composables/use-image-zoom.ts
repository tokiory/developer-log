const zoomItem = () => useState<string | null>("image-zoom-item", () => null);

/**
 * Composable for image zoom control
 */
export default function () {
  const activeImage = zoomItem();

  const show = (url: string) => {
    activeImage.value = url;
  };

  const hide = () => {
    activeImage.value = null;
  };

  return {
    show,
    hide,
    zoomItem,
  };
}
