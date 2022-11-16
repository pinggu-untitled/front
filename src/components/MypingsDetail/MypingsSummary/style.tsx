import styled from '@emotion/styled';

export const Summary = styled.div`
  padding: 0 16px;
  box-shadow: 0 12px 12px 0px rgba(0, 0, 0, 0.02);
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
`;

export const Text = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 13px;

  > svg {
    font-size: 18px;
    transform: translate(2px, -1px);
  }
`;
