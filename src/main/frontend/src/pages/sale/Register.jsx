import React, { useEffect, useState } from 'react'
import Input from '../../common/Input'
import Select from '../../common/Select'
import { getCarInfo } from '../../api/carApi'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'
import { regSaleInfo } from '../../api/saleInfo'
import styles from './Register.module.css'

const colorOption = [
  {value : '화이트', label : '화이트'},
  {value : '레드', label : '레드'},
  {value : '블랙', label : '블랙'}
]

const Register = () => {

  const nav = useNavigate();

  const [saleData, setSaleData] = useState({
    buyer : '',
    color : '',
    modelNum : '',
    phone : ''
  })

  const [modelOption, setModelOption] = useState([])
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    setSaleData(prev => ({...prev, [name] : value}))

    if(name === 'phone'){
      if(value === ''){
        setError('')
      }else{
        const phonePattern = /^010-\d{4}-\d{4}$/
        if(!phonePattern.test(value)){
          setError('010-0000-0000 형태로 입력해주세요')
        }else{
          setError('')
        }
      }
    }
  }

  const submitInfo = async() => {

    if(!saleData.buyer || !saleData.color || !saleData.modelNum){
      alert('구매자명, 색상, 모델은 필수 입력입니다')
      return
    }

    if(error){
      alert('연락처 형식을 확인해주세요')
      return
    }

    try{
      await regSaleInfo(saleData)
      alert('등록 성공')
      setSaleData({buyer : '', color : '', modelNum : '', phone : ''})
      nav('/list')
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchModel = async () => {
      const result = await getCarInfo()
      const option = result.data.map((car) => ({
        value : car.modelNum,
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
              name='modelNum'
              value={saleData.modelNum}
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
