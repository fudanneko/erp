package tw.idv.erp.order.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tw.idv.erp.order.order.entity.Order;
import tw.idv.erp.order.order.service.OrderService;

import java.util.List;

@RestController
public class OrderController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private OrderService OrderSERVICE;


    @PostMapping("order/order/editOrder")
    public Order editOrder(@RequestBody Order OrderRequest) {
        Order order = OrderSERVICE.edit(OrderRequest);
        return order;
    }

    @PostMapping("order/order/newOrder")
    public Order newOrder(@RequestBody Order OrderRequest) {
        Order order = OrderSERVICE.add(OrderRequest);
        return order;
    }


    @GetMapping("order/order/getAllOrder")
    public List<Order> findAll() {
        return OrderSERVICE.findAll();
    }


    @PostMapping("order/order/deleteOrder")
    public Boolean deleteOrder(@RequestBody Order OrderRequest) {
        Integer orderNo = OrderRequest.getOrderId();
        Boolean deletesucceed = OrderSERVICE.remove(orderNo);
        return deletesucceed;
    }


}






