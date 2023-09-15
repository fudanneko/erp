package tw.idv.erp.employee.work_details.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.employee.work_details.entity.WorkDetail;


public interface WorkDetailsDao extends JpaRepository<WorkDetail, Integer> {

}
