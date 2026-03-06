package com.green.VehicleSalesInformationSystem.car.mapper;

import com.green.VehicleSalesInformationSystem.car.dto.CarDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CarMapper {

  void insertCarInfo(CarDTO carDTO);

}
