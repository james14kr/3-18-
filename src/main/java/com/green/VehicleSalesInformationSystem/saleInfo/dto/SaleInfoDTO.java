package com.green.VehicleSalesInformationSystem.saleInfo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleInfoDTO {

  // 필드명은 saleInfo-mapper.xml의 #{파라미터}명, 프론트에서 전송하는 JSON key와 모두 일치해야 함
  // DB 컬럼명(BUYER)과는 별개 → XML에서 INSERT INTO SALE_INFO(BUYER) VALUES(#{buyer}) 로 연결
  private String buyer;     // 구매자명
  private String color;     // 색상
  private String modelName; // 모델명 (CAR_INFO의 MODEL_NAME 참조)
  private String phone;     // 연락처 (형식: 010-0000-0000, VARCHAR(13))

}
