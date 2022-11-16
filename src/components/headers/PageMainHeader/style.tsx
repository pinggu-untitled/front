import styled from '@emotion/styled';

export const Header = styled.header`
  position: fixed;
  left: 73px;
  height: 70px;
  width: 440px;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #dfdfdf;
  z-index: 1000;
  overflow: hidden;

  > h2 {
    font-size: 18px;
  }
`;

export const ActionList = styled.div`
  display: flex;

  > button:not(:first-of-type) {
    margin-left: 6px;
  }
`;
export const ActionButton = styled.button`
  font-size: 21px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 0.2s;
  border: none;
  background-color: transparent;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    opacity: 0.6;
  }
`;
