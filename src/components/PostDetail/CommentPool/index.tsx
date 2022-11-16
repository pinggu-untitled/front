import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { IComment } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import axios from 'axios';
import CommentCardList from '@components/PostDetail/CommentPool/CommentCardList';
import CommentSendBox from '@components/PostDetail/CommentPool/CommentSendBox';
import { makeHashtags, makeMentions } from '@pages/PostNew';

export const Base = styled.div`
  width: 100%;
  padding: 0 20px 10px;
  border-top: 1px solid #dfdfdf;
`;

export const Header = styled.div<{ spread: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;

  > .title {
    font-size: 15px;
    font-weight: 700;
  }

  > .collapse-button {
    display: inline-block;
    font-size: 22px;
    cursor: pointer;
    transform: translateY(4px);
  }
`;

const CommentPool = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: cd, mutate: mutateCd } = useSWR<IComment[]>(`/posts/${postId}/comments`, fetcher);
  const [isSpread, setIsSpread] = useState(true);

  const onEdit = (commentId: number, content: string) => {
    axios
      .patch(`/posts/${postId}/comments/${commentId}`, {
        content,
        hashtags: makeHashtags(content),
        mentions: makeMentions(content),
      })
      .then(() => {
        mutateCd();
      })
      .catch((err) => console.error(err));
  };

  const onDelete = (commentId: number) => () => {
    axios
      .delete(`/posts/${postId}/comments/${commentId}`)
      .then(() => {
        mutateCd();
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (pid: number | null, content: string) => (e: any) => {
    e.preventDefault();
    axios
      .post(`/posts/${postId}/comments`, {
        pid: pid,
        content,
        hashtags: makeHashtags(content),
        mentions: makeMentions(content),
      })
      .then(() => {
        mutateCd();
        setIsSpread(true);
      })
      .catch((err) => console.error(err));
  };

  const onReply = (pid: number, content: string) => (e: any) => onSubmit(pid, content)(e);

  const commentsArray = useCallback((comments: IComment[]): { fullComments: IComment[] | []; length: number } => {
    const copied: IComment[] = [];

    for (const comment of comments) {
      copied.push(comment);
      if (comment.Comments.length > 0) {
        for (const comm of comment.Comments) {
          copied.push(comm);
        }
      }
    }

    return { fullComments: copied, length: copied.length };
  }, []);

  if (cd === undefined) return <div>로딩중...</div>;

  return (
    <Base>
      <Header spread={isSpread} onClick={() => setIsSpread((p) => !p)}>
        <span className={'title'}>댓글 ({commentsArray(cd)['length']})</span>
        <span className={'collapse-button'}>{isSpread ? <TiArrowSortedDown /> : <TiArrowSortedUp />}</span>
      </Header>
      <form>
        {isSpread && cd?.length > 0 && (
          <CommentCardList
            comments={commentsArray(cd)['fullComments']}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
          />
        )}
        <CommentSendBox onSubmit={onSubmit} />
      </form>
    </Base>
  );
};

export default CommentPool;
