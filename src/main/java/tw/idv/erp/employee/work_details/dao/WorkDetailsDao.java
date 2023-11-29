package tw.idv.erp.employee.work_details.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tw.idv.erp.employee.work_details.entity.WorkDetail;
import tw.idv.erp.order.order_detail.entity.OrderDetail;

import java.util.List;


public interface WorkDetailsDao extends JpaRepository<WorkDetail, Integer> {

    @Query(value = "SELECT * FROM `work_details` WHERE workRecordId =  :workRecordId", nativeQuery = true)
    List<WorkDetail> findByWorkRecordId(Integer workRecordId);

}
