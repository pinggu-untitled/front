import styled from '@emotion/styled';

export const InnerTap = styled.div`
  position: fixed;
  left: 73px;
  width: 440px;
  height: 50px;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  padding: 0 6px;
  border-right: 1px solid #dfdfdf;
`;

export const Tap = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? '#191919' : 'gray')};
  font-weight: ${({ active }) => (active ? '600' : undefined)};
  font-size: 13px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`;
