package com.green.VehicleSalesInformationSystem.saleInfo.controller;

import com.green.VehicleSalesInformationSystem.saleInfo.dto.SaleInfoDTO;
import com.green.VehicleSalesInformationSystem.saleInfo.service.SaleInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/saleInfo")
public class SaleInfoController {

  private final SaleInfoService saleInfoService;

  @PostMapping("")
  public ResponseEntity<?> regSaleInfo(@RequestBody SaleInfoDTO saleInfoDTO){
    try {
      saleInfoService.regSaleInfo(saleInfoDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("판매 정보 등록 api 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}
