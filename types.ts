export interface Category {
  name: string;
  description: string;
  order: number;
}

export interface Note {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}