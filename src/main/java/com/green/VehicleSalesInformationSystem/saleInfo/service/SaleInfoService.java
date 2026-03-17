package com.green.VehicleSalesInformationSystem.saleInfo.service;

import com.green.VehicleSalesInformationSystem.saleInfo.dto.SaleInfoDTO;
import com.green.VehicleSalesInformationSystem.saleInfo.mapper.SaleInfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleInfoService {

  private final SaleInfoMapper saleInfoMapper;

  public void regSaleInfo(SaleInfoDTO saleInfoDTO){
    saleInfoMapper.insertSaleInfo(saleInfoDTO);
  }

  public List<SaleInfoDTO> getSaleInfo(){
    return saleInfoMapper.selectSaleInfo();
  }

}
