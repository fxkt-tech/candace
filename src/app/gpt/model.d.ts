export interface Completion {
  id: string;
  role_name: string;
  role: string;
  content: string;
  autoFocus: boolean;
  mouseOver: boolean;
}

export interface Message {
  role: string;
  content: string;
}


export interface Platform {
  name: string;
  value: string;
}