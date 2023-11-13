package tw.idv.erp.customer.customer_details.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;
import tw.idv.erp.order.order.entity.Order;

import java.util.List;


public interface CustomerDetailDao extends JpaRepository<CustomerDetail, Integer> {
    @Query(value = "SELECT * FROM `customer_details` WHERE customeruk =  :customeruk", nativeQuery = true)
    CustomerDetail findByUk(String customeruk);
}
