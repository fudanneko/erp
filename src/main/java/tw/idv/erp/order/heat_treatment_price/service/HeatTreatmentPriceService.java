package tw.idv.erp.order.heat_treatment_price.service;

import tw.idv.erp.order.heat_treatment_price.entity.HeatTreatmentPrice;

import java.util.List;

public interface HeatTreatmentPriceService {
   HeatTreatmentPrice add(HeatTreatmentPrice HeatTreatmentPrice);

    HeatTreatmentPrice edit(HeatTreatmentPrice HeatTreatmentPrice);

    List<HeatTreatmentPrice> findAll();

    HeatTreatmentPrice findByPK(Integer heatTreatmentId);


    boolean remove(Integer heatTreatmentId);

}
