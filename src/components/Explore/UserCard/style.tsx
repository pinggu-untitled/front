import styled from '@emotion/styled';

export const Card = styled.li`
  padding: 16px 0;
  display: flex;
  align-items: flex-start;
  position: relative;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  margin-left: 16px;
  height: 100%;

  > .nickname {
    font-size: 15px;
    font-weight: 600;
  }
  > .follow {
    font-size: 13px;
    color: gray;
    margin-top: 10px;
  }
`;
