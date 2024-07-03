import { CardDTO, Tag } from '@/pages/index/types/card'
import { useEffect, useState } from 'react'
import toast, { toastConfig } from 'react-simple-toasts'
import styles from './DetailDialog.module.scss'
import 'react-simple-toasts/dist/theme/dark.css'

toastConfig (
  { theme: 'dark' }
)

interface Props {
  data: CardDTO
  handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog }: Props) {
  const [bookmark, setBookmark] = useState(false); // 북마크 버튼을 클릭했는지 안했는지 통제하기 위함

  // 다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
    // console.log('함수호출') // 이벤트 버블링 발생 확인용 (2번 호출됨)
    // event.stopPropagation(); // 이벤트 버블링 발생 방지
  };

  // console.log(data);

  // 북마크 추가 이벤트
  const addBookmark = (selected: CardDTO) => {
    setBookmark(true);

    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark')); // String 값을 원본으로 조회하기 위해 JSON.parse (JSON -> Array/Object)
    
    // console.log(getLocalStorage);
    // console.log(selected);

    // 1. 로컬스토리지에 bookmark라는 데이터가 없을 경우
    if ( !getLocalStorage || getLocalStorage === null ) {
      localStorage.setItem('bookmark', JSON.stringify([selected])); // 선택한 북마크가 여러개 일수 있어서 배열로 로컬스토리지에 저장 (Array/Object -> JSON)
      // README.md 파일에서 React Toast Popup 모듈을 설치했었음
      toast('해당 이미지를 북마크에 저장하였습니다. 😊');
    }
    else {
      // 2. 해당 이미지가 이미 로컬스토리지 bookmark라는 key값에 저장되어 있을 경우
      if (getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) { // item.id는 localStorage에 있는 배열의 id고, selected.id는 내가 북마크를 추가하려고 선택한 이미지의 id
        toast('해당 이미지가 이미 북마크에 추가된 상태입니다. ❌');
      }
      else {
        // 3. 해당 이미지가 로컬스토리지 bookmark라는 key값에 저장되어 있지 않을 경우 + bookmark라는 데이터에 이미 어떤 값이 담겨 있는 경우 (즉, 1개의 이미지를 이미 북마크에 추가한 상태에서, 더불어 다른 이미지도 북마크에 계속해서 추가하는 작업)
        const res = [...getLocalStorage];
        res.push(selected);
        localStorage.setItem('bookmark', JSON.stringify(res));

        toast('해당 이미지를 북마크에 저장하였습니다. 😊');
      }
    }
  };

  // 만약 다시 들어갔을 때, 북마크가 빨간 하트로 상태 유지되게
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark')); // JSON -> Array/Object

    if (getLocalStorage && getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1) { // getLocalStorage는 값이 있다는 뜻, item.id는 localStorage에 있는 배열의 id고, data.id는 내가 선택한 이미지의 id
      setBookmark(true); // 빨간 하트
    }
    else if (!getLocalStorage) { // getLocalStorage에 값이 없을 경우
      return; // 검정 하트 그대로
    }

    // ESC 키를 눌렀을 때, 다이얼로그 창 닫기
    const escKeyDownCloseDialog = (event: any) => {
      // console.log('함수호출');
      if (event.key === 'Escape') { // event.key가 Escape 이게 Esc키를 말함
        closeDialog();
      }
    };

    // 위에 만들어놓은 escKeyDownCloseDialog를 KeyDown 했을 때, 이벤트 등록 및 해제
    window.addEventListener('keydown', escKeyDownCloseDialog); // 함수 등록
    return () => window.removeEventListener('keydown', escKeyDownCloseDialog);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              {/* 구글 아이콘을 사용 */}
              <span className='material-symbols-outlined' style={{ fontSize: 28 + 'px' }}>
                close
              </span>
            </button>
            <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close__authorImage} />
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button className={styles.bookmark__button} onClick={() => addBookmark(data)}>
              {/* 구글 아이콘을 사용 */}
              {
                bookmark === false ?
                ( <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px' }}>
                  favorite
                </span> )
                :
                ( <span className='material-symbols-outlined' style={{ fontSize: 16 + 'px', color : 'red' }}>
                  favorite
                </span> )
              }
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>
        <div className={styles.container__dialog__body}>
          <img src={data.urls.small} alt="상세이미지" className={styles.image} />
        </div>
        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>마지막 업데이트</span>
              <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>
            {data.tags.map((tag: Tag) => {
              return (
                <div className={styles.tagBox__tag} key={tag.title}>
                  {tag.title}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailDialog