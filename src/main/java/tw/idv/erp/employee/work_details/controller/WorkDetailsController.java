package tw.idv.erp.employee.work_details.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.employee.work_details.entity.WorkDetail;
import tw.idv.erp.employee.work_details.service.WorkDetailsService;

import java.util.List;

@RestController
public class WorkDetailsController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private WorkDetailsService SERVICE;


    @PostMapping("employee/employee/editWorkDetail")
    public WorkDetail editOrder(@RequestBody WorkDetail OrderRequest) {
        WorkDetail entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("employee/employee/newWorkDetail")
    public WorkDetail newOrder(@RequestBody WorkDetail OrderRequest) {
        WorkDetail entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("employee/employee/getAllWorkDetail")
    public List<WorkDetail> findAll() {
        return SERVICE.findAll();
    }


    @PostMapping("employee/employee/deleteWorkDetail")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






