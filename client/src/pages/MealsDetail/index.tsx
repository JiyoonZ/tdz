import { useState, useEffect, useRef } from 'react';
import * as S from './style';
import Container from '../../components/styles/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/common/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../../api';
import { addMeals } from '../../slices/mealsSlice';
import { useAppDispatch } from '../../hooks';
import { MealData, MealInfo } from '../../customType/meal.type';

function MealsDetail() {
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState('quantity');
  const [foodInfo, setFoodInfo] = useState<MealData>();
  const [firstInfo, setFirstInfo] = useState<MealData>();
  const [isBookMark, setIsBookMark] = useState<boolean>();

  const navigate = useNavigate();
  const params = useParams();
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const responseRef = useRef<MealData>();

  //DB에서 음식 정보 받아오기
  useEffect(() => {
    (async () => {
      const res = await api.get(`/api/meal/${params.name}`);
      console.log(res?.data[0]);
      setFoodInfo(res?.data[0]);
      setFirstInfo(res?.data[0]);
      responseRef.current = res?.data[0];
      if (responseRef.current) {
        const bookMark = await api.get(
          `/api/favorites/${responseRef.current._id}`,
        );
        if (!bookMark) {
          setIsBookMark(false);
          console.log('마킹상태F');
        } else {
          setIsBookMark(true);
          console.log('마킹상태T');
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (responseRef.current) {
        const bookMark = await api.get(
          `/api/favorites/${responseRef.current._id}`,
        );
        if (!bookMark) {
          setIsBookMark(false);
          console.log('마킹상태F');
        } else {
          setIsBookMark(true);
          console.log('마킹상태T');
        }
      }
    })();
  }, [isBookMark]);

  function calcInfo(info: MealInfo) {
    if (firstInfo) {
      info.kcal = Number((firstInfo?.kcal * count).toFixed(2));
      info.carb = Number((firstInfo?.carb * count).toFixed(2));
      info.protein = Number((firstInfo?.protein * count).toFixed(2));
      info.fat = Number((firstInfo?.fat * count).toFixed(2));
      info.natruim = Number((firstInfo?.natruim * count).toFixed(2));
      info.cholesterol = Number((firstInfo?.cholesterol * count).toFixed(2));
      info.transfat = Number((firstInfo?.transfat * count).toFixed(2));
      info.saturatedfatty = Number(
        (firstInfo?.saturatedfatty * count).toFixed(2),
      );
      info.quantity = count;
      info.totalGram = Math.floor(firstInfo?.servingSize * count);
    }
    return info;
  }

  function calcInfoByGram(info: MealInfo) {
    if (firstInfo) {
      const nutrientInfoPerGram = { ...firstInfo };
      nutrientInfoPerGram.kcal = Number(
        firstInfo?.kcal / firstInfo?.servingSize,
      );
      nutrientInfoPerGram.carb = Number(
        firstInfo?.carb / firstInfo?.servingSize,
      );
      nutrientInfoPerGram.protein = Number(
        firstInfo?.protein / firstInfo?.servingSize,
      );
      nutrientInfoPerGram.fat = Number(firstInfo?.fat / firstInfo?.servingSize);
      nutrientInfoPerGram.natruim = Number(
        firstInfo?.natruim / firstInfo?.servingSize,
      );
      nutrientInfoPerGram.transfat = Number(
        firstInfo?.transfat / firstInfo?.servingSize,
      );
      nutrientInfoPerGram.saturatedfatty = Number(
        firstInfo?.saturatedfatty / firstInfo?.servingSize,
      );

      info.kcal = Number((nutrientInfoPerGram.kcal * count).toFixed(2));
      info.carb = Number((nutrientInfoPerGram.carb * count).toFixed(2));
      info.protein = Number((nutrientInfoPerGram.protein * count).toFixed(2));
      info.fat = Number((nutrientInfoPerGram.fat * count).toFixed(2));
      info.natruim = Number((nutrientInfoPerGram.natruim * count).toFixed(2));
      info.transfat = Number((nutrientInfoPerGram.transfat * count).toFixed(2));
      info.saturatedfatty = Number(
        (nutrientInfoPerGram.saturatedfatty * count).toFixed(2),
      );
      info.quantity = Number((count / firstInfo?.servingSize).toFixed(1));
      info.totalGram = count;
      return info;
    }
  }

  useEffect(() => {
    if (selected === 'quantity') {
      setFoodInfo((cur: any): any => {
        const newObj = { ...cur };
        return calcInfo(newObj);
      });
    } else {
      setFoodInfo((cur: any): any => {
        const newObj = { ...cur };
        return calcInfoByGram(newObj);
      });
    }
  }, [count]);

  useEffect(() => {
    if (selected === 'quantity') {
      setCount(1);
    } else {
      if (firstInfo) {
        setCount(firstInfo?.servingSize);
      }
    }
  }, [selected]);

  function plusHandler() {
    setCount((cur) => cur + 1);
  }

  function minusHandler() {
    if (count !== 1) {
      setCount((cur) => cur - 1);
    }
  }

  function markingHandler(id: string) {
    if (isBookMark) {
      //즐겨찾기 delete요청
      api.delete(`/api/favorites/${id}`).then((res) => {
        setIsBookMark(false);
      });
    } else {
      //즐겨찾기 post 요청
      api
        .post('/api/favorites', { meal_id: id })
        .then((res) => setIsBookMark(true));
    }
  }

  return (
    <Container>
      <S.MealsContainer>
        <S.MealsInfoBox>
          <S.IconBox>
            <div
              className="arrow-icon"
              onClick={() => {
                navigate('/meals/search');
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div
              className="star-icon"
              onClick={() => {
                if (foodInfo) markingHandler(foodInfo?._id);
              }}
            >
              {isBookMark ? (
                <img src={require('../../assets/YellowStar.png')}></img>
              ) : (
                <img src={require('../../assets/blackStar.png')}></img>
              )}
            </div>
          </S.IconBox>
          <S.Title>{foodInfo?.name}</S.Title>
          <S.MainNutrientBox>
            <div className="info-text">
              <p>칼로리</p>
              <p>{foodInfo?.kcal}kcal</p>
            </div>
            <div className="info-text">
              <p>탄수화물</p>
              <p>{foodInfo?.carb}g</p>
            </div>
            <div className="info-text">
              <p>단백질</p>
              <p>{foodInfo?.protein}g</p>
            </div>
            <div className="info-text">
              <p>지방</p>
              <p>{foodInfo?.fat}g</p>
            </div>
          </S.MainNutrientBox>
          <S.SubNutrientBox>
            <div className="sub-content">
              <p>나트륨</p>
              <p>{foodInfo?.natruim}mg</p>
            </div>
            <div className="sub-content">
              <p>콜레스테롤</p>
              <p>{foodInfo?.cholesterol}mg</p>
            </div>

            <div className="sub-content">
              <p>트랜스지방</p>
              <p>{foodInfo?.transfat}g</p>
            </div>
            <div className="sub-content">
              <p>포화지방</p>
              <p>{foodInfo?.saturatedfatty}g</p>
            </div>
          </S.SubNutrientBox>
          <S.SelectBox>
            <select
              ref={selectRef}
              onChange={() => {
                if (selectRef.current) {
                  setSelected(selectRef.current.value);
                }
              }}
            >
              <option value="quantity">1개 ({foodInfo?.servingSize}g)</option>
              <option value="gram">g</option>
            </select>
            <div className="countBtnBox">
              <button onClick={minusHandler}>-</button>
              <input
                type="number"
                value={count}
                onChange={(e) => {
                  setCount(parseInt(e.target.value));
                }}
              ></input>
              <button onClick={plusHandler}>+</button>
            </div>
          </S.SelectBox>
          <S.AddBtn
            onClick={() => {
              foodInfo && dispatch(addMeals(foodInfo));
              navigate('/meals/cart');
            }}
          >
            식단 추가
          </S.AddBtn>
        </S.MealsInfoBox>
      </S.MealsContainer>
      <Navbar />
    </Container>
  );
}

export default MealsDetail;
