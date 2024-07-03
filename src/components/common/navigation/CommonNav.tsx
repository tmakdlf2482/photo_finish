import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CommonNav.module.scss'
import navJson from './nav.json'
import { useRecoilState } from 'recoil'
import { pageState } from '@/recoil/atoms/pageState'
import { searchState } from '@/recoil/atoms/searchState'

interface Navigation {
  index: number
  path: string
  label: string
  searchValue: string
  isActive: boolean
}

function CommonNav() {
  const location = useLocation();
  const [navigation, setNavigation] = useState<Navigation[]>(navJson);
  const [, setPage] = useRecoilState(pageState); // useRecoilState : 읽기,쓰기가 가능한 hook
  const [, setSearch] = useRecoilState(searchState); // useRecoilState : 읽기,쓰기가 가능한 hook

  useEffect(() => {
    // console.log(location.pathname); // index면 /, 보도/편집 전용이면 /edit

    navigation.forEach((nav: Navigation) => {
      nav.isActive = false; // 초기에는 false로 셋팅, true가 되면 UI가 바뀜

      if (nav.path === location.pathname || location.pathname.includes(nav.path)) {
        // console.log(nav);

        nav.isActive = true;
        setSearch(nav.searchValue);
        setPage(1);
      }
    })

    setNavigation([...navigation]); // 내비게이션을 다시 등록, 즉 navJson을 다시 navigation에 할당
  }, [location.pathname]);

  // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복호출
  const navLinks = navigation.map( (item: Navigation) => {
    return (
      <Link to={item.path} className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>
        <span className={styles.navigation__menu__label}>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={styles.navigation}>{navLinks}</nav>
  )
}

export default CommonNav