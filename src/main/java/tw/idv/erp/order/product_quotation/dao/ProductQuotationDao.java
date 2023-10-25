package tw.idv.erp.order.product_quotation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.order.order_detail.entity.OrderDetail;
import tw.idv.erp.order.product_quotation.entity.ProductQuotation;

import java.util.List;


public interface ProductQuotationDao extends JpaRepository<ProductQuotation, Integer> {
    @Query(value = "SELECT * FROM `product_quotation` WHERE orderDetailId =  :orderDetailId", nativeQuery = true)
    ProductQuotation findByorderDetailId(Integer orderDetailId);

}
