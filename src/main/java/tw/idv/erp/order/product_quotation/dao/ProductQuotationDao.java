package tw.idv.erp.order.product_quotation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.product_quotation.entity.ProductQuotation;


public interface ProductQuotationDao extends JpaRepository<ProductQuotation, Integer> {

}
