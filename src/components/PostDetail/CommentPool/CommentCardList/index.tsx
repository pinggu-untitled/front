import React, { FC } from 'react';
import { IComment } from '@typings/db';
import styled from '@emotion/styled';
import CommentCard from '@components/PostDetail/CommentPool/CommentCardList/CommentCard';

export const Base = styled.ul`
  position: relative;

  > li:not(:last-of-type) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

interface IProps {
  comments: IComment[];
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => (e: any) => void;
  onReply: (pid: number, content: string) => (e: any) => void;
}

const CommentCardList: FC<IProps> = ({ comments, onEdit, onDelete, onReply }) => {
  return (
    <Base>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} onEdit={onEdit} onDelete={onDelete} onReply={onReply} />
      ))}
    </Base>
  );
};

export default CommentCardList;
