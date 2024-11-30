export enum ModalType {
  delete = "delete",
  login = "login",
}

export enum RequestType {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export enum MenuStatus {
  main = "main",
  saved = "saved",
  upload = "upload",
}

export interface UserModel {
  token: string;
  userId: number;
  name: string;
  email: string;
}

export interface FeedModel {
  nextPage: string;
  feedList: PostModel[];
}

export interface PostModel {
  id: number;
  userId: number;
  username: string;
  dateCreated: string;
  title: string;
  description: string;
  subject: string;
  schoolLevel: string;
  grade: string;
  previewImageUrl: string;
  fileUrl: string;
  isSupported: boolean;
  isSaved: boolean;
  supportCount: number;
  saveCount: number;
}

export interface ButtonsModel {
  isLiked: boolean;
  isSaved: boolean;
  likes: number;
  comments: number;
}
export const gradeMap = new Map<string, string>([
  ["1º ano", "FUNDAMENTAL_1_ANO"],
  ["2º ano", "FUNDAMENTAL_2_ANO"],
  ["3º ano", "FUNDAMENTAL_3_ANO"],
  ["4º ano", "FUNDAMENTAL_4_ANO"],
  ["5º ano", "FUNDAMENTAL_5_ANO"],
  ["6º ano", "FUNDAMENTAL_6_ANO"],
  ["7º ano", "FUNDAMENTAL_7_ANO"],
  ["8º ano", "FUNDAMENTAL_8_ANO"],
  ["9º ano", "FUNDAMENTAL_9_ANO"],
  ["Médio série 1", "ENSINO_MEDIO_1_SERIE"],
  ["Médio série 2", "ENSINO_MEDIO_2_SERIE"],
  ["Médio série 3", "ENSINO_MEDIO_3_SERIE"],
]);

export const schoolLevelMap = new Map<string, string>([
  ["Educação infantil", "EDUCACAO_INFANTIL"],
  ["Fundamental anos iniciais", "FUNDAMENTAL_ANOS_INICIAIS"],
  ["Fundamental anos finais", "FUNDAMENTAL_ANOS_FINAIS"],
  ["Ensino médio", "ENSINO_MEDIO"],
]);

export const subjectMap = new Map<string, string>([
  ["Língua portuguesa", "LINGUA_PORTUGUESA"],
  ["Arte educação física", "ARTE_EDUCACAO_FISICA"],
  ["Língua inglesa", "LINGUA_INGLESA"],
  ["Matemática", "MATEMATICA"],
  ["Ciências", "CIENCIAS"],
  ["História", "HISTORIA"],
  ["Geografia", "GEOGRAFIA"],
  ["Física", "FISICA"],
  ["Química", "QUIMICA"],
  ["Biologia", "BIOLOGIA"],
  ["Filosofia", "FILOSOFIA"],
  ["Sociologia", "SOCIOLOGIA"],
]);

export const findKeyByValue = (
  map: Map<string, string>,
  value: string
): string => {
  for (const [key, val] of map.entries()) {
    if (val === value) return key;
  }
  return "";
};
