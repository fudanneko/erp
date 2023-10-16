package tw.idv.erp.order.grinding_price.service;

import tw.idv.erp.order.grinding_price.entity.GrindingPrice;

import java.util.List;

public interface GrindingPriceService {
    GrindingPrice add(GrindingPrice grindingPrice);

    GrindingPrice edit(GrindingPrice grindingPrice);

    List<GrindingPrice> findAll();

    GrindingPrice findByPK(Integer getGrindingId);


    boolean remove(Integer getGrindingId);

}
