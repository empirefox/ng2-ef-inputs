import { AmapLocation } from './location';

const parseRegexp = /^amap:(-?\d*\.?\d+,-?\d*\.?\d+),([^,]+)(?:,(.+))?$/;

export function parseAmap(s: string): AmapLocation {
  let match: RegExpMatchArray;
  if (s && (match = s.match(parseRegexp))) {
    return {
      location: match[1],
      name: match[2],
      address: match[3],
    };
  }
}

export function stringifyAmap(amap: AmapLocation): string {
  if (amap && amap.address && amap.name) {
    let name = amap.address ? `${amap.name},${amap.address}` : amap.name;
    return `amap:${amap.location},${name}`;
  }
}

export function toUrl(amap: AmapLocation, key: string): string {
  if (amap && amap.location && key) {
    let name = amap.address ? `${amap.name}||${amap.address}` : amap.name;
    return `https://m.amap.com/navi/?dest=${amap.location}&destName=${name}&hideRouteIcon=1&key=${key}`;
  }
  return '';
}
