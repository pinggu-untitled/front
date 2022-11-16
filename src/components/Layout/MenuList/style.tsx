import styled from '@emotion/styled';

export const Ul = styled.ul`
  position: fixed;
  background-color: #fff;
  width: 160px;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 3000;

  > li:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`;
export const Li = styled.li`
  padding: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > .inner {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    padding: 8px 12px;
    transition: 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #f0f0f0;
    }
    > .icon {
      font-size: 16px;
      transform: translateY(1px);
    }
    > .title {
      margin-left: 10px;
      font-size: 13px;
    }
  }
`;
