import React, { FC, useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IComment } from '@typings/db';
import CommentCard from '@components/revised/PostsDetail/CommentForm/CommentCard';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { v4 as uuid } from 'uuid';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';
import autosize from 'autosize';
import useInput from '@hooks/useInput';

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
  const [isSpread, setIsSpread] = useState(false);
  const [comment, onChangeComment, setComment] = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onEdit = (commentId: number, content: string) => {
    axios
      .patch(`/posts/${postId}/comments/${commentId}`, { content })
      .then((res) => {
        mutateCd();
      })
      .catch((err) => console.error(err));
  };
  const onDelete = (commentId: number) => (e: any) => {
    axios
      .delete(`/posts/${postId}/comments/${commentId}`)
      .then((res) => {
        mutateCd();
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (pid: number | null, content: string) => (e: any) => {
    e.preventDefault();
    axios
      .post(`/posts/${postId}/comments`, { pid: pid, content })
      .then((res) => {
        mutateCd();
        setComment('');
        setIsSpread(true);
      })
      .catch((err) => console.error(err));
  };

  const onReply = (pid: number, content: string) => (e: any) => {
    onSubmit(pid, content)(e);
  };

  const commentsArray = (comments: IComment[]): { fullComments: IComment[] | []; length: number } => {
    const copied: IComment[] = [];

    for (let comment of comments) {
      copied.push(comment);
      if (comment.Comments.length > 0) {
        for (let comm of comment.Comments) {
          copied.push(comm);
        }
      }
    }

    return { fullComments: copied, length: copied.length };
  };

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current);
    }
  }, [inputRef]);

  if (cd === undefined) return <div>로딩중...</div>;

  return (
    <Base>
      <Header spread={isSpread}>
        <span className={'title'}>댓글 ({commentsArray(cd)['length']})</span>
        <span className={'collapse-button'} onClick={() => setIsSpread((p) => !p)}>
          {isSpread ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        </span>
      </Header>
      {isSpread && (
        <Main>
          {cd.length > 0 && (
            <form>
              <CommentCardList>
                {cd &&
                  commentsArray(cd)['fullComments']?.map((comment) => (
                    <CommentCard
                      key={uuid()}
                      comment={comment}
                      onEdit={onEdit}
                      onDelete={onDelete(comment.id)}
                      onReply={onReply}
                    />
                  ))}
              </CommentCardList>
            </form>
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
        <button type="submit" onClick={onSubmit(null, comment)} disabled={!comment}>
          <BiSend />
        </button>
      </Form>
    </Base>
  );
};

export default CommentForm;
