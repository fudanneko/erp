package tw.idv.erp.order.order_detail.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.order_detail.dao.OrderDetailDao;
import tw.idv.erp.order.order_detail.entity.OrderDetail;
import tw.idv.erp.order.order_detail.service.OrderdetailService;

import java.util.List;
import java.util.Optional;

@Service
public class OrderdetailServiceImpl implements OrderdetailService {
    @Autowired
    private OrderDetailDao Dao;

    @Override
    public OrderDetail add(OrderDetail orderDetail) {

        final OrderDetail result = Dao.save(orderDetail);
        if (result == null) {
            orderDetail.setMessage("新增錯誤");
            orderDetail.setSuccessful(false);
            return orderDetail;
        }
        orderDetail.setMessage("新增成功");
        orderDetail.setSuccessful(true);
        return result;
    }

    @Override
    public OrderDetail edit(OrderDetail orderDetail) {
        System.out.println(orderDetail.getOrderDetailId());
        Optional<OrderDetail> oorderDetail = Dao.findById(orderDetail.getOrderDetailId());
        if (oorderDetail.isPresent()) {//確認opromotionCoupone是否為空
            OrderDetail oldorderDetail = oorderDetail.get();//將它取出以更改值
            if (orderDetail.getOrderId() != null) {//若名稱不為空則取代舊值
                oldorderDetail.setOrderId(orderDetail.getOrderId());
            }
            if (orderDetail.getCategoryId() != null) {
                oldorderDetail.setCategoryId(orderDetail.getCategoryId());
            }
            if (orderDetail.getLength() != null) {
                oldorderDetail.setLength(orderDetail.getLength());
            }
            if (orderDetail.getWidth() != null) {
                oldorderDetail.setWidth(orderDetail.getWidth());
            }
            if (orderDetail.getThickness() != null) {
                oldorderDetail.setThickness(orderDetail.getThickness());
            }
            if (orderDetail.getProductMaterial() != null) {
                oldorderDetail.setProductMaterial(orderDetail.getProductMaterial());
            }
            if (orderDetail.getManufacturingProcess() != null) {
                oldorderDetail.setManufacturingProcess(orderDetail.getManufacturingProcess());
            }
            if (orderDetail.getProductQuotationUnitPrice() != null) {
                oldorderDetail.setProductQuotationUnitPrice(orderDetail.getProductQuotationUnitPrice());
            }
            if (orderDetail.getProductQuantity() != null) {
                oldorderDetail.setProductQuantity(orderDetail.getProductQuantity());
            }
            if (orderDetail.getProductSubtotal() != null) {
                oldorderDetail.setProductSubtotal(orderDetail.getProductSubtotal());
            }
            if (orderDetail.getNote() != null) {
                oldorderDetail.setNote(orderDetail.getNote());
            }
            if (orderDetail.getCompletionStatus() != null) {
                oldorderDetail.setCompletionStatus(orderDetail.getCompletionStatus());
            }
            final OrderDetail result = Dao.save(oldorderDetail);
            oldorderDetail.setSuccessful(result != null);
            oldorderDetail.setMessage("修改成功");
            return oldorderDetail;
        } else {
            return null;
        }
    }

    @Override
    public List<OrderDetail> findAll() {
        return Dao.findAll();
    }

    @Override
    public OrderDetail findByPK(Integer orderDetailId) {
        Optional<OrderDetail> orderDetail = Dao.findById(orderDetailId);
        if (orderDetail.isPresent()) {
            OrderDetail orderDetail2 = orderDetail.get();
            return orderDetail2;
        }
        return null;
    }

    @Override
    public List<OrderDetail> findCompletionStatus(Integer completionStatus) {
            return Dao.findCompletionStatus(completionStatus);
    }

    @Override
    public boolean remove(Integer orderDetailId) {
        try {
            Dao.deleteById(orderDetailId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public List<OrderDetail> findByOrderId(Integer orderId) {
       List<OrderDetail> orderDetail = Dao.findByOrderId(orderId);
       return orderDetail;
    }
}
