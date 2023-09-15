package tw.idv.erp.order.heat_treatment_price.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.heat_treatment_price.entity.HeatTreatmentPrice;


public interface HeatTreatmentPriceDao extends JpaRepository<HeatTreatmentPrice, Integer> {

}
