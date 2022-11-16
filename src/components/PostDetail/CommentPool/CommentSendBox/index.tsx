import { FC, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import autosize from 'autosize';

export const Base = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  overflow: hidden;

  > textarea {
    width: 100%;
    padding: 16px 12px 0px;
    font-size: 14px;
    border: none;
    resize: none;
    font-family: inherit;

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

interface IProps {
  onSubmit: (pid: number | null, content: string) => (e: any) => void;
}

const CommentSendBox: FC<IProps> = ({ onSubmit }) => {
  const [comment, onChangeComment, setComment] = useInput('');
  const texareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: any) => {
    onSubmit(null, comment)(e);
    setComment('');
  };
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  useEffect(() => {
    if (texareaRef.current) {
      autosize(texareaRef.current);
    }
  }, [texareaRef]);

  return (
    <Base>
      <textarea
        placeholder={'댓글 달기...'}
        value={comment}
        onChange={onChangeComment}
        ref={texareaRef}
        onKeyPress={onKeyPress}
      />
      <button type="submit" onClick={handleSubmit} disabled={!comment}>
        <BiSend />
      </button>
    </Base>
  );
};

export default CommentSendBox;
