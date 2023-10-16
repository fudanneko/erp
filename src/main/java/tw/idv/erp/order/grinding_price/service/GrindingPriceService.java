package tw.idv.erp.customer.contact.service;

import tw.idv.erp.customer.contact.entity.Contact;

import java.util.List;

public interface ContactDetailService {
    Contact add(Contact contact);

    Contact edit(Contact contact);

    List<Contact> findAll();

    Contact findByPK(Integer contactId);


    boolean remove(Integer contactId);

}
