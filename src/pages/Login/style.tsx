import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
export const PageBase = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: scroll;
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;

  > .inner {
    max-width: 1200px;
    height: 100%;
    margin: auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & #logo {
      font-size: 20px;
      color: #fff;
    }
  }
`;

export const OutlineLink = styled(Link)`
  font-size: 14px;
  color: #7d8789;
  padding: 8px 20px 10px;
  border: 1px solid #7d8789;
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    border-color: #ffcc35;
    color: #fff;
  }
`;

export const Main = styled.main`
  width: 440px;
  height: 760px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;
// #ffcc35 -노

export const TapZone = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
`;

export const Tap = styled.div<{ active: boolean }>`
  z-index: 1000;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  background-color: ${({ active }) => (active ? '#fff' : '#f4f4f4')};
`;

export const ContentZone = styled.div`
  height: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-50px);
  > .message {
    font-size: 13px;
    text-align: center;
    margin-bottom: 0;
  }

  > .move-to-login {
    cursor: pointer;
    color: gray;
    margin-top: 10px;
    &:hover {
      text-decoration: underline;
    }
  }

  > .socials {
    width: 100%;
    margin-top: 20px;

    > a.social-link {
      height: 46px;
      width: 100%;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;

      > svg {
        font-size: 22px;
        margin-right: 10px;
        transform: translateY(-1px);
      }
    }

    > .social-link:first-of-type {
      margin-bottom: 10px;
    }
  }
`;
