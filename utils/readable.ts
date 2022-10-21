import { IMe, IMyPings, IPost } from '@typings/db';

const isPublic = (item: IMyPings | IPost) => [0, false].includes(item.is_private);
const isMine = (me: IMe, item: IMyPings | IPost) => item.User.id === me.id;
const readable =
  (me: IMe) =>
  (items: any[]): any[] | undefined => {
    if (me === undefined && items === undefined) return;
    return items.filter((item) => isPublic(item) || isMine(me, item));
  };

export default readable;
