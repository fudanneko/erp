package tw.idv.erp.order.order.service;

import tw.idv.erp.order.order.entity.Order;

import java.util.List;

public interface OrderService {
    Order add(Order order);

    Order edit(Order order);

    List<Order> findAll();
    List<Order> findOrderByorderState();

    List<Order> findOrderByorderState1();

    Order findByPK(Integer OrderNo);



//    List<Order> findbcounterNo(Integer OrderNo);

    boolean remove(Integer OrderNo);

}
