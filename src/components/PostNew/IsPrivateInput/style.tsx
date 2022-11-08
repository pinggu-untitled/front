import styled from '@emotion/styled';

export const Base = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 3px 0;
  > .nickname {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

export const ToggleButton = styled.label<{ active: boolean }>`
  width: 78px;
  padding: 3px;
  border-radius: 20px;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-direction: ${({ active }) => (active ? 'row-reverse' : 'inherit')};
  transition: 0.2s;
  position: relative;
  cursor: pointer;
  > input {
    display: none;
  }

  > .label {
    position: absolute;
    font-size: 11px;
    font-weight: 600;
    top: 8.8px;
    left: ${({ active }) => (active ? '8px' : '30px')};
  }
`;

export const ToggleBall = styled.div`
  background-color: gray;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
