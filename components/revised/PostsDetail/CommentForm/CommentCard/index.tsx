import React, { FC, useEffect, useRef, useState } from 'react';
import { IComment, IMe } from '@typings/db';
import styled from '@emotion/styled';
import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import contentRegexfier from '@utils/contentRegexfier';
import handleNavigate from '@utils/handleNavigate';
import { useNavigate } from 'react-router-dom';
import autosize from 'autosize';

interface IProps {
  comment: IComment;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (e: any) => void;
  onReply: (pid: number, content: string) => (e: any) => void;
}

export const Base = styled.li<{ depth: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: ${({ depth }) => (depth ? `8px 5px 8px 18px` : `8px 5px`)};
  position: relative;

  > .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;

    > .wrapper {
      width: 100%;

      & .nickname {
        font-size: 13px;
        font-weight: 700;
      }

      & .content {
        width: 100%;
        font-size: 14px;
      }

      & textarea {
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
      }
    }
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

export const ReplyInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentCard: FC<IProps> = ({ comment, onEdit, onDelete, onReply }) => {
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const [isEditInput, setEditInput] = useState(false);
  const [isReplyInput, setReplyInput] = useState(false);
  const [editComment, onChangeEditComment, setEditComment] = useInput(comment.content);
  const [replyComment, onChangeReplyComment, setReplyComment] = useInput('');
  const navigator = useNavigate();
  const texareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmitEdit = (e: any) => {
    e.preventDefault();
    onEdit(comment.id, editComment);
    setEditInput(false);
  };

  const onSubmitReply = (e: any) => {
    console.log('replay sumibt', replyComment);
    onReply(comment.id, replyComment)(e);
    setReplyInput(false);
    setReplyComment('');
  };

  type Type = 'edit' | 'reply';

  const onKeyPress = (type: Type) => (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      type === 'edit' ? onSubmitEdit(e) : onSubmitReply(e);
    }
  };

  useEffect(() => {
    if (texareaRef.current) {
      autosize(texareaRef.current);
    }
  }, [texareaRef]);

  return (
    <Base depth={comment.pid !== null}>
      <ProfileAvatar
        profile={comment.User}
        style={{ width: '23px', height: '23px' }}
        onClick={handleNavigate(navigator, `/${comment.User.id}`)}
      />
      <div className={'container'}>
        <div className={'wrapper'}>
          <span className={'nickname'}>{comment?.User.nickname}</span>
          {isEditInput ? (
            <>
              <textarea
                value={editComment}
                onChange={onChangeEditComment}
                autoFocus={true}
                onKeyPress={onKeyPress('edit')}
              />
              <button type={'submit'} hidden />
            </>
          ) : (
            <p className={'content'}>{contentRegexfier(comment?.content)}</p>
          )}
          {isReplyInput && (
            <ReplyInputWrapper>
              <ProfileAvatar profile={md} style={{ width: '23px', height: '23px' }} />
              <textarea
                placeholder={'답글 달기...'}
                value={replyComment}
                onChange={onChangeReplyComment}
                onKeyPress={onKeyPress('reply')}
                autoFocus={true}
                ref={texareaRef}
              />
            </ReplyInputWrapper>
          )}
        </div>
        <ActionButtonZone>
          {md?.id === comment.User.id && (
            <>
              <ActionButton
                onClick={(e) => {
                  setEditInput((p) => !p);
                  isEditInput && onSubmitEdit(e);
                }}
              >
                {isEditInput ? '수정 완료' : '수정'}
              </ActionButton>
              <ActionButton onClick={onDelete}>삭제</ActionButton>
            </>
          )}
          {comment.pid === null && (
            <ActionButton
              onClick={(e) => {
                setReplyInput((p) => !p);
                isReplyInput && onSubmitReply(e);
              }}
            >
              {isReplyInput ? '답글 완료' : '답글 달기'}
            </ActionButton>
          )}
        </ActionButtonZone>
      </div>
    </Base>
  );
};

export default CommentCard;
