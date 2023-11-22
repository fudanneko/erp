package tw.idv.erp.employee.employee.service;


import tw.idv.erp.employee.employee.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee add(Employee employee);

    Employee edit(Employee employee);

    List<Employee> findAll();

    Employee findByPK(Integer getEmployeeId);


    boolean remove(Integer getEmployeeId);

}
