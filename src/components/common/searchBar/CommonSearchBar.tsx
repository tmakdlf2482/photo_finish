import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/atoms/searchState';
import { pageState } from '@/recoil/atoms/pageState';
import styles from './CommonSearchBar.module.scss'

function CommonSearchBar() {
  const [text, setText] = useState('');
  const [, setSearch] = useRecoilState(searchState);
  const [, setPage] = useRecoilState(pageState);

  // console.log(search);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (text === '') {
        // input 태그 안에 빈 값을 검색하고 엔터키를 눌렀을 때
        // defalut 값이 Korea 이기 때문에 (recoil atoms에 searchState파일)
        setSearch('Korea');
        setPage(1);
      }
      else {
        setSearch(text); // 작성한 입력값 할당
        setPage(1);
      }
    }
  }

  const onSearch = () => {
    if (text === '') {
      // input 태그 안에 빈 값을 검색하고 엔터키를 눌렀을 때
      // defalut 값이 Korea 이기 때문에 (recoil atoms에 searchState파일)
      setSearch('Korea');
      setPage(1);
    }
    else {
      setSearch(text); // 작성한 입력값 할당
      setPage(1);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input type="text" placeholder='찾으실 이미지를 검색하세요.' className={styles.searchBar__search__input} onChange={onChange} onKeyDown={handleKeyDown} />
        {/* 엔터키를 눌렀을 때도 동작하게 */}
        <img src="/photo/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
      </div>
    </div>
  )
}

export default CommonSearchBar