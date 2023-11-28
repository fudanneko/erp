package tw.idv.erp.order.order_detail.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.order.order.entity.Order;
import tw.idv.erp.order.order_detail.entity.OrderDetail;

import java.util.List;


public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {
    @Query(value = "SELECT * FROM `order_details` WHERE OrderId =  :OrderId", nativeQuery = true)
    List<OrderDetail> findByOrderId(Integer OrderId);

    @Query(value = "SELECT * FROM `order_details` WHERE completionStatus =  :completionStatus", nativeQuery = true)
    List<OrderDetail> findCompletionStatus(Integer completionStatus);
}
