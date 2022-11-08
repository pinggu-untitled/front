import styled from '@emotion/styled';

export const MovingLabel = styled.div`
  position: relative;

  > .label {
    height: 30px;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.2s;
  }

  > .content:hover + .label {
    opacity: 1;
    visibility: visible;
  }
`;
