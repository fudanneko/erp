package tw.idv.erp.employee.work_details.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "work_details", schema = "changfeng")
public class WorkDetail extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workDetailId", nullable = false)
    private Integer workDetailId;

    @Column(name = "workRecordId")
    private Integer workRecordId;

    @Column(name = "orderDetailId")
    private Integer orderDetailId;

    @Size(max = 45)
    @Column(name = "productionContentCode", length = 45)
    private String productionContentCode;

    @Column(name = "timeSpentOnProduction", precision = 10, scale = 2)
    private BigDecimal timeSpentOnProduction;


    @Size(max = 45)
    @Column(name = "process", length = 45)
    private String  process;

    @Column(name = "quantity")
    private Integer quantity;



}