export interface IMe {
  id: number;
  nickname: string;
  profile_image_url: string;
}

export interface IUser extends IMe {
  bio: string;
}

export interface IHashtag {
  id: number;
  content: string;
}

export interface IMention {
  id: number;
  receiver: number; //userId
}
export interface IUserPost {
  id: number;
  title: string;
  content: string;
  is_private: number;
  hits: number;
  latitude: string;
  longitude: string;
  updated_at: string;
  created_at: string;
  User: IUser;
  Images: IImage[];
  Likers: { id: number; User: IUser }[];
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  is_private: number;
  hits: number;
  latitude: string;
  longitude: string;
  updated_at: string;
  created_at: string;
  User: IUser;
  Images: IImage[];
  Likers: IUser[];
  Comments: IComment[] | [];
  Hashtags?: IHashtag[] | [];
  Mentions?: IMention[] | [];
}

export interface IImage {
  id: number;
  src: string;
}

export interface IMyPings {
  id: number;
  title: string;
  category: number;
  is_private: number;
  User: IUser;
}

export interface IComment {
  id: number;
  content: string;
  pid: number | null;
  created_at: string;
  updated_at: string;
  User: IUser;
  Hashtags: IHashtag[] | [];
  Mentions: IMention[] | [];
  Comments: IComment[] | [];
}
