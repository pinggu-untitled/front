import React, { CSSProperties, useCallback, useMemo } from 'react';
import FullScreenModal from '@components/common/modals/FullScreenModal';
import styled from '@emotion/styled';
import PreviousButton from '@components/common/buttons/PreviousButton';
import SearchInput from '@components/common/inputs/SearchInput';
import { useForm } from 'react-hook-form';
import SearchList from './SearchList';
import SearchPill from './SearchList/SearchPill';
import { IHistory } from '@typings/db';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PrevButtonHeader from '@components/common/headers/PrevButtonHeader';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  style?: CSSProperties;
}

export const ModalContent = styled.div`
  position: absolute;
  width: 440px;
  border-right: 1px solid #dfdfdf;
  overflow: hidden;
  top: 0;
  left: 68px;
  bottom: 0;
  background-color: #fff;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  background-color: #fff;

  & .input-wrapper {
    width: calc(100% - 50px);
  }
`;

export const Main = styled.div`
  padding: 20px;
  margin-top: 73px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  & .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
    & .title {
      font-size: 15px;
      font-weight: 600;
    }

    & .delete-all {
      font-size: 13px;
      color: gray;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

interface IForm {
  query: string;
}
const SearchFormModal = ({ show, onCloseModal, style }: IProps) => {
  const navigate = useNavigate();
  // const { data: userData, mutate: mutateUserData } = useSWR('/users/me', fetcher);
  // const { data: historyData, mutate: mutateHistoryData } = useSWR<IHistory[] | [] | null>(
  //   userData ? '/search_histories' : null,
  //   fetcher,
  // );
  // const { data: popularData, mutate: mutatePopularData } = useSWR<IHistory[] | [] | null>(
  //   userData ? '/search_histories/popular' : null,
  //   fetcher,
  // );

  const mutateHandler = () => {
    // mutateUserData();
    // mutateHistoryData();
    // mutatePopularData();
  };

  const { control, handleSubmit, setValue, reset } = useForm<{ query: string }>({ defaultValues: { query: '' } });
  const onSubmit = handleSubmit(
    useCallback((data: IForm) => {
      axios
        .post('/search_histories', data)
        .then((res) => {
          console.log(res.data);
          navigate(`/results?search_query=${data.query}`);
          mutateHandler();
          reset();
        })
        .catch((err) => console.error(err.message));
    }, []),
  );

  const onClick = useCallback((data: IHistory) => {
    setValue('query', data.content);
    onSubmit();
  }, []);

  const onDelete = useCallback((id: number) => {
    console.log(id);
    axios
      .delete(`/search_histories/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        mutateHandler();
      })
      .catch((err) => console.error(err));
  }, []);

  const onDeleteAll = useCallback(() => {
    axios
      .delete(`/search_histories`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        mutateHandler();
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <FullScreenModal show={show}>
      <ModalContent style={style}>
        <Form onSubmit={onSubmit}>
          <PrevButtonHeader onClick={onCloseModal}>
            <div className={'input-wrapper'}>
              <SearchInput control={control} name={'query'} placeholder={'검색'} />
            </div>
            <input type={'submit'} hidden />
          </PrevButtonHeader>
          {/*<Header>*/}
          {/*  <PreviousButton onClick={onCloseModal} />*/}
          {/*  <div className={'input-wrapper'}>*/}
          {/*    <SearchInput control={control} name={'query'} placeholder={'검색'} />*/}
          {/*  </div>*/}
          {/*  <input type={'submit'} hidden />*/}
          {/*</Header>*/}
          <Main>
            <Section>
              <div className={'header'}>
                <span className={'title'}>최근 검색어</span>
                {/*{historyData && historyData?.length > 0 && (*/}
                {/*  <span className={'delete-all'} onClick={onDeleteAll}>*/}
                {/*    모두 지우기*/}
                {/*  </span>*/}
                {/*)}*/}
              </div>
              <SearchList>
                {/*{historyData?.map((data) => (*/}
                {/*  <SearchPill key={`${data.id}-${data.content}`} data={data} onClick={onClick} onDelete={onDelete} />*/}
                {/*))}*/}
              </SearchList>
            </Section>
            <Section>
              <div className={'header'}>
                <span className={'title'}>인기 검색어</span>
              </div>
              <SearchList>
                {/*{popularData?.map((data) => (*/}
                {/*  <SearchPill key={`${data.id}-${data.content}`} data={data} onClick={onClick} />*/}
                {/*))}*/}
              </SearchList>
            </Section>
            {/*<AutoComplete />*/}
          </Main>
        </Form>
      </ModalContent>
    </FullScreenModal>
  );
};

export default SearchFormModal;
