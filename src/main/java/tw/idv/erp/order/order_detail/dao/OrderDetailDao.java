package tw.idv.erp.order.order_detail.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.order_detail.entity.OrderDetail;


public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {

}
