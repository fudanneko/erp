package tw.idv.erp.order.product_category.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.order.product_category.entity.ProductCategory;


public interface ProductCategoryDao extends JpaRepository<ProductCategory, Integer> {

}
