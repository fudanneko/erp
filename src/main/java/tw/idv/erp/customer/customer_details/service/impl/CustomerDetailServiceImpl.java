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
        if (customerDetail.getCustomerId() == null) {
//            order.setMessage("種類名稱未輸入");
//            order.setSuccessful(false);
            return customerDetail;
        }
        final CustomerDetail result = Dao.save(customerDetail);
        if (result == null) {
//            order.setMessage("新增錯誤");
//            order.setSuccessful(false);
            return customerDetail;
        }
//        order.setMessage("新增成功");
//        order.setSuccessful(true);
        return result;
    }
    @Override
    public CustomerDetail edit(CustomerDetail customerDetail) {
        Optional<CustomerDetail> ocustomerDetail = Dao.findById(customerDetail.getCustomerId());
        if (ocustomerDetail.isPresent()) {//確認opromotionCoupone是否為空
            CustomerDetail oldentity = ocustomerDetail.get();//將它取出以更改值

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
            final CustomerDetail result = Dao.save(oldentity);
//            oldorder.setSuccessful(result != null);
//            oldorder.setMessage("修改成功");
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
    public CustomerDetail findByPK(String customerId) {
        Optional<CustomerDetail> order=Dao.findById(customerId);
        if (order.isPresent()) {
            CustomerDetail order2 = order.get();
            return order2;
        }
        return null;
    }
    @Override
    public boolean remove(String customerId) {
        try {
            Dao.deleteById(customerId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


//
//    @Override
//    public List<PromotionCoupon> findbcounterNo(Integer counterNo) {
//        List<Integer> promotionCoupons = Dao.findCouponTypeNosByCounterNo(counterNo);
//        List<PromotionCoupon> promotionCoupons2 = Dao.findByCouponTypeNoIn(promotionCoupons);
//        return promotionCoupons2;
//    }
//
//    ;
//

//


}
