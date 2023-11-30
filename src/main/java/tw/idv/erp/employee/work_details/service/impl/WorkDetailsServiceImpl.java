package tw.idv.erp.employee.work_details.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.employee.work_details.dao.WorkDetailsDao;
import tw.idv.erp.employee.work_details.entity.WorkDetail;
import tw.idv.erp.employee.work_details.service.WorkDetailsService;

import java.util.List;
import java.util.Optional;

@Service
public class WorkDetailsServiceImpl implements WorkDetailsService {
    @Autowired
    private WorkDetailsDao Dao;

    @Override
    public WorkDetail add(WorkDetail entity) {

        final WorkDetail result = Dao.save(entity);
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
    public WorkDetail edit(WorkDetail entity) {
        Optional<WorkDetail> oentity = Dao.findById(entity.getWorkDetailId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            WorkDetail oldentity = oentity.get();//將它取出以更改值

            if (entity.getWorkRecordId() != null) {
                oldentity.setWorkRecordId(entity.getWorkRecordId());
            }
            if (entity.getOrderDetailId() != null) {
                oldentity.setOrderDetailId(entity.getOrderDetailId());
            }
            if (entity.getProductionContentCode() != null) {
                oldentity.setProductionContentCode(entity.getProductionContentCode());
            }
            if (entity.getTimeSpentOnProduction() != null) {
                oldentity.setTimeSpentOnProduction(entity.getTimeSpentOnProduction());
            }
            if (entity.getProcess() != null) {
                oldentity.setProcess(entity.getProcess());
            }
            if (entity.getQuantity() != null) {
                oldentity.setQuantity(entity.getQuantity());
            }
            final WorkDetail result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<WorkDetail> findAll() {
        return Dao.findAll();
    }

    @Override
    public List<WorkDetail> findByWorkRecordId(Integer workRecordId) {
        return Dao.findByWorkRecordId(workRecordId);
    }



    @Override
    public WorkDetail findByPK(Integer WorkDetailId) {
        Optional<WorkDetail> order = Dao.findById(WorkDetailId);
        if (order.isPresent()) {
            WorkDetail order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer workDetailId) {
            try {
                Dao.deleteById(workDetailId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
