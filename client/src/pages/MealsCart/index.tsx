import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Navbar from '../../components/common/Navbar';
import MealsCartModal from '../../components/MealsCart/MealsCartModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TDZInfo from '../../components/MealsCart/TDZInfo';
import MealsCartList from '../../components/MealsCart/MealsCartList';
import { useAppSelector } from '../../hooks';
import * as api from '../../api';
import Container from '../../components/styles/Container';

interface GetMealDataObj {
  code: string;
  name: string;
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
  natruim: number;
  cholesterol: number;
  transfat: number;
  saturatedfatty: number;
  servingSize: number;
  quantity?: number;
}

function MealsCart() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const result = useAppSelector(({ meal }) => meal.value);
  console.log('밖', result);

  function clickHandler() {
    setOpenModal(true);
  }

  return (
    <Container>
      {openModal && <MealsCartModal setOpenModal={setOpenModal} />}

      <S.NutrientInfoContainer>
        <S.IconBox>
          <div className="arrow-icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </S.IconBox>
        <S.TotalKcalBox>
          <h1>총 칼로리</h1>
          kcal
        </S.TotalKcalBox>
        <S.TdzBox>
          <TDZInfo nutrient={'탄수화물'} gram={400} />
          <TDZInfo nutrient={'단백질'} gram={200} />
          <TDZInfo nutrient={'지방'} gram={300} />
        </S.TdzBox>
      </S.NutrientInfoContainer>

      <S.MealsListContainer>
        {result.map((el) => {
          return (
            <MealsCartList
              key={el.code}
              name={el.name}
              quantity={el.quantity}
              totalGram={el.totalGram}
              code={el.code}
            ></MealsCartList>
          );
        })}
      </S.MealsListContainer>

      <S.BtnContainer>
        <S.AddMealsBtn
          onClick={() => {
            navigate('/meals/search');
          }}
        >
          음식 추가
        </S.AddMealsBtn>

        <S.RecordBtn onClick={clickHandler}>기록 하기</S.RecordBtn>
      </S.BtnContainer>
      <Navbar />
    </Container>
  );
}

export default MealsCart;
