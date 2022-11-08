import styled from '@emotion/styled';

export const Form = styled.form`
  padding: 0 20px;
  > label:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 73px;
  width: 440px;
  min-height: 70px;
  border-top: 1px solid #dfdfdf;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  z-index: 1000;
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? '#e4e6ea' : '#0085fe')};
  color: ${({ disabled }) => (disabled ? 'gray' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'text' : 'pointer')};
  transition: 0.2s;
`;
