package tw.idv.erp.employee.work_details.service;




import tw.idv.erp.employee.work_details.entity.WorkDetail;

import java.util.List;

public interface WorkDetailsService {
    WorkDetail add(WorkDetail workDetail);

    WorkDetail edit(WorkDetail workDetail);

    List<WorkDetail> findAll();

    WorkDetail findByPK(Integer getWorkDetailId);


    boolean remove(Integer getWorkDetailId);

}
