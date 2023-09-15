package tw.idv.erp.order.tooth_count_price.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.tooth_count_price.entity.ToothCountPrice;


public interface ToothCountPriceDao extends JpaRepository<ToothCountPrice, Integer> {

}
