package com.green.VehicleSalesInformationSystem.saleInfo.mapper;

import com.green.VehicleSalesInformationSystem.saleInfo.dto.SaleInfoDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SaleInfoMapper {

  void insertSaleInfo(SaleInfoDTO saleInfoDTO);

}
