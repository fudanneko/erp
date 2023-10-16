package tw.idv.erp.order.grinding_price.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.grinding_price.entity.GrindingPrice;
import tw.idv.erp.order.grinding_price.service.GrindingPriceService;

import java.util.List;

@RestController
public class GrindingPriceController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private GrindingPriceService SERVICE;


    @PostMapping("order/order/editGrindingPrice")
    public GrindingPrice editOrder(@RequestBody GrindingPrice OrderRequest) {
        GrindingPrice entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("order/order/newGrindingPrice")
    public GrindingPrice newOrder(@RequestBody GrindingPrice OrderRequest) {
        GrindingPrice entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("order/order/getAllGrindingPrice")
    public List<GrindingPrice> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("order/order/deleteGrindingPrice")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






