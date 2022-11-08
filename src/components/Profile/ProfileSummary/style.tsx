import styled from '@emotion/styled';
import { Button } from '@components/Profile/FollowButton/style';

export const Summary = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  height: 180px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  padding: 5px 0;

  > h2 {
    font-size: 20px;
  }

  > p {
    margin-top: 20px;
    font-size: 15px;
    max-width: 260px;
    min-height: 80px;
    overflow: hidden;
  }

  & .edit-button {
    position: absolute;
    top: 25px;
    right: 20px;
    padding: 6px 20px;
  }
`;

export const EditButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  font-size: 13px;
  color: gray;
  transition: 0.2s;

  &:hover {
    color: #1974e4;
    border-color: #1974e4;
  }
`;
