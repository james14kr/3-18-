package com.green.VehicleSalesInformationSystem.saleInfo.mapper;

import com.green.VehicleSalesInformationSystem.saleInfo.dto.SaleInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SaleInfoMapper {

  void insertSaleInfo(SaleInfoDTO saleInfoDTO);

  List<SaleInfoDTO> selectSaleInfo();

}
