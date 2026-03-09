package com.green.VehicleSalesInformationSystem.car.mapper;

import com.green.VehicleSalesInformationSystem.car.dto.CarDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarMapper {

  void insertCarInfo(CarDTO carDTO);

  List<CarDTO> selectCarInfo();

}
