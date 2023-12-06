package tw.idv.erp.employee.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tw.idv.erp.employee.employee.entity.Employee;
import tw.idv.erp.employee.employee.service.EmployeeService;

import java.util.List;

@RestController
public class EmployeeController {
    private static final long serialVersionUID = 1L;
    @Autowired
    private EmployeeService SERVICE;


    @PostMapping("employee/employee/editEmployee")
    public Employee editOrder(@RequestBody Employee OrderRequest) {
        Employee entity = SERVICE.edit(OrderRequest);
        return entity;
    }


    @PostMapping("employee/employee/newEmployee")
    public Employee newOrder(@RequestBody Employee OrderRequest) {
        Employee entity = SERVICE.add(OrderRequest);
        return entity;
    }



    @GetMapping("employee/employee/getAllEmployee")
    public List<Employee> findAll() {
        return SERVICE.findAll();
    }
    @GetMapping("order/order/getAllEmployee")
    public List<Employee> findAll2() {
        return SERVICE.findAll();
    }


    @PostMapping("employee/employee/deleteEmployee")
    public Boolean deleteOrder(@RequestBody Integer Request) {
        Boolean deletesucceed = SERVICE.remove(Request);
        return deletesucceed;
    }



}






