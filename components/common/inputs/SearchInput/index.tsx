import React from 'react';
import styled from '@emotion/styled';
import { useController } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  placeholder: string;
}

export const Box = styled.div`
  width: 100%;

  & input {
    width: 100%;
    padding: 12px;
    border-radius: 20px;
    font-size: 15px;
    border: 1px solid #dfdfdf;

    &:focus {
      outline: none;
    }
  }
`;

const SearchInput = ({ control, name, placeholder }: IProps) => {
  const { field } = useController({ control, name });
  return (
    <Box>
      <input {...field} placeholder={placeholder} autoFocus={true} />
    </Box>
  );
};

export default SearchInput;
