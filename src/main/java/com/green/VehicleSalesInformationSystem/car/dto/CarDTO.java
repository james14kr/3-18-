package com.green.VehicleSalesInformationSystem.car.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CarDTO {
  private int carNum;
  private int modelNum;
  private String modelName;
  private int price;
  private String company;
}
