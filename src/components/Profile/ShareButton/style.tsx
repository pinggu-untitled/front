import styled from '@emotion/styled';

export const Button = styled.div`
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 0.2s;
  will-change: filter;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;
