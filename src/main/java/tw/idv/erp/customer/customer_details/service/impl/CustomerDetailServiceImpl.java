package tw.idv.erp.customer.customer_details.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.customer.customer_details.dao.CustomerDetailDao;
import tw.idv.erp.customer.customer_details.entity.CustomerDetail;
import tw.idv.erp.customer.customer_details.service.CustomerDetailService;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerDetailServiceImpl implements CustomerDetailService {
    @Autowired
    private CustomerDetailDao Dao;

    @Override
    public CustomerDetail add(CustomerDetail customerDetail) {

        if (customerDetail.getCustomeruk() == null) {
            customerDetail.setMessage("未輸入");
            customerDetail.setSuccessful(false);
            return customerDetail;
        }
        String customeruk = customerDetail.getCustomeruk();
        List<CustomerDetail> existingCustomers = Dao.findAll();
        for (CustomerDetail existingCustomer : existingCustomers) {
            if (existingCustomer.getCustomeruk().equals(customeruk)) {
                customerDetail.setMessage("客戶代號已存在");
                customerDetail.setSuccessful(false);
                return customerDetail;
            }
        }

        final CustomerDetail result = Dao.save(customerDetail);
        if (result == null) {
            customerDetail.setMessage("新增錯誤");
            customerDetail.setSuccessful(false);
            return customerDetail;
        }
        result.setMessage("新增成功");
        result.setSuccessful(true);
        return result;
    }

    @Override
    public CustomerDetail edit(CustomerDetail customerDetail) {
        Optional<CustomerDetail> ocustomerDetail = Dao.findById(customerDetail.getCustomerId());
        if (ocustomerDetail.isPresent()) {//確認opromotionCoupone是否為空
            CustomerDetail oldentity = ocustomerDetail.get();//將它取出以更改值
            if (customerDetail.getCustomeruk() != null) {//若名稱不為空則取代舊值
                List<CustomerDetail> existingCustomers = Dao.findAll();
                for (CustomerDetail existingCustomer : existingCustomers) {
                    if (existingCustomer.getCustomeruk().equals(customerDetail.getCustomeruk())) {
                        customerDetail.setMessage("客戶代號已存在");
                        customerDetail.setSuccessful(false);
                        return customerDetail;
                    }
                }
                oldentity.setCustomeruk(customerDetail.getCustomeruk());
            }
            if (customerDetail.getCustomerId() != null) {//若名稱不為空則取代舊值
                oldentity.setCustomerId(customerDetail.getCustomerId());
            }
            if (customerDetail.getCustomerName() != null) {
                oldentity.setCustomerName(customerDetail.getCustomerName());
            }
            if (customerDetail.getCustomerPhone() != null) {
                oldentity.setCustomerPhone(customerDetail.getCustomerPhone());
            }
            if (customerDetail.getCustomerFax() != null) {
                oldentity.setCustomerFax(customerDetail.getCustomerFax());
            }
            if (customerDetail.getCustomerAddress() != null) {
                oldentity.setCustomerAddress(customerDetail.getCustomerAddress());
            }
            if (customerDetail.getCustomerMultiplier() != null) {
                oldentity.setCustomerMultiplier(customerDetail.getCustomerMultiplier());
            }
            if (customerDetail.getNote() != null) {
                oldentity.setNote(customerDetail.getNote());
            }
            final CustomerDetail result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }
    @Override
    public List<CustomerDetail> findAll() {
        return Dao.findAll();
    }

    @Override
    public CustomerDetail findByPK(Integer customerId) {
        Optional<CustomerDetail> order = Dao.findById(customerId);
        if (order.isPresent()) {
            CustomerDetail order2 = order.get();
            return order2;
        }
        return null;
    }
    @Override
    public boolean remove(Integer customerId) {
            try {
                Dao.deleteById(customerId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }
}
