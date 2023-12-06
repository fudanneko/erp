package tw.idv.erp.order.order_detail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.order_detail.entity.OrderDetail;
import tw.idv.erp.order.order_detail.service.OrderdetailService;

import java.util.List;

@RestController
public class OrderdetailController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private OrderdetailService SERVICE;


    @PostMapping("order/order/editOrderDetail")
    public OrderDetail editOrder(@RequestBody OrderDetail Request) {
        OrderDetail result = SERVICE.edit(Request);
        return result;
    }

    @PostMapping("order/order/newOrderDetail")
    public OrderDetail newOrder(@RequestBody OrderDetail Request) {
        OrderDetail result = SERVICE.add(Request);
        return result;
    }


    @GetMapping("order/order/getAllOrderDetail")
    public List<OrderDetail> findAll() {
        return SERVICE.findAll();
    }

    @GetMapping("employee/employee/getAllOrderDetail")
    public List<OrderDetail> findAll2() {
        return SERVICE.findAll();
    }

    @PostMapping("employee/employee/getAllOrderDetail2")
    public List<OrderDetail> findCompletionStatus(@RequestBody  Integer Request) {
        List<OrderDetail> result=SERVICE.findCompletionStatus(Request);
        return result;
    }



    @PostMapping("order/order/getOrderDetailByOrder")
    public List<OrderDetail> findByPk(@RequestBody  Integer Request) {
        List<OrderDetail> result=SERVICE.findByOrderId(Request);
        return result;
    }


    @PostMapping("order/order/deleteOrderDetail")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        System.out.println(Request);
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }


}






