import * as S from './style';
import * as api from '../../api';
import React, { useState, useRef, useEffect } from 'react';
import Container from '../../components/styles/Container';
import Navbar from '../../components/common/Navbar';
import MealsSearchedList from '../../components/MealsSearch/MealsSearchedList';
import MealsBookMarkList from '../../components/MealsSearch/MealsBookMarkList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MealData } from '../../customType/meal.type';

function MealsSearch() {
  const [isSearch, setIsSearch] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [searchedResult, setSearchedResult] = useState<MealData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputValue) {
      setSearchedResult([]);
    }
  }, [inputValue]);

  function deleteInputHandler() {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function focusHandler() {
    setIsSearch(true);
  }

  function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.key === 'Enter') {
      inputSubmitHandler();
    }
  }

  function inputSubmitHandler() {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
      api.get(`/api/meal/${inputValue}`).then((res: any) => {
        setSearchedResult(res.data);
      });
    }
  }

  function moveSearchTab() {
    setIsSearch(true);
    setInputValue('');
    inputRef.current && inputRef.current.focus();
  }

  function moveBookMarkTab() {
    setIsSearch(false);
    setInputValue('');
  }

  return (
    <Container>
      <S.SearchForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <S.SearchBox>
          <span className="searchIcon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <button className="XBtn" onClick={deleteInputHandler}>
            X
          </button>
          <S.SearchInput
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={onChangeInputHandler}
            onFocus={focusHandler}
            // onKeyPress={onKeyPressHandler}
          ></S.SearchInput>
        </S.SearchBox>
        <S.SearchBtn onClick={() => inputSubmitHandler()}>검색</S.SearchBtn>
      </S.SearchForm>
      <S.ButtonContainer>
        <S.SearchTabBtn isSearch={isSearch} onClick={moveSearchTab}>
          검색
        </S.SearchTabBtn>
        <S.BookMarkTabBtn isSearch={isSearch} onClick={moveBookMarkTab}>
          즐겨찾기
        </S.BookMarkTabBtn>
      </S.ButtonContainer>
      {isSearch ? (
        <MealsSearchedList
          inputValue={inputValue}
          result={searchedResult}
        ></MealsSearchedList>
      ) : (
        <MealsBookMarkList></MealsBookMarkList>
      )}
      <Navbar />
    </Container>
  );
}

export default MealsSearch;
