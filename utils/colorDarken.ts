function darkenHexColor(hex: string, amount: number): string {
    const sanitizedHex = hex.replace('#', '');

    const num = parseInt(sanitizedHex, 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00ff) - amount;
    let b = (num & 0x0000ff) - amount;
  
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
  
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  export default darkenHexColor;