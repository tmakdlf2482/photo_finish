import { useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { imageData } from '@/recoil/selectors/imageSelector'
import CommonHeader from '@components/common/header/CommonHeader'
import CommonSearchBar from '@components/common/searchBar/CommonSearchBar'
import CommonNav from '@components/common/navigation/CommonNav'
import CommonFooter from '@components/common/footer/CommonFooter'
import Card from './components/Card'
import DetailDialog from '@components/common/dialog/DetailDialog'
import Loading from './components/Loading'
// CSS
import styles from './styles/index.module.scss'
import { CardDTO } from './types/card'

function index() {
  // const imgSelector = useRecoilValue(imageData);
  const imgSelector = useRecoilValueLoadable(imageData); // useRecoilValueLoadable를 사용하면 로딩 처리 가능
  const [imgData, setImgData] = useState<CardDTO>();
  const [open, setOpen] = useState<boolean>(false); // 이미지 상세 다이얼로그 발생(관리) state

  // const CARD_LIST = imgSelector.map( (card: CardDTO) => {
  //   return (
  //     <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
  //   )
  // });
  const CARD_LIST = useMemo(() => {
    // console.log(imgSelector);
    // console.log(imgSelector.contents);

    // imgSelector.state 는 'hasValue' 또는 'loading' 또는 'hasError' 의 값을 가짐
    if (imgSelector.state === 'hasValue') {
      const result = imgSelector.contents.results.map((card: CardDTO) => {
        return (
          <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
        )
      });

      return result;
    }
    else {
      return <Loading />
    }
  }, [imgSelector]);

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br />
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* 검색창 UI 부분 */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
      </div>
      {/* 공통 푸터 UI 부분 */}
      <CommonFooter />
      {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
    </div>
  )
}

export default index