package tw.idv.erp.customer.contact.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.customer.contact.dao.ContactDao;
import tw.idv.erp.customer.contact.entity.Contact;
import tw.idv.erp.customer.contact.service.ContactDetailService;

import java.util.List;
import java.util.Optional;

@Service
public class ContactDetailServiceImpl implements ContactDetailService {
    @Autowired
    private ContactDao Dao;

    @Override
    public Contact add(Contact contact) {

        final Contact result = Dao.save(contact);
        if (result == null) {
            contact.setMessage("新增錯誤");
            contact.setSuccessful(false);
            return contact;
        }
        result.setMessage("新增成功");
        result.setSuccessful(true);
        return result;
    }

    @Override
    public Contact edit(Contact contact) {
        Optional<Contact> ocontact = Dao.findById(contact.getContactId());
        if (ocontact.isPresent()) {//確認opromotionCoupone是否為空
            Contact oldentity = ocontact.get();//將它取出以更改值

            if (contact.getCustomerId() != null) {//若名稱不為空則取代舊值
                oldentity.setCustomerId(contact.getCustomerId());
            }
            if (contact.getContactName() != null) {
                oldentity.setContactName(contact.getContactName());
            }
            if (contact.getContactTitle() != null) {
                oldentity.setContactTitle(contact.getContactTitle());
            }
            if (contact.getContactMobile() != null) {
                oldentity.setContactMobile(contact.getContactMobile());
            }
            final Contact result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<Contact> findAll() {
        return Dao.findAll();
    }

    @Override
    public Contact findByPK(Integer contactId) {
        Optional<Contact> order = Dao.findById(contactId);
        if (order.isPresent()) {
            Contact order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public List<Contact> findByCustomerId(Integer customerId) {
        return Dao.findContactsByCustomerId(customerId);
    }

    @Override
    public boolean remove(Integer contactId) {
            try {
                Dao.deleteById(contactId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
