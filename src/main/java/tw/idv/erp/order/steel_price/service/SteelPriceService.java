package tw.idv.erp.order.steel_price.service;

import tw.idv.erp.order.steel_price.entity.SteelPrice;

import java.util.List;

public interface SteelPriceService {
    SteelPrice add(SteelPrice steelPrice);

    SteelPrice edit(SteelPrice steelPrice);

    List<SteelPrice> findAll();

    SteelPrice findByPK(Integer steelId);

    boolean remove(Integer steelId);

}
