export interface IMe {
  id: number;
  nickname: string;
  profile_image_url: string;
}

export interface IUser {
  id: number;
  nickname: string;
  profile_image_url: string;
  bio?: string;
}

export interface IHistory {
  id: number;
  content: string;
}

export interface IHashtag {
  id: number;
  content: string;
}

export interface IMention {
  id: number;
}

export interface IResult {
  users: [];
  posts: [];
  myPings: [];
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  is_private: boolean | number;
  hits: number;
  latitude: string;
  longitude: string;
  updated_at: string;
  created_at: string;
  User: IUser;
  Images: IImage[];
}

export interface IImage {
  id: number;
  src: string;
}

export interface IMyPings {
  id: number;
  title: string;
  category: number;
  is_private: boolean;
  User: IUser;
}
