import { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { ActionButton } from '@components/headers/PageMainHeader/style';
import { SlArrowLeft } from 'react-icons/sl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CardList from '@components/Home/CardList';
import UserCard from '@components/Explore/UserCard';
import { PageMain } from '@pages/Home/style';
import { useSession } from '@contexts/SessionContext';
import { IUser, IPost, IMyPings } from '@typings/db';
import EmptyMessage from '@components/Profile/EmptyMessage';
import PostCard from '@components/Home/PostCard';
import ProfileMypingsCard from '@components/Profile/cards/ProfileMypingsCard';
import { FaLeaf } from 'react-icons/fa';
export const Header = styled.header`
  position: fixed;
  left: 73px;
  height: 70px;
  width: 440px;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-right: 1px solid #dfdfdf;

  > h2 {
    font-size: 18px;
  }
`;

export const Form = styled.form`
  width: calc(100% - 40px - 10px);
  border-radius: 20px;
  border: 1px solid #dfdfdf;
  display: flex;
  overflow: hidden;

  > input[type='text'] {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  > select {
    font-size: 12px;
    border: none;
    border: none;
    border-right: 1px solid #dfdfdf;
    text-align: center;
    appearance: none;
    padding: 10px 10px 10px 12px;
    cursor: pointer;
    color: gray;
    &:focus {
      outline: none;
    }
  }
`;

export const Message = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: gray;
  margin: 30px 0 10px;

  > .highlight {
    font-weight: 800;
  }
`;

const Explore = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const filterRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // const clearParams = () => {
  //   searchParams.delete('search_query');
  //   searchParams.delete('filter');
  //   setSearchParams(searchParams);
  // };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (filterRef && searchRef) {
      const filterValue = filterRef.current?.value;
      const searchValue = searchRef.current?.value;
      axios.get(`/results?filter=${filterValue}&search_query=${searchValue}`).then((res) => {
        setResults(res.data);
      });
      if (filterValue === 'post') {
        navigate(`/explore?filter=${filterValue}&keyword=${searchValue}`);
      }
    }
    // if (!search) return false;
    // axios.get(`/results?${searchParams.toString()}`).then((res) => {
    //   setResults(res.data);
    // });
  };

  const CATE = useMemo(
    () => [
      { label: '?????????', value: 'post' },
      { label: '????????????', value: 'mypings' },
      { label: '?????????', value: 'user' },
      { label: '????????????', value: 'hashtag' },
    ],
    [],
  );

  // useEffect(() => {
  //   if (!ref.current?.value) ref.current?.focus();
  // }, [search]);

  // const onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFilter(e.target.value);
  //   searchParams.set('filter', e.target.value);
  //   setSearchParams(searchParams);
  // };

  // useEffect(() => {
  //   if (!ref.current?.value) ref.current?.focus();
  // }, [search]);

  // useEffect(() => {
  //   searchParams.set('filter', CATE[0].value);
  // }, [CATE]);

  console.log(results);

  return (
    <>
      <Header>
        <ActionButton onClick={() => navigate(-1)}>
          <SlArrowLeft style={{ fontSize: '18px' }} />
        </ActionButton>
        <Form onSubmit={onSubmit}>
          <select ref={filterRef}>
            {CATE.map((cate, i) => (
              <option key={i} value={cate.value} label={cate.label} />
            ))}
          </select>
          <input ref={searchRef} type={'text'} placeholder={'??????'} />
          <input type={'submit'} hidden />
        </Form>
      </Header>
      <PageMain>
        <CardList>
          {Object.entries(results).map(([key, values], i) => {
            if (!values.length)
              return (
                <EmptyMessage
                  key={i}
                  style={{ top: '50px', alignItems: 'start' }}
                  message={`${search}??? ?????? ?????? ????????? ????????????.`}
                />
              );
            return (
              <Message key={i}>
                <span className="highlight">{search}</span>??? ?????? ?????? ?????? ( {values.length} )
              </Message>
            );
          })}
          {Object.entries(results).map(([key, values], i) => {
            if (!values.length) return false;
            else if (key === 'user') return values.map((value) => <UserCard key={value.id} data={value} />);
            else if (key === 'post') return values.map((value) => <PostCard key={value.id} data={value} />);
            else if (key === 'mypings')
              return values.map((value) => <ProfileMypingsCard key={value.id} data={value} />);
          })}
        </CardList>
      </PageMain>
    </>
  );
};

export default Explore;
