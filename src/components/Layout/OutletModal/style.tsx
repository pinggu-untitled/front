import styled from '@emotion/styled';

export const OutletZone = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 73px;
  width: ${({ isActive }) => (isActive ? '440px' : '0')};
  transition: 0.1s;
  //background-color: #e7eced;
  //background-color: #f0f0f0;
  border-right: 1px solid #dfdfdf;
  box-shadow: 10px 0px 6px -10px rgba(0, 0, 0, 0.08);
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  overflow: scroll;
  z-index: 1000;
  background-color: #fff;
`;

export const Slider = styled.div<{ isActive: boolean }>`
  position: fixed;
  left: ${({ isActive }) => (isActive ? 'calc(73px + 440px)' : '73px')};
  transition: 0.1s;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 40px;
  border: 1px solid #dfdfdf;
  border-left: none;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  box-shadow: 15px 0px 15px -10px rgba(0, 0, 0, 0.08);
  background-color: #fff;

  //background-color: #e7eced;
  //background-color: #f0f0f0;

  > svg {
    font-size: 20px;
    color: gray;
    transform: translateX(-1px);
  }
`;
