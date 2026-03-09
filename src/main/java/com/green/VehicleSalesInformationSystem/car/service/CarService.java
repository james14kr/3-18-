package com.green.VehicleSalesInformationSystem.car.service;

import com.green.VehicleSalesInformationSystem.car.dto.CarDTO;
import com.green.VehicleSalesInformationSystem.car.mapper.CarMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

  private final CarMapper carMapper;

  public void regCarInfo(CarDTO carDTO){
    carMapper.insertCarInfo(carDTO);
  }

  public List<CarDTO> getCarInfo(){
    return carMapper.selectCarInfo();
  }

}
