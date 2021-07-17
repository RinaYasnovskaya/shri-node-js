export interface ResultObj {
  [key: string]: string;
}

export interface RequestData {
  data: {
    id: string;
    buildNumber: number;
    status: string;
  }
}
