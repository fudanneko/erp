package tw.idv.erp.order.tooth_count_price.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.tooth_count_price.entity.ToothCountPrice;
import tw.idv.erp.order.tooth_count_price.service.ToothCountPriceService;

import java.util.List;

@RestController
public class ToothCountPriceController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private ToothCountPriceService SERVICE;


    @PostMapping("order/order/editToothCountPrice")
    public ToothCountPrice editOrder(@RequestBody ToothCountPrice OrderRequest) {
        ToothCountPrice entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("order/order/newToothCountPrice")
    public ToothCountPrice newOrder(@RequestBody ToothCountPrice OrderRequest) {
        ToothCountPrice entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("order/order/getAllToothCountPrice")
    public List<ToothCountPrice> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("order/order/deleteToothCountPrice")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






