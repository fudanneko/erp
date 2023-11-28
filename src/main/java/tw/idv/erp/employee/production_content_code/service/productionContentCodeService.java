package tw.idv.erp.employee.production_content_code.service;




import tw.idv.erp.employee.production_content_code.entity.ProductionContentCode;

import java.util.List;

public interface productionContentCodeService {
    ProductionContentCode add(ProductionContentCode productionContentCode);

    ProductionContentCode edit(ProductionContentCode productionContentCode);

    List<ProductionContentCode> findAll();

    ProductionContentCode findByPK(String productionContentCode);


    boolean remove(String productionContentCode);

}
