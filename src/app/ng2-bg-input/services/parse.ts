import { Bg } from './bg';

const parseRe = /^bg-(color|colorful|trianglify|pattern|img):(.+)$/;

export function parse(s: string): Bg {
  let match: RegExpMatchArray;
  if (s && (match = s.match(parseRe))) {
    let bg = { typ: match[1] };
    bg[match[1]] = match[2];
    return bg;
  }
}
