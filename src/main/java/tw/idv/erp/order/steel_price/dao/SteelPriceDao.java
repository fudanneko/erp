package tw.idv.erp.order.steel_price.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.steel_price.entity.SteelPrice;


public interface SteelPriceDao extends JpaRepository<SteelPrice, Integer> {

}
