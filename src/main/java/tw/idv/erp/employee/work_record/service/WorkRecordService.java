package tw.idv.erp.employee.work_record.service;



import tw.idv.erp.employee.work_record.entity.WorkRecord;

import java.util.List;

public interface WorkRecordService {
    WorkRecord add(WorkRecord workRecord);

    WorkRecord edit(WorkRecord workRecord);

    List<WorkRecord> findAll();

    WorkRecord findByPK(Integer getWorkRecordId);


    boolean remove(Integer getWorkRecordId);

}
