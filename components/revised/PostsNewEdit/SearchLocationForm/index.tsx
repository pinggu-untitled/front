import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import SearchInput from '@components/common/inputs/SearchInput';

export const Form = styled.form``;

interface IForm {
  location: string;
}

const SearchLocationForm = () => {
  const { control } = useForm<IForm>({ defaultValues: { location: '' } });
  return (
    <Form>
      <SearchInput control={control} name={'location'} placeholder={'위치 검색'} />
    </Form>
  );
};

export default SearchLocationForm;
