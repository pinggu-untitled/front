import { Dispatch, DispatchWithoutAction, SetStateAction } from 'react';
import { Preview } from '@components/MypingsNew/ShortPreview/style';
import {
  Card,
  Inner,
  Info,
  NoMedia,
  PostImage,
  CountsInfo,
} from '@components/Home/PostCard/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import { useSession } from '@contexts/SessionContext';
import mediaPath from '@utils/mediaPath';
import { IUserPost } from '@typings/db';
import PrivateTag from '@components/Profile/PrivateTag';
import CateTag from '@components/Profile/CateTag';
import MiniCard from '@components/MypingsNew/ShortPreview/MiniCard';
import { IoIosClose } from 'react-icons/io';

interface IProps {
  message: string;
  data: {
    title: string;
    isPrivate: boolean;
    category: number;
    posts: IUserPost[];
  };
  toggleShow: DispatchWithoutAction;
}

const ShortPreview = ({ message, data, toggleShow }: IProps) => {
  const { session } = useSession();
  return (
    <Preview>
      <p
        style={{
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {message}
        <span
          onClick={toggleShow}
          style={{ fontSize: '22px', cursor: 'pointer' }}
        >
          <IoIosClose />
        </span>
      </p>
      <Card
        style={{
          border: '1px solid #dfdfdf',
          padding: '0 10px',
          borderRadius: '4px',
          marginTop: '10px',
        }}
      >
        <Inner>
          <PostImage style={{ width: '68px', height: '68px' }}>
            <NoMedia>{data.title.slice(0, 1).toUpperCase()}</NoMedia>
          </PostImage>
          <Info style={{ padding: '1px 0' }}>
            <h3
              style={{
                display: 'flex',
              }}
            >
              {data.title}
              <PrivateTag
                active={+data?.isPrivate}
                style={{ marginRight: '4px' }}
              />
            </h3>
            <CateTag cateNumber={data?.category} style={{ margin: 0 }} />
            <ProfileAvatar
              style={{
                width: '26px',
                height: '26px',
                position: 'absolute',
                right: 0,
                bottom: '6px',
              }}
            >
              <img src={mediaPath(session?.profile_image_url)} />
            </ProfileAvatar>
            <CountsInfo>
              <span className={'info'} style={{ fontSize: '12px' }}>
                게시물
                <span
                  className={'current'}
                  style={{ fontSize: '12px', marginLeft: '4px' }}
                >
                  {data.posts?.length}
                </span>
              </span>
            </CountsInfo>
          </Info>
        </Inner>
        {data.posts.length > 0 && (
          <ul style={{ overflow: 'scroll', maxHeight: '100px' }}>
            {data.posts?.map((post) => (
              <MiniCard key={post.id} data={post} />
            ))}
          </ul>
        )}
      </Card>
    </Preview>
  );
};

export default ShortPreview;
