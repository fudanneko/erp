package tw.idv.erp.employee.work_record.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.idv.erp.employee.work_record.entity.WorkRecord;


public interface WorkRecordDao extends JpaRepository<WorkRecord, Integer> {

}
