import styled from '@emotion/styled';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  > .label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  > input,
  select {
    width: 100%;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    padding: 12px;
    appearance: none;
    font-weight: 600;
    &:focus {
      outline: none;
    }
  }

  & .icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-38%);
    font-size: 22px;
    color: gray;
  }
`;
