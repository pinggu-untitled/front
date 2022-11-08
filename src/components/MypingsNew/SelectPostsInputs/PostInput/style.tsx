import styled from '@emotion/styled';

export const Card = styled.label`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;

export const CheckBox = styled.div<{ isChecked: boolean }>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  > .check-button {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid #dfdfdf;
    background-color: ${({ isChecked }) => (isChecked ? '#f5533d' : '#fff')};
    border: ${({ isChecked }) => (isChecked ? 'none' : '1px solid #dfdfdf')};

    > svg {
      color: #fff;
      font-size: 26px;
    }
  }
  > input {
    display: none;
  }
`;
