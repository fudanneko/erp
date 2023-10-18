package tw.idv.erp.order.heat_treatment_price.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.order.heat_treatment_price.entity.HeatTreatmentPrice;
import tw.idv.erp.order.heat_treatment_price.service.HeatTreatmentPriceService;

import java.util.List;

@RestController
public class HeatTreatmentPriceController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private HeatTreatmentPriceService SERVICE;


    @PostMapping("order/order/editHeatTreatmentPrice")
    public HeatTreatmentPrice editOrder(@RequestBody HeatTreatmentPrice Request) {
        HeatTreatmentPrice entity = SERVICE.edit(Request);
        return entity;
    }


    @PostMapping("order/order/newHeatTreatmentPrice")
    public HeatTreatmentPrice newOrder(@RequestBody HeatTreatmentPrice Request) {
        HeatTreatmentPrice entity = SERVICE.add(Request);
        return entity;
    }



    @GetMapping("order/order/getAllHeatTreatmentPrice")
    public List<HeatTreatmentPrice> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("order/order/deleteHeatTreatmentPrice")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






