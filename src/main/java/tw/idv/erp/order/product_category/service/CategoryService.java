package tw.idv.erp.order.product_category.service;

import tw.idv.erp.order.product_category.entity.ProductCategory;
import tw.idv.erp.order.steel_price.entity.SteelPrice;

import java.util.List;

public interface CategoryService {
    ProductCategory add(ProductCategory category);

    ProductCategory edit(ProductCategory category);

    List<ProductCategory> findAll();

    ProductCategory findByPK(Integer categoryId);

    boolean remove(Integer categoryId);

}
