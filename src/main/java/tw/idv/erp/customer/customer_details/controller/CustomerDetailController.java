package tw.idv.erp.customer.customer_details.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;
import tw.idv.erp.customer.customer_details.service.CustomerDetailService;

import java.util.List;

@RestController
public class CustomerDetailController {
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

    @PostMapping("order/order/getCustomerDetail")
    public CustomerDetail findbyPK(@RequestBody CustomerDetail OrderRequest) {
        Integer customerId = OrderRequest.getCustomerId();
        return CustomerSERVICE.findByPK(customerId);
    }


    @PostMapping("order/order/deleteCustomerDetail")
    public Boolean deleteOrder(@RequestBody CustomerDetail OrderRequest) {
        Integer orderNo = OrderRequest.getCustomerId();
        Boolean deletesucceed = CustomerSERVICE.remove(orderNo);
        return deletesucceed;
    }

    //==================================================================
    @PostMapping("customer/customer/editCustomer")
    public CustomerDetail editOrder2(@RequestBody CustomerDetail OrderRequest) {
        CustomerDetail customerDetail = CustomerSERVICE.edit(OrderRequest);
        return customerDetail;
    }

    @PostMapping("customer/customer/newCustomer")
    public CustomerDetail newOrder2(@RequestBody CustomerDetail OrderRequest) {
        CustomerDetail customerDetail = CustomerSERVICE.add(OrderRequest);
        return customerDetail;
    }
    @GetMapping("customer/customer/getAllCustomer")
    public List<CustomerDetail> findAll2() {
        return CustomerSERVICE.findAll();
    }

    @PostMapping("customer/customer/deleteCustomer")
    public boolean deleteOrder2(@RequestBody Integer OrderRequest) {
        boolean deletesucceed = CustomerSERVICE.remove(OrderRequest);
        System.out.println("返回"+deletesucceed);
        return deletesucceed;
    }

}






