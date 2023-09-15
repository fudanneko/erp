package tw.idv.erp.customer.contact.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.customer.contact.entity.Contact;


public interface ContactDao extends JpaRepository<Contact, Integer> {

}
