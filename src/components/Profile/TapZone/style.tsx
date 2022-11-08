import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Taps = styled.div`
  display: flex;
  padding: 0 50px;
  height: 40px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  > a:not(:last-of-type) .content {
    border-right: 1px solid #f0f0f0;
  }
`;
export const Tap = styled(NavLink)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;
  color: gray;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 100%;
  }
  & svg {
    font-size: 16px;
    margin-right: 3px;
    transform: translateY(-1px);
  }
`;
