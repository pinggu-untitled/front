import { IUserPost } from '@typings/db';
import { BsCheck } from 'react-icons/bs';
import { Info, Inner, NoMedia, PostImage, TotalCount } from '@components/Home/PostCard/style';
import { HiOutlineCamera } from 'react-icons/hi';
import { Card, CheckBox } from '@components/MypingsNew/SelectPostsInputs/PostInput/style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import mediaPath from '@utils/mediaPath';
import timeForToday from '@utils/timeForToday';

interface IProps {
  data: IUserPost;
  value: IUserPost[];
  setValue: Dispatch<SetStateAction<IUserPost[]>>;
}

const PostInput = ({ data, value, setValue }: IProps) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setValue((prev) => [...prev, { ...data }]);
    } else {
      setValue((prev) => [...prev].filter((v) => v.id !== data?.id));
    }
  };

  useEffect(() => {
    if (value) {
      const existing = value.findIndex((v) => v.id === data.id) > -1;
      if (existing) setChecked(true);
    }
  }, [value]);

  return (
    <Card>
      <CheckBox onClick={(e) => e.stopPropagation()} isChecked={isChecked}>
        <div className={'check-button'}> {isChecked && <BsCheck />}</div>
        <input type={'checkbox'} checked={isChecked} onChange={handleCheck} />
      </CheckBox>
      <Inner>
        <PostImage style={{ width: '60px', height: '60px' }}>
          {data?.Images.length > 0 ? (
            <>
              <TotalCount>
                <span className={'current'}>1</span> / {data?.Images.length}
              </TotalCount>
              <img src={mediaPath('post', data?.Images[0].src)} alt={data.User.nickname} />
            </>
          ) : (
            <NoMedia style={{ fontSize: '16px' }}>
              <HiOutlineCamera />
            </NoMedia>
          )}
        </PostImage>
        <Info>
          <h3>{data.title}</h3>
          <span className={'created-at'}>{timeForToday(Date.parse(data.created_at))}</span>
        </Info>
      </Inner>
    </Card>
  );
};

export default PostInput;
