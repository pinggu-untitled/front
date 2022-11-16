import { Card, Info, Inner, NoMedia, PostImage } from '@components/Home/PostCard/style';
import { HiOutlineCamera } from 'react-icons/hi';
import mediaPath from '@utils/mediaPath';
import { IPost } from '@typings/db';
interface IProps {
  data: IPost;
}
const MiniCard = ({ data }: IProps) => {
  return (
    <Card
      style={{
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <Inner style={{ alignItems: 'center' }}>
        <PostImage style={{ width: '30px', height: '30px' }}>
          {data?.Images.length > 0 ? (
            <img src={mediaPath('post', data?.Images[0].src)} alt={data.User.nickname} />
          ) : (
            <NoMedia style={{ fontSize: '15px' }}>
              <HiOutlineCamera />
            </NoMedia>
          )}
        </PostImage>
        <Info>
          <h3 style={{ fontSize: '13px' }}>{data.title}</h3>
        </Info>
      </Inner>
    </Card>
  );
};

export default MiniCard;
