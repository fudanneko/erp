package tw.idv.erp.employee.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.employee.employee.entity.Employee;


public interface EmployeeDao extends JpaRepository<Employee, Integer> {

}
