export interface PostModel {
  id: number;
  title: string;
  author: string;
  description: string;
  isLiked: boolean;
  isSaved: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface ButtonsModel {
  isLiked: boolean;
  isSaved: boolean;
  likes: number;
  comments: number;
}
