package tw.idv.erp.order.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.order.dao.OrderDao;
import tw.idv.erp.order.order.entity.Order;
import tw.idv.erp.order.order.service.OrderService;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao Dao;
    @Override
    public Order add(Order order) {

        final Order result = Dao.save(order);
        if (result == null) {
            order.setMessage("新增錯誤");
            order.setSuccessful(false);
            return order;
        }
        order.setMessage("新增成功");
        order.setSuccessful(true);
        return result;
    }
    @Override
    public Order edit(Order order) {
        Optional<Order> oorder = Dao.findById(order.getOrderId());
        if (oorder.isPresent()) {//確認opromotionCoupone是否為空
            Order oldorder = oorder.get();//將它取出以更改值

            if (order.getCustomerId() != null) {//若名稱不為空則取代舊值
                oldorder.setCustomerId(order.getCustomerId());
            }
            if (order.getCustomerName() != null) {
                oldorder.setCustomerName(order.getCustomerName());
            }
            if (order.getOrderDate() != null) {
                oldorder.setOrderDate(order.getOrderDate());
            }
            if (order.getDeliveryDate() != null) {
                oldorder.setDeliveryDate(order.getDeliveryDate());
            }
            if (order.getQuotation() != null) {
                oldorder.setQuotation(order.getQuotation());
            }
            if (order.getNote() != null) {
                oldorder.setNote(order.getNote());
            }
            if (order.getOrderState() != null) {
                oldorder.setOrderState(order.getOrderState());
            }


            final Order result = Dao.save(oldorder);
            oldorder.setSuccessful(result != null);
            oldorder.setMessage("修改成功");
            return oldorder;
        } else {
            return null;
        }
    }
    @Override
    public List<Order> findAll() {
        return Dao.findAll();
    }
    @Override
    public Order findByPK(Integer OrderNo) {
        Optional<Order> order=Dao.findById(OrderNo);
        if (order.isPresent()) {
            Order order2 = order.get();
            return order2;
        }
        return null;
    }
    @Override
    public boolean remove(Integer orderId) {
        try {
            Dao.deleteById(orderId);
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
