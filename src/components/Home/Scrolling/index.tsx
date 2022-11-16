import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { List } from '@components/Home/CardList/style';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IPost } from '@typings/db';
import styled from '@emotion/styled';

interface IProps {
  children: ReactNode;
  setSize: (f: (size: number) => number) => Promise<IPost[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
}

const Ul = styled.div`
  padding: 0 12px;
  width: 100%;
  // height: 100%;
  & li {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const Scrolling = ({ children, setSize, isEmpty, isReachingEnd }: IProps) => {
  const scrollRef = useRef<any>(null);

  // const onScroll = (values: any) => {
  //   console.log(
  //     window.scrollY,
  //     values.scrollTop,
  //     document.documentElement.clientHeight,
  //     document.documentElement.scrollHeight,
  //     values.scrollHeight,
  //   );
  //   if (values.scrollTop + document.documentElement.clientHeight > values.scrollHeight - 300) {
  //     if (!isReachingEnd) {
  //       setSize((p) => p + 1);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
  //   if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
  //     if (!isReachingEnd) {
  //       setSize((p) => p + 1);
  //     }
  //   }
  // }, []);

  return (
    <Ul>
      {/*<Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>*/}
      {children}
      {/*</Scrollbars>*/}
    </Ul>
  );
};

export default Scrolling;
