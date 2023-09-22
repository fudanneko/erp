package tw.idv.erp.order.order.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.order.order.entity.Order;

import java.util.List;


public interface OrderDao extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT * FROM `order` WHERE orderState =  :orderState", nativeQuery = true)
    List<Order> findOrderByorderState(Integer orderState);

}
