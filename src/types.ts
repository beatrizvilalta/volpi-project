export enum MenuStatus {
  main = "main",
  saved = "saved",
  upload = "upload",
}

export interface FeedModel {
  nextPage: string;
  feedList: PostModel[];
}

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
