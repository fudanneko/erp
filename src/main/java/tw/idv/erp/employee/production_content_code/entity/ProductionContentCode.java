package tw.idv.erp.employee.production_content_code.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "production_content_code", schema = "changfeng")
public class ProductionContentCode extends Core {
    @Id
    @Size(max = 10)
    @Column(name = "productionContentCode", nullable = false, length = 10)
    private String productionContentCode;

    @Size(max = 45)
    @Column(name = "production_Content_Name", length = 45)
    private String productionContentName;

    @Column(name = "productionPerformanceMultiplier", precision = 5, scale = 1)
    private BigDecimal productionPerformanceMultiplier;

}