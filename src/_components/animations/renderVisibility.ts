// Signale si un élément doit continuer à être rendu en boucle : visible
// dans le viewport ET onglet actif. Utilisé par les animations WebGL
// (ShaderWaves, ChromaKeyVideo) pour couper leur requestAnimationFrame
// hors écran ou onglet en arrière-plan plutôt que de tourner indéfiniment.
export function observeRenderVisibility(
  element: Element,
  onChange: (visible: boolean) => void,
): () => void {
  let isIntersecting = true;
  let isPageVisible = !document.hidden;

  const notify = () => onChange(isIntersecting && isPageVisible);

  const observer = new IntersectionObserver(([entry]) => {
    isIntersecting = entry.isIntersecting;
    notify();
  });
  observer.observe(element);

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden;
    notify();
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}
