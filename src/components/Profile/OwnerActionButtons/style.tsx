import styled from '@emotion/styled';

export const Actions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 34px;
  border-top: 1px solid #f0f0f0;

  > button {
    flex: 1;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: 13px;
    cursor: pointer;
  }

  > button:first-of-type {
    border-right: 1px solid #f0f0f0;
  }
`;
