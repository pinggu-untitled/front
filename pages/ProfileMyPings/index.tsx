import React from 'react';
import styled from '@emotion/styled';
import AddButton from '@components/Profile/AddButton';

export const Base = styled.div`
  width: 100%;
`;

const ProfileMyPings = () => {
  return (
    <Base>
      <AddButton to="/mypings/new" />
    </Base>
  );
};

export default ProfileMyPings;
