import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '@components/common/inputs/SearchInput';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IHistory, IResult } from '@typings/db';
import SearchList from '@components/common/navigations/TopNavigation/SearchFormModal/SearchList';
import SearchPill from '@components/common/navigations/TopNavigation/SearchFormModal/SearchList/SearchPill';
import { Section } from '@components/common/navigations/TopNavigation/SearchFormModal';
export const Base = styled.div`
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Header = styled.header`
  width: 440px;
  height: 73px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
`;

export const MainContentZone = styled.div`
  position: absolute;
  width: 440px;
  top: 73px;
  bottom: 0;
`;

export const SectionWrapper = styled.div`
  padding: 20px;
`;

interface IForm {
  query: string | (string | null)[] | null;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search).search_query;
  const { data: userData, mutate: mutateUserData } = useSWR('/users/me', fetcher);
  // const { data: resultsData, mutate: mutateResultsData } = useSWR<IResult | [] | null>(
  //   userData ? `/results?search_query=${query}).search_query}` : null,
  //   fetcher,
  // );
  // const { data: popularData, mutate: mutatePopularData } = useSWR<IHistory[] | [] | null>(
  //   userData ? '/search_histories/popular' : null,
  //   fetcher,
  // );
  //
  // const { data: queryRelatedData, mutate: mutateQueryRelatedData } = useSWR<IHistory[] | [] | null>(
  //   userData ? `/search_histories/related/${query}` : null,
  //   fetcher,
  // );

  const { control, handleSubmit, setValue } = useForm<IForm>({ defaultValues: { query } });

  const mutateHandler = () => {
    mutateUserData();
    // mutatePopularData();
    // mutateQueryRelatedData();
  };

  const onClick = useCallback((data: IHistory) => {
    setValue('query', data.content);
    onSubmit();
  }, []);

  const onSubmit = handleSubmit(
    useCallback((data: IForm) => {
      axios
        .post('/search_histories', data)
        .then((res) => {
          console.log(res.data);
          navigate(`/results?search_query=${data.query}`);
          mutateHandler();
        })
        .catch((err) => console.error(err.message));
    }, []),
  );

  return (
    <Base>
      <Form onSubmit={onSubmit}>
        <Header>
          <SearchInput control={control} name={'query'} placeholder={'검색'} />
          <input type={'submit'} hidden />
        </Header>
        <MainContentZone>
          <SectionWrapper>
            <Section>
              <div className={'header'}>
                <span className={'title'}>연관 검색어</span>
              </div>
              <SearchList>
                {/*{queryRelatedData?.map((data) => (*/}
                {/*  <SearchPill key={`${data.id}-${data.content}`} data={data} onClick={onClick} />*/}
                {/*))}*/}
              </SearchList>
            </Section>
          </SectionWrapper>
          {query}에 대한 검색 결과가 나와야 하는 곳
        </MainContentZone>
      </Form>
    </Base>
  );
};

export default Results;
