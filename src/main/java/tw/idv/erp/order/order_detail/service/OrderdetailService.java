package tw.idv.erp.order.order_detail.service;

import tw.idv.erp.order.order_detail.entity.OrderDetail;

import java.util.List;

public interface OrderdetailService {
    OrderDetail add(OrderDetail orderDetail);

    OrderDetail edit(OrderDetail orderDetail);

    List<OrderDetail> findAll();

    List<OrderDetail> findCompletionStatus(Integer completionStatus);

    OrderDetail findByPK(Integer orderDetailId);

    boolean remove(Integer orderDetailId);

    List<OrderDetail> findByOrderId(Integer orderId);

}
