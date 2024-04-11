package tw.idv.erp.customer.contact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.customer.contact.entity.Contact;
import tw.idv.erp.customer.contact.service.ContactDetailService;

import java.util.List;

@RestController
public class ContactController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private ContactDetailService SERVICE;


    @PostMapping("customer/customer/editContact")
    public Contact editOrder(@RequestBody Contact OrderRequest) {
        Contact contact = SERVICE.edit(OrderRequest);
        return contact;
    }


    @PostMapping("customer/customer/newContact")
    public Contact newOrder(@RequestBody Contact OrderRequest) {
        Contact contact = SERVICE.add(OrderRequest);
        return contact;
    }

    @PostMapping("customer/customer/getcustomerByData")
    public List<Contact> getcustomerByData(@RequestBody Integer OrderRequest) {
        System.out.println(OrderRequest);
        List<Contact> contact = SERVICE.findByCustomerId(OrderRequest);
        return contact;
    }


    @GetMapping("customer/customer/getAllContact")
    public List<Contact> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("customer/customer/deleteContact")
    public Boolean deleteOrder(@RequestBody Integer OrderRequest) {
        Boolean deletesucceed = SERVICE.remove(OrderRequest);
        return deletesucceed;
    }


}






