import styled from '@emotion/styled';

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dfdfdf;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
