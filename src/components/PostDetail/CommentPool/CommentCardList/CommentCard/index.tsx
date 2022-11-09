import React, { FC, memo, useState } from 'react';
import { IComment, IMe, IPost } from '@typings/db';
import styled from '@emotion/styled';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';
import mediaPath from '@utils/mediaPath';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import regexifyContent from '@utils/regexifyContent';

export const Base = styled.li<{ depth: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: ${({ depth }) => (depth ? `8px 5px 8px 18px` : `8px 5px`)};
  position: relative;
`;
export const Inner = styled.div`
  width: 100%;
  margin-left: 8px;

  > .nickname {
    font-size: 13px;
    font-weight: 700;
  }

  > .content {
    font-size: 14px;
  }
`;

export const Textarea = styled.textarea`
  width: 95%;
  position: relative;
  padding: 20px 0 0;
  font-size: 14px;
  resize: none;
  border: none;
  font-family: inherit;
  border-bottom: 1px solid #dfdfdf;
  margin-left: 6px;

  &:focus {
    outline: none;
  }
`;

export const ActionButtonZone = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;

  > span:not(:first-of-type) {
    margin-left: 6px;
  }
`;

export const ActionButton = styled.span`
  font-size: 12px;
  color: gray;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
export const ReplyInputZone = styled.div`
  display: flex;
  align-items: center;
`;

interface IProps {
  comment: IComment;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => (e: any) => void;
  onReply: (pid: number, content: string) => (e: any) => void;
}

const CommentCard: FC<IProps> = ({ comment, onEdit, onDelete, onReply }) => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const { data: pd } = useSWR<IPost>(`/posts/${postId}`, fetcher);
  const [showEditInput, setShowEditInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [editComment, onChangeEditComment] = useInput(comment.content);
  const [replyComment, onChangeReplyComment, setReplyComment] = useInput('');
  const isParentComment = (pid: number | null) => pid === null;
  const isCommenter = md?.id === comment.User.id;
  const hasPostOwnerAuth = md?.id === pd?.User.id;

  const onSubmitEdit = (e: any) => {
    e.preventDefault();
    onEdit(comment.id, editComment);
    setShowEditInput(false);
  };

  const onSubmitReply = (e: any) => {
    onReply(comment.id, replyComment)(e);
    setShowReplyInput(false);
    setReplyComment('');
  };

  type Type = 'edit' | 'reply';
  const onKeyPress = (type: Type) => (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      type === 'edit' ? onSubmitEdit(e) : onSubmitReply(e);
    }
  };

  return (
    <Base depth={!isParentComment(comment.pid)}>
      <ProfileAvatar onClick={() => navigate(`/${comment.User.id}`)}>
        <img src={mediaPath(comment.User.profile_image_url)} alt={comment.User.nickname} />
      </ProfileAvatar>
      <Inner>
        <span className={'nickname'}>{comment?.User.nickname}</span>
        {showEditInput ? (
          <>
            <Textarea
              value={editComment}
              onChange={onChangeEditComment}
              autoFocus={true}
              onKeyPress={onKeyPress('edit')}
            />
            <button type={'submit'} hidden />
          </>
        ) : (
          <p className={'content'}>{regexifyContent(comment?.content)}</p>
        )}
        {showReplyInput && (
          <ReplyInputZone>
            <ProfileAvatar onClick={() => navigate(`/${comment.User.id}`)} style={{ width: '23px', height: '23px' }}>
              <img src={mediaPath(comment.User.profile_image_url)} alt={comment.User.nickname} />
            </ProfileAvatar>
            <Textarea
              placeholder={'답글 달기...'}
              value={replyComment}
              onChange={onChangeReplyComment}
              onKeyPress={onKeyPress('reply')}
              autoFocus={true}
            />
          </ReplyInputZone>
        )}
      </Inner>
      <ActionButtonZone>
        {isCommenter && (
          <ActionButton
            onClick={(e) => {
              setShowEditInput((p) => !p);
              if (showEditInput) onSubmitEdit(e);
            }}
          >
            {showEditInput ? '수정 완료' : '수정'}
          </ActionButton>
        )}
        {(isCommenter || hasPostOwnerAuth) && <ActionButton onClick={onDelete(comment.id)}>삭제</ActionButton>}
        {isParentComment(comment.pid) && (
          <ActionButton
            onClick={(e) => {
              setShowReplyInput((p) => !p);
              if (showReplyInput) onSubmitReply(e);
            }}
          >
            {showReplyInput ? '답글 완료' : '답글 달기'}
          </ActionButton>
        )}
      </ActionButtonZone>
    </Base>
  );
};

export default memo(CommentCard);
