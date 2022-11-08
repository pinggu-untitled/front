import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { PostInputList } from '@components/PostNew/Input/style';
import { IUserPost } from '@typings/db';
import useSWR from 'swr';
import { useSession } from '@contexts/SessionContext';
import fetcher from '@utils/fetcher';
import PostInput from '@components/MypingsNew/SelectPostsInputs/PostInput';
import EmptyMessage from '@components/Profile/EmptyMessage';
import { Link, useParams } from 'react-router-dom';
import { Select } from '@components/MypingsNew/SelectPostsInputs/style';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface IProps {
  value: IUserPost[];
  setValue: Dispatch<SetStateAction<IUserPost[]>>;
}

const SelectPostsInput = ({ value, setValue }: IProps) => {
  const { mypingsId } = useParams<{ mypingsId: string }>();
  const { session } = useSession();
  const { data: MypingsPosts } = useSWR<IUserPost[]>(
    mypingsId ? `/mypings/${mypingsId}/posts` : null,
    fetcher
  );
  const { data: UserPosts } = useSWR<IUserPost[]>(
    `/users/${session?.id}/posts`,
    fetcher
  );

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (MypingsPosts) {
      setValue(MypingsPosts);
      setShow(true);
    }
  }, [MypingsPosts]);

  return (
    <Select>
      <div className={'label'}>게시물 선택하기</div>
      <div className={'select-container'}>
        <div className={'select-button'} onClick={() => setShow((p) => !p)}>
          마이핑스 게시물 확인하기
          <span className={'icon'}>
            {show ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
          </span>
        </div>
        {show && (
          <PostInputList>
            {/*{UserPosts?.filter(*/}
            {/*  (p) => !MypingsPosts?.map((m) => m.id)?.includes(p?.id)*/}
            {/*)?.map((Post) => (*/}
            {/*  <PostInput*/}
            {/*    key={Post.id}*/}
            {/*    data={Post}*/}
            {/*    value={value}*/}
            {/*    setValue={setValue}*/}
            {/*  />*/}
            {/*))}*/}
            {UserPosts && UserPosts.length > 0 ? (
              UserPosts?.map((Post) => (
                <PostInput
                  key={Post.id}
                  data={Post}
                  value={value}
                  setValue={setValue}
                />
              ))
            ) : (
              <EmptyMessage
                style={{ position: 'relative', padding: '40px 0 ' }}
                message={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>
                      아직 <strong>{session?.nickname}</strong>님이 작성한
                      게시물이 없어요.
                    </p>
                    <Link
                      to={'/posts/new'}
                      style={{
                        display: 'flex',
                        textAlign: 'center',
                        marginTop: '8px',
                        textDecoration: 'underline',
                      }}
                    >
                      👉🏻 게시물 작성하러 이동하기
                    </Link>
                  </div>
                }
              />
            )}
          </PostInputList>
        )}
      </div>
    </Select>
  );
};

export default SelectPostsInput;
