import { CardDTO } from '@/pages/index/types/card'
import styles from './Card.module.scss'
// import toast, { toastConfig } from 'react-simple-toasts'
// import 'react-simple-toasts/dist/theme/dark.css'

// toastConfig (
//   { theme: 'dark' }
// )

interface Props {
  data: CardDTO
  onDeleteCard: (id: string) => void;
}

// const deleteCard = (data: CardDTO) => {
//   const getLocalStorage = JSON.parse(localStorage.getItem('bookmark')); // JSON -> Array/Object
//   const res = getLocalStorage.filter((item: CardDTO) => item.id !== data.id); // 로컬스토리지에 있는 id값이 사용자가 북마크 해제하려고 한 id값이랑 다를때만 res에 남기고, 같으면 지운다.
//   localStorage.setItem('bookmark', JSON.stringify(res));
//   toast('해당 이미지를 북마크에서 삭제하였습니다. 😊');
// };

function card({ data, onDeleteCard }: Props) {
  return (
    <div className={styles.card}>
      <span className={styles.card__deleteBtn} onClick={() => onDeleteCard(data.id)}>❌</span>
      <div className={styles.card__imageBox}>
        <img src={data.urls.small} alt="" className={styles.card__imageBox__image} />        
      </div>
      <div className={styles.card__infoBox}>
        <div className={styles.card__infoBox__row}>
          <span className={styles.label}>작성자</span>
          <span className={styles.value}>{data.user.name}</span>
        </div>
        <div className={styles.card__infoBox__row}>
          <span className={styles.label}>이미지 크기</span>
          <span className={styles.value}>{data.width} X {data.height}</span>
        </div>
        <div className={styles.card__infoBox__row}>
          <span className={styles.label}>업로드 날짜</span>
          <span className={styles.value}>{data.created_at.split('T')[0]}</span>
        </div>
        <div className={styles.card__infoBox__row}>
          <span className={styles.label}>마지막 업데이트</span>
          <span className={styles.value}>{data.updated_at.split('T')[0]}</span>
        </div>
        <div className={styles.card__infoBox__row}>
          <span className={styles.label}>다운로드 수</span>
          <span className={styles.value}>{data.likes}</span>
        </div>
      </div>
    </div>
  )
}

export default card