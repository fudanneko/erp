package tw.idv.erp.order.grinding_price.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "grinding_price", schema = "changfeng")
public class GrindingPrice extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grindingId", nullable = false)
    private Integer id;

    @Size(max = 45)
    @Column(name = "grindingVendor", length = 45)
    private String grindingVendor;

    @Size(max = 45)
    @Column(name = "grindingType", length = 45)
    private String grindingType;

    @Column(name = "grindingMinSize", precision = 6, scale = 1)
    private BigDecimal grindingMinSize;

    @Column(name = "grindingMaxSize", precision = 6, scale = 1)
    private BigDecimal grindingMaxSize;

    @Column(name = "grindingUnitPrice")
    private Integer grindingUnitPrice;

}