package tw.idv.erp.order.tooth_count_price.service;

import tw.idv.erp.order.tooth_count_price.entity.ToothCountPrice;

import java.util.List;

public interface ToothCountPriceService {
    ToothCountPrice add(ToothCountPrice toothCountPrice);

    ToothCountPrice edit(ToothCountPrice toothCountPrice);

    List<ToothCountPrice> findAll();

    ToothCountPrice findByPK(Integer toothId);


    boolean remove(Integer toothId);

}
