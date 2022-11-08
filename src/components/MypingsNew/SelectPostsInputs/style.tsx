import styled from '@emotion/styled';

export const Select = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  > .label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  > .select-container {
    border: 1px solid #dfdfdf;
    border-radius: 4px;

    & .select-button {
      padding: 12px;
      font-size: 13px;
      color: gray;
      cursor: pointer;
      position: relative;
    }

    & .select-button:not(:first-of-type) {
      border-top: 1px solid #dfdfdf;
    }

    & .icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-38%);
      font-size: 22px;
      color: gray;
    }
  }
`;
