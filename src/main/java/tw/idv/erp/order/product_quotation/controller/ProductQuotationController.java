package tw.idv.erp.order.product_quotation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.product_quotation.entity.ProductQuotation;
import tw.idv.erp.order.product_quotation.service.ProductQuotationService;

import java.util.List;

@RestController
public class ProductQuotationController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private ProductQuotationService SERVICE;


    @PostMapping("order/order/editProductQuotation")
    public ProductQuotation editOrder(@RequestBody ProductQuotation Request) {
        ProductQuotation result = SERVICE.edit(Request);
        return result;
    }

    @PostMapping("order/order/newProductQuotation")
    public ProductQuotation newOrder(@RequestBody ProductQuotation Request) {
        ProductQuotation result = SERVICE.add(Request);
        return result;
    }


    @GetMapping("order/order/getAllProductQuotation")
    public List<ProductQuotation> findAll() {
        return SERVICE.findAll();
    }

    @PostMapping("order/order/getProductQuotationByPk")
    public ProductQuotation findByPk(@RequestBody  Integer Request) {
        ProductQuotation result=SERVICE.findByPK(Request);
        return result;
    }
    @PostMapping("order/order/getProductQuotationByUk")
    public ProductQuotation findByUK(@RequestBody  ProductQuotation Request) {
        Integer orderDetailId=Request.getOrderDetailId();
        ProductQuotation result=SERVICE.findByUK(orderDetailId);
        return result;
    }


    @PostMapping("order/order/deleteProductQuotation")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        System.out.println(Request);
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }


}






