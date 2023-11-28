package tw.idv.erp.employee.employee.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.employee.employee.dao.EmployeeDao;
import tw.idv.erp.employee.employee.entity.Employee;
import tw.idv.erp.employee.employee.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeDao Dao;

    @Override
    public Employee add(Employee entity) {

        final Employee result = Dao.save(entity);
        if (result == null) {
            entity.setMessage("新增錯誤");
            entity.setSuccessful(false);
            return entity;
        }
        result.setMessage("新增成功");
        result.setSuccessful(true);
        return result;
    }

    @Override
    public Employee edit(Employee entity) {
        Optional<Employee> oentity = Dao.findById(entity.getEmployeeId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            Employee oldentity = oentity.get();//將它取出以更改值

            if (entity.getEmployeeName() != null) {
                oldentity.setEmployeeName(entity.getEmployeeName());
            }
            if (entity.getEmployeeBrithday() != null) {
                oldentity.setEmployeeBrithday(entity.getEmployeeBrithday());
            }
            if (entity.getEmployeeHireDate() != null) {
                oldentity.setEmployeeHireDate(entity.getEmployeeHireDate());
            }
            if (entity.getEmployeeIdCard() != null) {
                oldentity.setEmployeeIdCard(entity.getEmployeeIdCard());
            }
            if (entity.getAnnualLeaveDays() != null) {
                oldentity.setAnnualLeaveDays(entity.getAnnualLeaveDays());
            }
            if (entity.getRemainingAnnualLeaveDays() != null) {
                oldentity.setRemainingAnnualLeaveDays(entity.getRemainingAnnualLeaveDays());
            }
            if (entity.getEmployeeGender() != null) {
                oldentity.setEmployeeGender(entity.getEmployeeGender());
            }
            if (entity.getEmployeePosition() != null) {
                oldentity.setEmployeePosition(entity.getEmployeePosition());
            }
            if (entity.getEmployeeSalary() != null) {
                oldentity.setEmployeeSalary(entity.getEmployeeSalary());
            }
            if (entity.getEmployeePhone() != null) {
                oldentity.setEmployeePhone(entity.getEmployeePhone());
            }
            if (entity.getEmployeeEmail() != null) {
                oldentity.setEmployeeEmail(entity.getEmployeeEmail());
            }
            if (entity.getEmployeeAddress() != null) {
                oldentity.setEmployeeAddress(entity.getEmployeeAddress());
            }
            if (entity.getEmployeeStatus() != null) {
                oldentity.setEmployeeStatus(entity.getEmployeeStatus());
            }
            if (entity.getEmployeeNotes() != null) {
                oldentity.setEmployeeNotes(entity.getEmployeeNotes());
            }
            if (entity.getEnrollmentDate() != null) {
                oldentity.setEnrollmentDate(entity.getEnrollmentDate());
            }
            if (entity.getEnrollmentPrice() != null) {
                oldentity.setEnrollmentPrice(entity.getEnrollmentPrice());
            }
            if (entity.getGroupInsurance() != null) {
                oldentity.setGroupInsurance(entity.getGroupInsurance());
            }
            if (entity.getNguyenVanA() != null) {
                oldentity.setNguyenVanA(entity.getNguyenVanA());
            }
            if (entity.getPerformanceRatio() != null) {
                oldentity.setPerformanceRatio(entity.getPerformanceRatio());
            }
            final Employee result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<Employee> findAll() {
        return Dao.findAll();
    }

    @Override
    public Employee findByPK(Integer employeeId) {
        Optional<Employee> order = Dao.findById(employeeId);
        if (order.isPresent()) {
            Employee order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer employeeId) {
            try {
                Dao.deleteById(employeeId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
