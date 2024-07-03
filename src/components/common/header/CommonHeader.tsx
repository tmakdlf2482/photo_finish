import { useNavigate } from 'react-router-dom';
import styles from './CommonHeader.module.scss'
import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/atoms/searchState';

function CommonHeader() {
  const navigate = useNavigate();
  const [, setInitialValue] = useRecoilState(searchState);

  // 메인 페이지, 북마크 페이지로 이동
  const moveToPage = (filter: string) => {
    if (filter === 'main') {
      navigate('/photo');
      setInitialValue('korea');
    }
    if (filter === 'bookmark') {
      navigate('/photo/bookmark');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox} onClick={() => moveToPage('main')}>
        <img src="/photo/assets/images/image-logo.png" alt="" className={styles.header__logoBox__logo}/>
        <span className={styles.header__logoBox__title}>PhotoSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <button className={styles.header__profileBox__button} onClick={() => moveToPage('bookmark')}>북마크</button>
        <span className={styles.header__profileBox__userName}>tmakdlf2482 | tmakdlf2482@naver.com</span>
      </div>
    </header>
  )
}

export default CommonHeader