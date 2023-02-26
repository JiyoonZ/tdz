// dependencies
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// components
import Container from 'components/styles/Container';
import { ScrollContainer } from 'components/styles/ScrollContainer';
// hooks
import { useAppDispatch, useAppSelector } from 'hooks';
// styles
import * as S from './style';
import { getUsersInfoAsync } from 'slices/usersInfoSlice';

function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin, is_login_first } = useAppSelector(
    ({ usersInfo }) => usersInfo.value,
  );

  useEffect(() => {
    if (isLogin && is_login_first === 'true') {
      navigate('/mypage/goal_step1');
    } else if (isLogin) {
      navigate('/home');
    }
  }, [is_login_first, isLogin]);

  useEffect(() => {
    const checkSocial = async () => {
      if (
        window.location.hash &&
        window.location.hash.slice(1).includes('social=true')
      ) {
        localStorage.setItem('login', 'true');
        await dispatch(getUsersInfoAsync());
      }
    };
    checkSocial();
  }, []);
  return (
    <Container>
      <ScrollContainer minusHeight={0}>
        <div style={{ margin: 'auto' }}>
          <S.ImgContainer>
            <S.ImgBox src={require('../../assets/main3.png')} />
          </S.ImgContainer>
          <S.MainContainer className="confirm">
            <S.LogoText>
              <img src={require('../../assets/logoWhite2.png')} />
            </S.LogoText>
            <S.IntroText>오늘 하루, 무엇을 드셨나요?</S.IntroText>
            <S.IntroText>매일의 식단을 기록해보세요!</S.IntroText>
            <S.IntroText>당신의 건강이 달라집니다!</S.IntroText>
            <S.LoginContainer>
              {/* <S.Link
                href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=77524d6f60c947c98230e8d0d6c54eb4&redirect_uri=${process.env.REACT_APP_BASE_URL}/api/auth/kakao/callback`}
              >
                <S.LoginBox brand={'카카오'}>
                  <span className="icon">
                    <img
                      className="kakaoLogo"
                      src={require('../../assets/kakaoIcon.png')}
                    />
                  </span>
                  <p>카카오로 시작하기</p>
                </S.LoginBox>
              </S.Link> */}
              <S.LoginBox
                brand="TDZ"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                <span className="icon">
                  {/* <FontAwesomeIcon icon={faEnvelope} className="email" /> */}
                  <img
                    className="tdzLogo"
                    src={require('../../assets/favicon.png')}
                  />
                </span>
                <p>TDZ로 시작하기</p>
              </S.LoginBox>
            </S.LoginContainer>
          </S.MainContainer>
        </div>
      </ScrollContainer>
    </Container>
  );
}

export default Main;
