import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { imageData } from '@/recoil/selectors/imageSelector';
import { pageState } from '@/recoil/atoms/pageState';
import styles from './CommonFooter.module.scss'
import { searchState } from '@/recoil/atoms/searchState';

function CommonFooter() {
  // const images = useRecoilValue(imageData);
  const imgSelector = useRecoilValueLoadable(imageData);
  const search = useRecoilValue(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 예를 들어, Korea에서 10페이지를 보고 있다가 Japan을 검색했을때 다시 1페이지로 가게끔
    setStep(0); // search값이 바뀌면, setStep을 0으로 할당
  }, [search]);

  // console.log(imgSelector);
  // console.log('---------');
  // console.log(imgSelector.contents);

  // 페이지 리스트 UI 생성
  const newArr: number[] = new Array();
  for (let i = 1; i <= imgSelector.contents.total_pages; i++) {
    // 이 작업은 1페이지부터 끝페이지까지 숫자를 newArr에 하나하나씩 넣는 과정
    // 만약 334페이지가 끝이라면, [1, 2, 3, 4, ..., 334] 이런식
    newArr.push(i);
  }

  // console.log(newArr);
  // console.log(newArr.length);

  const length = newArr.length; // newArr.length는 total_pages, 334라 가정
  const divide = Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0); // Math.floor(length / 10)는 33, (Math.floor(length%10) > 0 ? 1 : 0)는 1

  const res = [];
  for (let i = 0; i <= divide; i++) { // divide는 34, 35번 반복
    // 배열 0번째 인덱스부터 10개씩 잘라 새 배열에 넣기
    res.push(newArr.splice(0, 10));
  }
  // console.log(res);

  // ---------------------------------------------------------- //

  const moveToPage = (selected: number) => {
    setPage(selected);
  };

  // console.log(step);

  // 이전버튼
  const moveToPrev = () => {
    if (step === 0) { // 1 ~ 10페이지에 해당
      return;
    }
    else { // 11페이지 이상에 해당
      setStep(step - 1);
      setPage(res[step - 1][0]);
    }
  };

  // 다음버튼
  const moveToNext = () => {
    if (res[step].length % 10 == 0) { // 원래 코드는 if (step < res[step].length - 2)
      setStep(step + 1);
      setPage(res[step + 1][0]);
    }
    else {
      return;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src="/photo/assets/icons/icon-arrowLeft.svg" alt="" />
        </button>
        {/* 변경될 UI 부분 */}
        {/* <span>1</span> */}
        {res[step] && // res[0]이면 1~10페이지, res[1]이면 11~20페이지, ...
          res[step].map((item: number, index: number) => {
            if (item < 11) { // 1~10페이지
              return (
                <button className={index === page - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={() => moveToPage(item)}>
                  {item}
                </button>
              )
            }
            else { // 11~20페이지, 21~30페이지, ...
              return (
                <button className={index === page - 1 - step * 10 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={() => moveToPage(item)}>
                  {item}
                </button>
              )
            }
          })
        }
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src="/photo/assets/icons/icon-arrowRight.svg" alt="" />
        </button>
      </div>
    </footer>
  )
}

export default CommonFooter