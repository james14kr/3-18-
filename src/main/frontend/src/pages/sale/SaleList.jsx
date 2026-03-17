import React, { useEffect, useState } from 'react'
import styles from './SaleList.module.css'
import { getSaleList } from '../../api/saleInfo'

const SaleList = () => {

  // 판매 목록 데이터를 담는 state
  const[saleList, setSaleList] = useState([])

  // 판매 목록 조회 함수
  const selectSaleList = async () => {
    try{
      const result = await getSaleList()
      setSaleList(result.data)
    }catch(e){
      console.log(e)
    }
  }

  // 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    selectSaleList()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.listSection}>
        <div>
          <h2>판매 정보 리스트</h2>
        </div>
        <div className={styles.tableGroup}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* rowSpan : 아래 행과 셀 합치기 (세로) */}
                <td rowSpan={2}>No</td>
                {/* colSpan : 오른쪽 셀과 합치기 (가로) */}
                <td colSpan={4}>구매자 정보</td>
                <td colSpan={2}>차량 정보</td>
              </tr>
              <tr>
                <td>구매자명</td>
                <td>연락처</td>
                <td>구매일</td>
                <td>색상</td>
                <td>모델명</td>
                <td>가격</td>
              </tr>
            </thead>
            <tbody>
              {saleList.map((list, index) => (
                <tr key={index}>
                  {/* No : 내림차순 표시 */}
                  <td>{saleList.length - index}</td>
                  <td>{list.buyer}</td>
                  {/* || '-' : phone이 null, undefined, 빈 문자열이면 '-' 표시 */}
                  <td>{list.phone || '-'}</td>
                  {/* 날짜 포맷 변환: "2025-03-03T17:20:00" → "2025.03.03 17:20"
                      1. replace('T', ' ') : T를 공백으로 치환
                      2. slice(0, 16)      : 앞 16자리만 자름 (초 제거)
                      3. replace(/-/g, '.'): 하이픈을 점으로 변환 */}
                  <td>{list.buyDate?.replace('T', ' ').slice(0, 16).replace(/-/g, '.')}</td>
                  <td>{list.color}</td>
                  <td>{list.modelName}</td>
                  {/* toLocaleString() : 숫자에 천 단위 콤마 추가 (예: 30000000 → 30,000,000) */}
                  <td>{list.price.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SaleList
