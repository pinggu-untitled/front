import styled from '@emotion/styled';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainContentZone = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 40px;
`;

export const LoginButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & .image-wrapper {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid gray;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  & span {
    color: gray;
    margin-left: 12px;
    font-size: 14px;
  }
`;

export const ActionItemListBig = styled.ul`
  width: 100%;
  margin-top: 30px;

  & li:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
`;
export const ActionItemBig = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ActionItemListSmall = styled.ul`
  width: 100%;
  margin-top: 20px;

  & li {
    margin-bottom: 5px;
  }
`;
export const ActionItemSmall = styled.li`
  font-size: 14px;
  color: gray;
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
