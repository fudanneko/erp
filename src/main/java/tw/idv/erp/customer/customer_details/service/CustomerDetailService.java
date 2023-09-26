package tw.idv.erp.customer.customer_details.service;

import tw.idv.erp.customer.customer_details.entity.CustomerDetail;

import java.util.List;

public interface CustomerDetailService {
    CustomerDetail add(CustomerDetail customerDetail);

    CustomerDetail edit(CustomerDetail customerDetail);

    List<CustomerDetail> findAll();

    CustomerDetail findByPK(Integer customerId);


    boolean remove(Integer customerId);

}
