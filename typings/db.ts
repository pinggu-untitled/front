export interface IUser {
  id: number;
  nickname: string;
  profile_image_url: string;
}

export interface IHistory {
  id: number;
  content: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  is_private: boolean;
  hits: number;
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
