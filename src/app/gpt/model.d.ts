export interface Completion {
  id: string;
  role: string;
  content: string;
}

export interface Message {
  role: string;
  content: string;
}
