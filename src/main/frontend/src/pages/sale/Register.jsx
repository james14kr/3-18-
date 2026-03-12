import React, { useEffect, useState } from 'react'
import Input from '../../common/Input'
import Select from '../../common/Select'
import { getCarInfo } from '../../api/carApi'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { regSaleInfo } from '../../api/saleInfo'
import styles from './Register.module.css'

// 색상 선택 옵션 목록 (컴포넌트 밖에 선언 → 렌더링마다 재생성 방지)
const colorOption = [
  {value : '화이트', label : '화이트'},
  {value : '레드', label : '레드'},
  {value : '블랙', label : '블랙'}
]

const Register = () => {

  const nav = useNavigate();

  // 판매 정보 입력값 state
  // buyer: SaleInfoDTO 필드명과 일치시켜야 백엔드에서 정상 매핑됨
  const [saleData, setSaleData] = useState({
    buyer : '',
    color : '',
    modelName : '',
    phone : ''
  })

  // DB에서 불러온 차량 모델 목록을 담는 state
  const [modelOption, setModelOption] = useState([])

  // 연락처 유효성 검사 에러 메시지 state
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    setSaleData(prev => ({...prev, [name] : value}))

    // phone 입력값이 바뀔 때마다 실시간으로 유효성 검사
    // 정규식: 010으로 시작, 하이픈(-), 숫자 4자리, 하이픈(-), 숫자 4자리
    // 예) 010-1234-5678 형태만 허용
    if(name === 'phone'){
      const phonePattern = /^010-\d{4}-\d{4}$/
      if(!phonePattern.test(value)){
        setError('010-0000-0000 형태로 입력해주세요')
      }else{
        setError('') // 올바른 형식이면 에러 메시지 초기화
      }

    }

  }

  const submitInfo = async() => {

    // 유효성 검사 실패 시 서버 요청 차단 (error state가 있으면 return)
    // → 잘못된 형식의 전화번호가 DB에 저장되는 것을 방지
    if(error){
      alert('연락처 형식을 확인해주세요')
      return
    }

    try{
      await regSaleInfo(saleData)
      alert('등록 성공')
      // 등록 성공 후 입력값 초기화
      setSaleData({buyer : '', color : '', modelName : '', phone : ''})
      nav('/list')
    }catch(e){
      console.log(e)
    }
  }


  useEffect(() => {
    const fetchModel = async () => {
      const result = await getCarInfo()

      // DB에서 가져온 차량 목록을 Select 컴포넌트용 option 형식으로 변환
      // value: car.modelName → 서버에 modelName으로 전송되므로 이름(문자열)을 저장해야 함
      //   (이전 오류: car.modelNum(숫자)으로 설정하면 모델명 대신 숫자가 저장됨)
      const option = result.data.map((car) => ({
        value : car.modelName,
        label : car.modelName
      }))

      setModelOption(option)
    }

    fetchModel()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div>
          <h2>판매 정보 등록</h2>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <div>
              <p>👤구매자명</p>
            </div>
            {/* name='buyer' → handleChange에서 saleData.buyer 업데이트 */}
            <Input
              name='buyer'
              value={saleData.buyer}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <div>
              <p>🌈색상</p>
            </div>
            <Select
              name='color'
              value={saleData.color}
              option={colorOption}
              placeholder='색상을 선택하세요'
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <div>
              <p>🚗모델</p>
            </div>
            <Select
              name='modelName'
              value={saleData.modelName}
              option={modelOption}
              placeholder='모델을 선택하세요'
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <div>
              <p>📱연락처</p>
            </div>
            <Input
              name='phone'
              value={saleData.phone}
              onChange={handleChange}
            />
            {/* error state가 있을 때만 에러 메시지 표시 (단락 평가) */}
            {error && <p className={styles.error}>* {error}</p>}
          </div>

        </div>
          <div className={styles.btnArea}>
            <Button
              onClick={submitInfo}
            />
          </div>
      </div>
    </div>
  )
}

export default Register
