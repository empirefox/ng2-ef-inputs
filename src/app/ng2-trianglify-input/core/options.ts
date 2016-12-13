
const trianglify = require('trianglify');

export interface Options {
  palette: string;
  cell_size: number;
  variance: number;
}

export function parseOptions(s: string): Options {
  if (!s) {
    return;
  }
  let sarray = s.split('-');
  if (sarray.length !== 3 || !trianglify.colorbrewer[sarray[0]]) {
    return;
  }

  return {
    palette: sarray[0],
    cell_size: parseInt(sarray[1], 10),
    variance: parseFloat(sarray[2]),
  };
}

export function stringifyOptions(ops: Options): string {
  return ops ? [ops.palette, ops.cell_size, ops.variance].join('-') : '';
}

export function randomOptions(): Options {
  let items = Object.keys(trianglify.colorbrewer);
  return {
    palette: items[Math.floor(Math.random() * items.length)],
    cell_size: 100 + Math.floor(Math.random() * 250),
    variance: +Math.random().toFixed(2),
  };
}

export function copyOptions(ops: Options): Options {
  let {palette, cell_size, variance} = ops;
  return { palette, cell_size, variance };
}
