import React, { FC, useState } from 'react';
import { IComment, IMe } from '@typings/db';
import styled from '@emotion/styled';
import ProfileAvatar from '@components/revised/common/images/ProfileAvatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface IProps {
  comment: IComment;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (e: any) => void;
  onReply: (e: any) => void;
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

      & input {
        width: 100%;
        padding: 8px 0;
        font-size: 14px;
        resize: none;
        border: none;
        border-bottom: 1px solid #dfdfdf;
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

const CommentCard: FC<IProps> = ({ comment, onEdit, onDelete, onReply }) => {
  const { data: md } = useSWR<IMe>('/users/me', fetcher);
  const [isInput, setIsInput] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [content, setContent] = useState(comment.content);
  const onChangeContent = (e: any) => setContent(e.target.value);
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
    onEdit(comment.id, content);
    setIsInput(false);
  };
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') onSubmit(e);
  };
  return (
    <Base depth={comment.pid !== null}>
      <ProfileAvatar profile={comment.User} style={{ width: '23px', height: '23px' }} />
      <div className={'container'}>
        <div className={'wrapper'}>
          <span className={'nickname'}>{comment?.User.nickname}</span>
          {isInput ? (
            <>
              <input value={content} onChange={onChangeContent} autoFocus={true} onKeyPress={onKeyPress} />
              <button type={'submit'} hidden />
            </>
          ) : (
            <p className={'content'}>{comment?.content}</p>
          )}
          {
            // isReply && <input value={content} onChange={onChangeContent}  onKeyPress={onKeyPress}/>
          }
        </div>
        <ActionButtonZone>
          {md?.id === comment.User.id && (
            <>
              <ActionButton
                onClick={(e) => {
                  setIsInput((p) => !p);
                  isInput ? onSubmit(e) : null;
                }}
              >
                {isInput ? '수정 완료' : '수정'}
              </ActionButton>
              <ActionButton onClick={onDelete}>삭제</ActionButton>
            </>
          )}
          {comment.pid === null && <ActionButton onClick={onReply}>답글 달기</ActionButton>}
        </ActionButtonZone>
      </div>
    </Base>
  );
};

export default CommentCard;
