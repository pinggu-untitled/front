export interface IUser {
  id: number;
  nickname: string;
  profile_image_url: string;
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

export interface IPostDefault {
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
}

export interface IPost extends IPostDefault {
  Images: IImage[];
}

export interface IImage {
  id: number;
  src: string;
}

export interface IPostCard extends IPostDefault {
  Images: IImage;
}
