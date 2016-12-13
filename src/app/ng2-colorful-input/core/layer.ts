export class ColorfulBackgroundLayer {
  hue: number;
  saturation: number;
  lightness: number;
  degree: number;
  positionColor: number;
  positionTransparency: number;

  // hue, saturation, lightness, degree, positionColor, positionTransparency
  constructor(layer: number[]) {
    this.hue = layer[0] === undefined ? 200 : layer[0];
    this.saturation = layer[1] === undefined ? 100 : layer[1];
    this.lightness = layer[2] === undefined ? 70 : layer[2];
    this.degree = layer[3] === undefined ? 45 : layer[3];
    this.positionColor = layer[4] === undefined ? 0 : layer[4];
    this.positionTransparency = layer[5] === undefined ? 70 : layer[5];
  }

  getCSSProperty(prefix = '') {
    let hslColor = `${this.hue},${this.saturation}%,${this.lightness}%`;
    return `${prefix}linear-gradient(${this.getDegreeForVendor(prefix)}deg, hsla(${hslColor},1) ${this.positionColor}%, hsla(${hslColor},0) ${this.positionTransparency}%)`;
  }

  getDegreeForVendor(prefix) {
    // -webkit-linear-gradient is counting degrees counterclockwise. 0° is at the left side.
    if (prefix === '-webkit-') {
      let convertedDegree = (360 - this.degree) + 90;
      if (convertedDegree >= 360) {
        convertedDegree -= 360;
      }
      return convertedDegree;
    }

    // linear-gradient is counting degrees clockwise. 0° is at the bottom side.
    // (prefix === undefined)
    return this.degree;
  }
}
