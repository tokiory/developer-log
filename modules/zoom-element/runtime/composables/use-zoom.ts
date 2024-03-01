interface ImageZoomInfo {
  src: string;
  zoomModifier: number;
}

const imageZoomInfo = useState<ImageZoomInfo>("image-zoom-info", () => {
  return {
    src: "",
    zoomModifier: 1,
  };
});

const show = (source: string) => {
  imageZoomInfo.value.src = source;
};

const hide = () => {
  imageZoomInfo.value.src = "";
};

const changeZoomModifier = (modifier: number) => {
  imageZoomInfo.value.zoomModifier = modifier;
};

const resetZoomModifier = () => {
  imageZoomInfo.value.zoomModifier = 1;
};

export const useZoom = () => {
  return {
    show,
    hide,
    changeZoomModifier,
    resetZoomModifier,
  };
};
