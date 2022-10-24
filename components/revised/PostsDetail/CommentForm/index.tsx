import React, { FC, useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IComment } from '@typings/db';
import CommentCard from '@components/revised/PostsDetail/CommentForm/CommentCard';
import EmptyMessage from '@components/revised/Profile/EmptyMessage';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { v4 as uuid } from 'uuid';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';
import autosize from 'autosize';
import { onKeyPress } from '@components/common/textareas/FixedLabelTextarea';

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

export const Main = styled.div`
  position: relative;
`;

export const CommentCardList = styled.ul`
  > li:not(:last-of-type) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

export const Form = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  overflow: hidden;

  > input {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }

  > button {
    border: none;
    background-color: transparent;
    font-size: 21px;
    padding: 0 10px;
    transform: translateY(2px);
    transition: 0.2s;
    &:disabled {
      color: gray;
    }

    &:not(:disabled) {
      color: #1974e4;
    }
  }
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const CommentForm = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: cd, mutate: mutateCd } = useSWR<IComment[]>(`/posts/${postId}/comments`, fetcher);
  const [isSpread, setIsSpread] = useState(true);
  const [comment, setComment] = useState('');
  const [pid, setPid] = useState<number | null>(null);
  const onChangeComment = (e: any) => setComment(e.target.value);
  const inputRef = useRef<HTMLInputElement>(null);
  const onEdit = (commentId: number, content: string) => {
    axios
      .patch(`/posts/${postId}/comments/${commentId}`, { content })
      .then((res) => {
        console.log(res.data);
        mutateCd();
      })
      .catch((err) => console.error(err));
  };
  const onDelete = (commentId: number) => (e: any) => {
    axios
      .delete(`/posts/${postId}/comments/${commentId}`)
      .then((res) => {
        console.log(res);
        mutateCd();
      })
      .catch((err) => console.error(err));
  };
  const onReply = (commentId: number) => (e: any) => setPid(commentId);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(comment);
    axios
      .post(`/posts/${postId}/comments`, { content: comment, pid: null })
      .then((res) => {
        console.log(res.data);
        mutateCd();
        setComment('');
        setIsSpread(true);
      })
      .catch((err) => console.error(err));
  };

  const onSubmitEdit = (e: any) => {
    e.preventDefault();
  };
  const totalComments = (comments: IComment[]) => {
    let cnt = 0;

    for (let comment of comments) {
      cnt++;
      if (comment.Comments.length > 0) {
        for (let comm of comment.Comments) {
          cnt++;
        }
      }
    }

    return cnt;
  };
  const commentsArray = (comments: IComment[]): IComment[] | [] => {
    const copied: IComment[] = [];

    // comments.reduce(())
    for (let comment of comments) {
      copied.push(comment);
      if (comment.Comments.length > 0) {
        for (let comm of comment.Comments) {
          copied.push(comm);
        }
      }
    }

    return copied;
  };

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current);
    }
  }, [inputRef]);

  console.log(cd);
  if (cd === undefined) return <div>로딩중...</div>;

  return (
    <Base>
      <Header spread={isSpread}>
        <span className={'title'}>댓글 ({totalComments(cd)})</span>
        <span className={'collapse-button'} onClick={() => setIsSpread((p) => !p)}>
          {isSpread ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        </span>
      </Header>
      {isSpread && (
        <Main>
          {cd.length > 0 ? (
            <form>
              <CommentCardList>
                {cd &&
                  commentsArray(cd)?.map((comment) => (
                    <CommentCard
                      key={uuid()}
                      comment={comment}
                      onEdit={onEdit}
                      onDelete={onDelete(comment.id)}
                      onReply={onReply(comment.id)}
                    />
                  ))}
              </CommentCardList>
            </form>
          ) : (
            <EmptyMessage message={'아직 작성된 댓글이 없습니다.'} />
          )}
        </Main>
      )}
      <Form>
        <CommentInput
          type={'text'}
          placeholder={'댓글 달기...'}
          value={comment}
          onChange={onChangeComment}
          ref={inputRef}
        />
        <button type="submit" onClick={onSubmit} disabled={!comment}>
          <BiSend />
        </button>
      </Form>
    </Base>
  );
};

export default CommentForm;
