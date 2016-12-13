import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';
import { ColorfulPipe } from './colorful.pipe';

describe('Pipe: ColorfulPipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ColorfulPipe,
    ]
  }));

  it('should make a background-image style', inject([ColorfulPipe], (pipe: ColorfulPipe) => {
    let s36 = '4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j';
    let result = `
    linear-gradient(45deg,hsla(35,95%,55%,1)0%,hsla(35,95%,55%,0)70%),
    linear-gradient(135deg,hsla(140,90%,50%,1)10%,hsla(140,90%,50%,0)80%),
    linear-gradient(225deg,hsla(225,95%,50%,1)10%,hsla(225,95%,50%,0)80%),
    linear-gradient(315deg,hsla(340,100%,55%,1)100%,hsla(340,100%,55%,0)70%)`;
    let r: any = pipe.transform(s36);
    console.log(r);
    expect(r.changingThisBreaksApplicationSecurity.replace(/\s/g, '')).toBe(result.replace(/\s/g, ''));
  }));
});
