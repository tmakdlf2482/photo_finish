import { useEffect, useState } from 'react'
import CommonHeader from '@/components/common/header/CommonHeader'
import Card from './components/Card'
// CSS
import styles from './styles/index.module.scss'
import { CardDTO } from '../index/types/card'
import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/dark.css'

toastConfig (
  { theme: 'dark' }
)

function index() {
  const [data, setData] = useState([]); // 로컬스토리지에 담은 데이터를 불러올 용도
  const getData = () => { // 로컬스토리지에서 불러온 데이터를 처리해주는 로직
    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark')); // JSON -> Array/Object
    
    if (getLocalStorage || getLocalStorage !== null) {
      setData(getLocalStorage);
    }
    else {
      setData([]);
    }
  };

  useEffect(() => { // 해당 페이지 로드시 딱1번 렌더링, getData() 함수를 호출
    getData();
  }, []);
  
  const deleteCard = (id: string) => {
    const updatedData = data.filter((item: CardDTO) => item.id !== id); // 로컬스토리지에 있는 id값이 사용자가 북마크 해제하려고 한 id값이랑 다를때만 updatedData에 남기고, 같으면 지운다.
    localStorage.setItem('bookmark', JSON.stringify(updatedData));
    setData(updatedData);
    toast('해당 이미지를 북마크에서 삭제하였습니다. 😊');
  };
  
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      <main className={styles.page__contents}>
        {
          // 만약 데이터가 없을 때
          data.length === 0 ?
          <div className={styles.page__contents__noData}>조회 가능한 데이터가 없습니다.</div>
          :
          data.map((item: CardDTO) => {
            return (
              <Card data={item} key={item.id} onDeleteCard={deleteCard} />
            )
          })
        }
      </main>
    </div>
  )
}

export default index