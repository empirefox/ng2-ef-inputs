export interface IUptokenResponse {
  Uptoken: string;
}

export class Uptoken {
  token: string;
  deadline: number;
  uphost: string;
  key: string;

  constructor(res: IUptokenResponse) {
    this.token = res.Uptoken;
    let putPolicy = JSON.parse(atob(res.Uptoken.split(':', 3)[2]));
    this.deadline = (putPolicy.deadline - 10) * 1000;
    this.uphost = (putPolicy.uphosts && putPolicy.uphosts[0])
      || window.location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com';
    this.key = putPolicy.scope.split(':', 2)[1];
  }

  valid(): boolean {
    return this.token && this.deadline && Date.now() < this.deadline;
  }
}
