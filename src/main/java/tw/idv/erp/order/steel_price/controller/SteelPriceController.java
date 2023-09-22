package tw.idv.erp.order.steel_price.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.steel_price.entity.SteelPrice;
import tw.idv.erp.order.steel_price.service.SteelPriceService;

import java.util.List;

@RestController
public class SteelPriceController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private SteelPriceService SERVICE;


    @PostMapping("order/order/editSteelPrice")
    public SteelPrice editOrder(@RequestBody SteelPrice SteelPriceRequest) {
        SteelPrice steelPrice = SERVICE.edit(SteelPriceRequest);
        return steelPrice;
    }

    @PostMapping("order/order/newSteelPrice")
    public SteelPrice newOrder(@RequestBody SteelPrice SteelPriceRequest) {
        SteelPrice steelPrice = SERVICE.add(SteelPriceRequest);
        return steelPrice;
    }


    @GetMapping("order/order/getAllSteelPrice")
    public List<SteelPrice> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("order/order/deleteSteelPrice")
    public Boolean deleteOrder(@RequestBody Integer SteelPriceRequest) {
        System.out.println(SteelPriceRequest);
        Boolean deletesucceed = SERVICE.remove(SteelPriceRequest);
        return deletesucceed;
    }


}






