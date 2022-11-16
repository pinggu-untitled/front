import { FcGoogle } from 'react-icons/fc';
import { BsFillChatFill } from 'react-icons/bs';
import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContentZone, Main, Nav, OutlineLink, PageBase, Tap, TapZone } from './style';
import { useEffect } from 'react';
import { useSession } from '@contexts/SessionContext';

type Tap = 'login' | 'register';

const Login = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [tap, setTap] = useReducer((prev: Tap, cur: Tap): Tap => cur, 'login');

  useEffect(() => {
    if (session) navigate('/');
  }, [session]);

  return (
    <PageBase style={{ backgroundColor: '#292929' }}>
      <Nav>
        <div className={'inner'}>
          <h1 id={'logo'}>
            <Link to={'/'}>핑구</Link>
          </h1>
          <OutlineLink to={'/introduce'}>서비스 소개</OutlineLink>
        </div>
      </Nav>
      <Main>
        <TapZone>
          <Tap active={tap === 'login'} onClick={() => setTap('login')}>
            로그인
          </Tap>
          <Tap active={tap === 'register'} onClick={() => setTap('register')}>
            회원가입
          </Tap>
        </TapZone>
        <ContentZone>
          {tap === 'login' && (
            <>
              <p className={'message'}>소셜 계정으로 로그인하기</p>
              <div className={'socials'}>
                <a
                  className={'social-link'}
                  href={'http://localhost:8080/auth/login/kakao'}
                  style={{ backgroundColor: '#fee601' }}
                >
                  <BsFillChatFill style={{ color: '#3b1d1e', fontSize: '19px' }} />
                  카카오톡
                </a>
                <a
                  className={'social-link'}
                  href={'http://localhost:8080/auth/login/google'}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #dfdfdf',
                  }}
                >
                  <FcGoogle /> 구글
                </a>
              </div>
            </>
          )}
          {tap === 'register' && (
            <>
              <p className={'message'}>아직 준비되지 않은 서비스입니다.</p>
              <p aria-hidden="true" className={'message move-to-login'} onClick={() => setTap('login')}>
                👉🏻 소셜 계정으로 진행해 주세요
              </p>
            </>
          )}
        </ContentZone>
      </Main>
    </PageBase>
  );
};

export default Login;
