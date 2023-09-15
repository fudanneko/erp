package tw.idv.erp.order.order.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.order.entity.Order;


public interface OrderDao extends JpaRepository<Order, Integer> {

}
