package tw.idv.erp.customer.customer_details.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;


public interface CustomerDetailDao extends JpaRepository<CustomerDetail, String> {

}
