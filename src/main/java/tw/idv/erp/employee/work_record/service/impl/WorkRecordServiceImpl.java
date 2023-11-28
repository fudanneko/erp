package tw.idv.erp.employee.work_record.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.employee.work_record.dao.WorkRecordDao;
import tw.idv.erp.employee.work_record.entity.WorkRecord;
import tw.idv.erp.employee.work_record.service.WorkRecordService;

import java.util.List;
import java.util.Optional;

@Service
public class WorkRecordServiceImpl implements WorkRecordService {
    @Autowired
    private WorkRecordDao Dao;

    @Override
    public WorkRecord add(WorkRecord entity) {

        final WorkRecord result = Dao.save(entity);
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
    public WorkRecord edit(WorkRecord entity) {
        Optional<WorkRecord> oentity = Dao.findById(entity.getWorkRecordId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            WorkRecord oldentity = oentity.get();//將它取出以更改值

            if (entity.getAdditionalDetails() != null) {
                oldentity.setAdditionalDetails(entity.getAdditionalDetails());
            }
            if (entity.getEmployeeId() != null) {
                oldentity.setEmployeeId(entity.getEmployeeId());
            }
            if (entity.getRecordDate() != null) {
                oldentity.setRecordDate(entity.getRecordDate());
            }
            if (entity.getPerformanceScore() != null) {
                oldentity.setPerformanceScore(entity.getPerformanceScore());
            }


            final WorkRecord result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<WorkRecord> findAll() {
        return Dao.findAll();
    }

    @Override
    public WorkRecord findByPK(Integer WorkRecordId) {
        Optional<WorkRecord> order = Dao.findById(WorkRecordId);
        if (order.isPresent()) {
            WorkRecord order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer WorkRecordId) {
            try {
                Dao.deleteById(WorkRecordId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
