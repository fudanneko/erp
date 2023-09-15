package tw.idv.erp.customer.customer_details.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;
import tw.idv.erp.customer.customer_details.service.CustomerDetailService;
import tw.idv.erp.order.order.entity.Order;
import tw.idv.erp.order.order.service.OrderService;

import java.util.List;

@RestController
public class ContectDetailController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private CustomerDetailService CustomerSERVICE;


    @PostMapping("order/order/editCustomerDetail")
    public CustomerDetail editOrder(@RequestBody CustomerDetail OrderRequest) {
        CustomerDetail customerDetail = CustomerSERVICE.edit(OrderRequest);
        return customerDetail;
    }

    @PostMapping("order/order/newCustomerDetail")
    public CustomerDetail newOrder(@RequestBody CustomerDetail OrderRequest) {
        CustomerDetail customerDetail = CustomerSERVICE.add(OrderRequest);
        return customerDetail;
    }


    @GetMapping("order/order/getAllCustomerDetail")
    public List<CustomerDetail> findAll() {
        return CustomerSERVICE.findAll();
    }


    @PostMapping("order/order/deleteCustomerDetail")
    public Boolean deleteOrder(@RequestBody CustomerDetail OrderRequest) {
        String orderNo = OrderRequest.getCustomerId();
        Boolean deletesucceed = CustomerSERVICE.remove(orderNo);
        return deletesucceed;
    }


}






