import styled from '@emotion/styled';

export const Button = styled.div<{ colors: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 25px;
  background-color: ${({ colors }) => colors.background ?? 'transparent'};
  color: ${({ colors }) => colors.font};

  &:hover {
    background: ${({ colors }) => !colors.background && 'rgba(0, 0, 0, 0.08)'};
  }
`;
