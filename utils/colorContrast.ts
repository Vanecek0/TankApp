function contrastHexColor(backgroundHex: string): string {
  if (backgroundHex) {
    const sanitizedHex = backgroundHex.replace('#', '');

    const r = parseInt(sanitizedHex.slice(0, 2), 16);
    const g = parseInt(sanitizedHex.slice(2, 4), 16);
    const b = parseInt(sanitizedHex.slice(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  return ''
}

export default contrastHexColor;