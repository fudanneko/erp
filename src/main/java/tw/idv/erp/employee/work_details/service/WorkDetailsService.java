package tw.idv.erp.employee.work_details.service;




import tw.idv.erp.employee.work_details.entity.WorkDetail;

import java.util.List;

public interface WorkDetailsService {
    WorkDetail add(WorkDetail workDetail);

    WorkDetail edit(WorkDetail workDetail);

    List<WorkDetail> findAll();

    List<WorkDetail> findByWorkRecordId(Integer  workRecordId);

    List<WorkDetail> findByOrderDetailId(Integer  orderDetailId);



    WorkDetail findByPK(Integer workDetailId);


    boolean remove(Integer workDetailId);

}
