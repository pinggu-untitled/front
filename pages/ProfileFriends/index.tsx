import React from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';

export const Base = styled.div`
  width: 100%;
`;

const ProfileFriends = () => {
  return (
    <Base>
      {/* TODO - 찾기*/}
      <AddButton to={'/'} />
    </Base>
  );
};

export default ProfileFriends;
