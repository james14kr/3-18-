package com.green.VehicleSalesInformationSystem.car.controller;

import com.green.VehicleSalesInformationSystem.car.dto.CarDTO;
import com.green.VehicleSalesInformationSystem.car.service.CarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/car")
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  @PostMapping("")
  public ResponseEntity<?> regCarInfo(@RequestBody CarDTO carDTO){
    try{
      carService.regCarInfo(carDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("차량 정보 등록 api 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("")
  public ResponseEntity<List<CarDTO>> getCarInfo(){
    try {
      List<CarDTO> list = carService.getCarInfo();
      return ResponseEntity.status(HttpStatus.OK).body(list);
    }catch (Exception e){
      log.error("차량 정보 조회 api 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}
