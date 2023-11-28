package tw.idv.erp.employee.employee.entity;

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
@Table(name = "Employee", schema = "changfeng")
public class Employee extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employeeId", nullable = false)
    private Integer employeeId;

    @Size(max = 45)
    @Column(name = "employeeName", length = 45)
    private String employeeName;

    @Column(name = "employeeBrithday")
    private Timestamp employeeBrithday;

    @Column(name = "employeeHireDate")
    private Timestamp employeeHireDate;

    @Size(max = 45)
    @Column(name = "employeeIdCard", length = 45)
    private String employeeIdCard;

    @Column(name = "annualLeaveDays", precision = 2, scale = 1)
    private BigDecimal annualLeaveDays;

    @Column(name = "remainingAnnualLeaveDays", precision = 2, scale = 1)
    private BigDecimal remainingAnnualLeaveDays;

    @Column(name = "employeeGender")
    private Integer employeeGender;

    @Size(max = 45)
    @Column(name = "employeePosition", length = 45)
    private String employeePosition;

    @Column(name = "employeeSalary")
    private Integer employeeSalary;

    @Size(max = 45)
    @Column(name = "employeePhone", length = 45)
    private String employeePhone;

    @Size(max = 70)
    @Column(name = "employeeEmail", length = 70)
    private String employeeEmail;

    @Size(max = 100)
    @Column(name = "employeeAddress", length = 100)
    private String employeeAddress;

    @Column(name = "employeeStatus")
    private Integer employeeStatus;

    @Size(max = 45)
    @Column(name = "employeeNotes", length = 45)
    private String employeeNotes;


    @Column(name = "enrollmentDate")
    private Timestamp enrollmentDate;

    @Size(max = 45)
    @Column(name = "enrollmentPrice", length = 45)
    private String enrollmentPrice;

    @Column(name = "groupInsurance")
    private Integer groupInsurance;

    @Size(max = 45)
    @Column(name = "nguyenVanA", length = 45)
    private String nguyenVanA;

    @Column(name = "performanceRatio", precision = 2, scale = 1)
    private BigDecimal performanceRatio;



}