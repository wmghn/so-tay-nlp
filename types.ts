export enum Category {
  PREPARATION = 'Hỗ trợ lớp học',
  PROCESS = 'Quy Trình NLP',
}

export interface Note {
  id: string;
  category: Category;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}