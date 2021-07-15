export interface DefaultStateValues {
  showSettings: boolean;
  rebuild: boolean;
  builds: any[];
  settings: {};
  settingsIsDone: null | string;
  settingsResult: {};
  buildDetails: {};
  buildLog: null | string;
}

export interface PayloadAction {
  type: string;
  payload: any;
}
