const zoomDiagram = () => useState<string | null>("diagram-zoom-item", () => null);

/**
 * Composable for diagram zoom control
 */
export default function () {
  const activeDiagram = zoomDiagram();

  const show = (svg: string) => {
    activeDiagram.value = svg;
  };

  const hide = () => {
    activeDiagram.value = null;
  };

  return {
    show,
    hide,
    zoomDiagram,
  };
}
