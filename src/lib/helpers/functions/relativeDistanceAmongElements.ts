export function relativeDistanceAmongElements(
  ancestroHTML: HTMLElement,
  descendienteHTML: HTMLElement
) {
  let distanciaHorizontalPX = 0,
    distanciaVerticalPX = 0;

  let iteradorArbolHTML: any = descendienteHTML;

  while (iteradorArbolHTML && iteradorArbolHTML != ancestroHTML) {
    distanciaHorizontalPX += iteradorArbolHTML.offsetLeft;
    distanciaVerticalPX += iteradorArbolHTML.offsetTop;
    iteradorArbolHTML = iteradorArbolHTML.offsetParent;
  }

  return { distanciaHorizontalPX, distanciaVerticalPX };
}
