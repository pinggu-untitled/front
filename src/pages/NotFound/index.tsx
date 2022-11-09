import { OutlineLink, PageBase } from '../Login/style';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Message = styled.div`
  padding: 0 20px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #191919;

  > h1 {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 40px;
  }

  > p {
    font-size: 15px;
    margin-top: 10px;

    > a {
      color: #0b67cf;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  > button {
    margin-top: 30px;
    //padding: 20px 130px;
    font-size: 16px;
    border: none;
  }
`;

const NotFound = () => {
  return (
    <PageBase>
      <Message>
        <h1>페이지를 찾을 수 없습니다!</h1>
        <p>입력한 주소가 맞는지 다시 한 번 확인해주세요.</p>
        <p>
          도움이 필요하시면 <Link to={'/customer'}>문의하기</Link> 에 글을
          남겨주세요.
        </p>
        <Link to={'/'} style={{ marginTop: '30px', display: 'inline-block' }}>
          홈으로 돌아가기
        </Link>
      </Message>
    </PageBase>
  );
};

export default NotFound;
