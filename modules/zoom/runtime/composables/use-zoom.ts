type ZoomType = "image" | "diagram";

interface ZoomItem {
  type: ZoomType;
  value: string;
}

const zoomItem = () => useState<ZoomItem | null>("image-zoom-item", () => null);

export const useZoom = () => {
  const zi = zoomItem();

  const show = (type: ZoomType, value: string) => {
    zi.value = { type, value };
  };

  const hide = () => {
    zi.value = null;
  };

  return {
    show,
    hide,
    content: zi,
  };
};
