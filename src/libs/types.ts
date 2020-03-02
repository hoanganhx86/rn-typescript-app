export interface Report {
  message: string;
  currentVal: number;
  predictVal: number;
}

export interface Todo {
  id: number;
  todo: string;
  avatar?: string;
  badge?: string;
}

export interface Deal {
  title: string;
  avatar?: string;
}
