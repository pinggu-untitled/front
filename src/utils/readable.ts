import { IMe, IMyPings, IPost } from '@typings/db';

type Type = IMyPings | IPost;
const isPublic = (item: Type) => item.is_private === 0;
const isMine = (me: IMe, item: Type) => item.User.id === me.id;
const readable = (me?: IMe, items?: any[]): any[] | undefined => {
  console.log(Array.isArray(items), '--', typeof items);
  return me && items && items?.filter((item) => isPublic(item) || isMine(me, item));
};

export default readable;
