import styled from '@emotion/styled';

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #dfdfdf;
  padding: 10px 12px;
  border-radius: 4px;
  margin-top: 20px;

  > .title {
    font-size: 15px;
    font-weight: 600;
  }

  > .buttons {
    display: flex;
    align-items: center;

    > div:not(:last-of-type) {
      margin-right: 5px;
    }
  }
`;
