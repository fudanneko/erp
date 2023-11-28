package tw.idv.erp.employee.production_content_code.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.employee.production_content_code.entity.ProductionContentCode;
import tw.idv.erp.employee.production_content_code.service.productionContentCodeService;

import java.util.List;

@RestController
public class productionCpntentCodeController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private productionContentCodeService SERVICE;


    @PostMapping("employee/employee/editProductionContentCode")
    public ProductionContentCode editOrder(@RequestBody ProductionContentCode OrderRequest) {
        ProductionContentCode entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("employee/employee/newProductionContentCode")
    public ProductionContentCode newOrder(@RequestBody ProductionContentCode OrderRequest) {
        ProductionContentCode entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("employee/employee/getAllProductionContentCode")
    public List<ProductionContentCode> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("employee/employee/deleteProductionContentCode")
    public Boolean deleteOrder(@RequestBody String Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






