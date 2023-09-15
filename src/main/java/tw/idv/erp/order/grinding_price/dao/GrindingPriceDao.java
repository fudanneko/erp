package tw.idv.erp.order.grinding_price.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.grinding_price.entity.GrindingPrice;


public interface GrindingPriceDao extends JpaRepository<GrindingPrice, Integer> {

}
