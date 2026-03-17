package com.green.VehicleSalesInformationSystem.saleInfo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SaleInfoDTO {

  private String buyer;       // 구매자명
  private String color;       // 색상
  private int modelNum;       // 모델번호 FK (INSERT용)
  private String modelName;   // 모델명 (SELECT JOIN 결과)
  private String phone;       // 연락처 (형식: 010-0000-0000, VARCHAR(13))
  private LocalDateTime buyDate;
  private int price;
}
