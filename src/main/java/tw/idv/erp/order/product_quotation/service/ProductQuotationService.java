package tw.idv.erp.order.product_quotation.service;


import tw.idv.erp.order.product_quotation.entity.ProductQuotation;

import java.util.List;

public interface ProductQuotationService {
    ProductQuotation add(ProductQuotation productQuotation);

    ProductQuotation edit(ProductQuotation productQuotation);

    List<ProductQuotation> findAll();

    ProductQuotation findByPK(Integer productQuotationId);
    ProductQuotation findByUK(Integer orderDetailId);

    boolean remove(Integer productQuotationId);
}
