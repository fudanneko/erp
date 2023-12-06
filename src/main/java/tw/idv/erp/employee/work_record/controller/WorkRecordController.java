package tw.idv.erp.employee.work_record.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.employee.work_record.entity.WorkRecord;
import tw.idv.erp.employee.work_record.service.WorkRecordService;

import java.util.List;

@RestController
public class WorkRecordController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private WorkRecordService SERVICE;


    @PostMapping("employee/employee/editWorkRecord")
    public WorkRecord editOrder(@RequestBody WorkRecord OrderRequest) {
        WorkRecord entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("employee/employee/newWorkRecord")
    public WorkRecord newOrder(@RequestBody WorkRecord OrderRequest) {
        WorkRecord entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("employee/employee/getAllWorkRecord")
    public List<WorkRecord> findAll() {
        return SERVICE.findAll();
    }

    @GetMapping("order/order/getAllWorkRecord")
    public List<WorkRecord> findAll2() {
        return SERVICE.findAll();
    }


    @PostMapping("employee/employee/deleteWorkRecord")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






