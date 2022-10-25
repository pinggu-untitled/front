import React, { useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import SearchInput from '@components/common/inputs/SearchInput';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import axios from 'axios';
import FixedHeader from '@components/common/headers/FixedHeader';
import { useMap } from '@contexts/MapContext';

export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

interface IForm {
  query: string | (string | null)[] | null;
}

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search).search_query;

  const { control, handleSubmit } = useForm<IForm>({ defaultValues: { query } });
  const [search, setSearch] = useState(queryString.parse(location.search)['search_query']);
  const { moveCenterToMe } = useMap();
  // const { data: userData, mutate: mutateUserData } = useSWR('/users/me', fetcher);
  // const { data: resultsData, mutate: mutateResultsData } = useSWR<IResult | [] | null>(
  //   userData ? `/results?search_query=${query}).search_query}` : null,
  //   fetcher,
  // );
  moveCenterToMe();

  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
    setSearch(data.query);
    navigate(`/results?search_query=${data.query}`);
  }, []);

  useEffect(() => {
    axios
      .get(`/results?search_query=${search}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .then((err) => console.error(err));
  }, [search]);

  return (
    <Base>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FixedHeader>
          <SearchInput control={control} name={'query'} placeholder={'검색'} />
          <input type={'submit'} hidden />
        </FixedHeader>
        <MainContentZone>검색 결과...</MainContentZone>
      </Form>
    </Base>
  );
};

export default Explore;
