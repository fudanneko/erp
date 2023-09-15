package tw.idv.erp.employee.work_record.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "work_records", schema = "changfeng")
public class WorkRecord extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workRecordId", nullable = false)
    private Integer id;

    @Column(name = "employeeId")
    private Integer employeeId;

    @Column(name = "recordDate")
    private Timestamp recordDate;

    @Column(name = "performanceScore", precision = 10, scale = 2)
    private BigDecimal performanceScore;

    @Size(max = 400)
    @Column(name = "additionalDetails", length = 400)
    private String additionalDetails;

}