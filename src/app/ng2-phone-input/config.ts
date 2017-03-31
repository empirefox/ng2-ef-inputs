export interface ISmsConfig {
  key?: string;
  post: string;
  seconds: number;
  units?: number;
}

export interface ISmsResponse {
  unix?: number;
}
