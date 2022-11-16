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

  & input {
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    padding: 12px;
    font-size: 15px;

    &:focus {
      outline: none;
    }
  }

  & textarea {
    padding: 12px;
    min-height: 200px;
    font-size: 15px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    resize: none;
    font-family: inherit;
    &:focus {
      outline: none;
    }
  }
`;

export const PostInputList = styled.ul`
  border-top: 1px solid #dfdfdf;
  padding: 0 10px;
  overflow: scroll;
  max-height: 400px;
  overflow: scroll;

  > label:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`;
