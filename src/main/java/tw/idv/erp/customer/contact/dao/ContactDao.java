package tw.idv.erp.customer.contact.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.customer.contact.entity.Contact;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;

import java.util.List;


public interface ContactDao extends JpaRepository<Contact, Integer> {

    @Query(value = "SELECT * FROM `Contact` WHERE customerId =  :customerId", nativeQuery = true)
    List<Contact> findContactsByCustomerId(Integer customerId);

}
