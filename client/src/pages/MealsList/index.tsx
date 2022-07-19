import { useState, useEffect } from 'react';
import { getMealsDataAsync } from '../../slices/mealsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import DateNavigation from '../../components/common/DateNavigation';
import Logo from '../../components/common/Logo';
import Navbar from '../../components/common/Navbar';
import Container from '../../components/styles/Container';
import MealsListAddBox from '../../components/MealsList/MealsListAddBox';
import MealsListDeleteModal from '../../components/MealsList/MealsListDeleteModal';
import MealsListBox from '../../components/MealsList';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

function MealsList() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentDate = useAppSelector((state) => state.date.value);
  const meals = useAppSelector((state) => state.meal);
  const { isLogin, is_login_first } = useAppSelector(
    ({ usersInfo }) => usersInfo.value,
  );

  useEffect(() => {
    dispatch(getMealsDataAsync(currentDate));
  }, []);
  useEffect(() => {
    if (isLogin && is_login_first === 'true') {
      navigate('/mypage/goal_step1');
    } else if (!isLogin) {
      navigate('/');
    }
  }, []);
  console.log(meals);
  const mealsList = meals.value[0];
  return (
    <Container>
      <Logo />
      <DateNavigation />
      <S.MealsListContainerBox>
        {openModal && <MealsListDeleteModal setOpenModal={setOpenModal} />}
        <MealsListBox
          time={'점심'}
          calorie={300}
          foods={['신라면', '단무지', '군만두']}
          nutrientGram={[300, 100, 200]}
        />
      </S.MealsListContainerBox>
      <MealsListAddBox />
      <Navbar />
    </Container>
  );
}

export default MealsList;
