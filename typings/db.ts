interface IMe {
  id: number;
  nickname: string;
  profile_image_url: string;
}

interface IUser {
  id: number;
  nickname: string;
  profile_image_url: string;
  bio: string;
}

interface IHistory {
  id: number;
  content: string;
}

interface IHashtag {
  id: number;
  content: string;
}

interface IMention {
  id: number;
  receiver: number; //userId
}

interface IResult {
  users: [];
  posts: [];
  myPings: [];
}

interface IPost {
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
  Comments: IComment[] | [];
  Hashtags: IHashtag[] | [];
  Mentions: IMention[] | [];
}

interface IUserPost {
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
  Likers: { id: number; User: IUser }[];
}

interface IImage {
  id: number;
  src: string;
}

interface IMyPings {
  id: number;
  title: string;
  category: number;
  is_private: boolean | number;
  User: IUser;
}

interface IComment {
  id: number;
  content: string;
  pid: number | null;
  created_at: string;
  updated_at: string;
  User: IUser;
  Hashtags?: IHashtag[] | [];
  Mentions?: IMention[] | [];
  Comments: IComment[] | [];
}

export { IMe, IUser, IImage, IPost, IMyPings, IHashtag, IResult, IMention, IHistory, IComment };
