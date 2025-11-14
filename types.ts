export enum Category {
  PREPARATION = 'Chuẩn Bị',
  PROCESS = 'Quy Trình',
}

export interface Note {
  id: string;
  category: Category;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}