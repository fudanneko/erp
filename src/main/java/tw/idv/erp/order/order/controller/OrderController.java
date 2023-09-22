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

    @GetMapping("order/order/getAllOrderbystate")
    public List<Order> findOrderByorderState() {
        return OrderSERVICE.findOrderByorderState();
    }

    @GetMapping("order/order/getAllcompleteorder")
    public List<Order> findOrderByorderState1() {
        return OrderSERVICE.findOrderByorderState1();
    }


    @PostMapping("order/order/deleteOrder")
    public Boolean deleteOrder(@RequestBody Integer OrderRequest) {
        System.out.println(OrderRequest);
        Boolean deletesucceed = OrderSERVICE.remove(OrderRequest);
        return deletesucceed;
    }


}






