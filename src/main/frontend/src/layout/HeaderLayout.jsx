import React from 'react'
import styles from './HeaderLayout.module.css'
import { Link } from 'react-router-dom'

const HeaderLayout = () => {
  return (
    <header className={styles.header}>
      <div className={styles.utilBar}>
        <div className={styles.utilInner}>

          {/* 로고 */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🚗</div>
            <div>
              <div className={styles.logoTitle}>차량 판매</div>
              <div className={styles.logoSub}>MANAGEMENT</div>
            </div>
          </div>

          {/* 메뉴 */}
          <ul className={styles.utilMenu}>
            <li>
              <Link to='/' className={styles.navItem}>🏠 홈</Link>
            </li>
            <li>
              <Link to='/car' className={styles.navItem}>🚗 차량 관리</Link>
            </li>
            <li>
              <Link to='/register' className={styles.navItem}>📋 판매 정보 등록</Link>
            </li>
            <li>
              <Link to='/list' className={styles.navItem}>📊 판매 목록 조회</Link>
              </li>
          </ul>

        </div>
      </div>
    </header>
  )
}

export default HeaderLayout