import React, { FC, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import SettingsMenuList from '@components/common/navigations/DetailTopNavigation/SettingsModal/SettingsMenuList';
import SettingsMenuItem from '@components/common/navigations/DetailTopNavigation/SettingsModal/SettingsMenuList/SettingsMenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import MenuList from '@components/common/lists/MenuList';
import MenuItem from '@components/common/lists/MenuList/MenuItem';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai';
import { HiOutlineShare } from 'react-icons/hi';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import CopyButton from '@components/common/lists/MenuList/CopyButton';
import { Redirect } from 'react-router';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  width: 200px;
  border-radius: 4px;
  top: 60px;
  left: 300px;
  background-color: #fff;
`;

const SettingsModal: FC<IProps> = ({ show, onCloseModal }) => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  // const { data: ud, mutate: mutateUd } = useSWR(`/users/me`, fetcher);
  const { data: pd, mutate: mutatePd } = useSWR(`/posts/${postId}`, fetcher);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const onDelete = useCallback(() => {
    axios.delete(`/posts/${postId}`).then((res) => {
      console.log(res.data);
      if (res.data.messages === 'deleted') {
        return <Redirect to="/" />;
      }
    });
  }, []);

  const copyUrl = useCallback((e) => {
    //... url 복사하기
    if (!document.queryCommandSupported('copy')) alert('복사 기능이 지원되지 않는 브라우저입니다.');

    copyUrlRef.current?.select();
    document.execCommand('copy');
    e.target.focus();
  }, []);

  // if (5 && !pd) return <div>로딩중...</div>;

  return (
    <FullScreenModal show={show} onCloseModal={onCloseModal}>
      <ModalContent onClick={onCloseModal}>
        <MenuList>
          {false ? (
            <>
              <CopyButton icon={<AiOutlineLink />} content={'링크복사'} onClick={copyUrl}>
                <form>
                  <textarea ref={copyUrlRef} value={window.location.href} />
                </form>
              </CopyButton>
            </>
          ) : (
            <>
              <MenuItem icon={<BiEditAlt />} content={'편집하기'} onClick={() => navigate('edit')} />
              <MenuItem icon={<AiOutlineDelete />} content={'삭제하기'} onClick={onDelete} />
            </>
          )}
        </MenuList>
      </ModalContent>
    </FullScreenModal>
  );
};

export default SettingsModal;
