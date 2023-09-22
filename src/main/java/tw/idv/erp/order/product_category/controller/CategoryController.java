package tw.idv.erp.order.product_category.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.product_category.entity.ProductCategory;
import tw.idv.erp.order.product_category.service.CategoryService;

import java.util.List;

@RestController
public class CategoryController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private CategoryService SERVICE;


    @PostMapping("order/order/editProductCategory")
    public ProductCategory editOrder(@RequestBody ProductCategory Request) {
        ProductCategory productCategory = SERVICE.edit(Request);
        return productCategory;
    }

    @PostMapping("order/order/newProductCategory")
    public ProductCategory newOrder(@RequestBody ProductCategory Request) {
        ProductCategory productCategory = SERVICE.add(Request);
        return productCategory;
    }


    @GetMapping("order/order/getAllProductCategory")
    public List<ProductCategory> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("order/order/deleteProductCategory")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        System.out.println(Request);
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }


}






