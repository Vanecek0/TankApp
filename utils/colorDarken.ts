function darkenHexColor(hex: string, amount: number): string {
  const sanitizedHex = hex.replace('#', '');

  const r = parseInt(sanitizedHex.slice(0, 2), 16);
  const g = parseInt(sanitizedHex.slice(2, 4), 16);
  const b = parseInt(sanitizedHex.slice(4, 6), 16);

  const clamp = (val: number) => Math.max(0, Math.min(255, val));

  const newR = clamp(r - amount);
  const newG = clamp(g - amount);
  const newB = clamp(b - amount);

  const toHex = (val: number) => val.toString(16).padStart(2, '0');

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export default darkenHexColor;