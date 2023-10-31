package tw.idv.erp.order.steel_price.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "steel_price", schema = "changfeng")
public class SteelPrice extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "steelId", nullable = false)
    private Integer steelId;

    @Size(max = 45)
    @Column(name = "steelMaterial", length = 45)
    private String steelMaterial;

    @Size(max = 45)
    @Column(name = "steelType", length = 45)
    private String steelType;

    @Column(name = "steelMinSize")
    private BigDecimal steelMinSize;

    @Column(name = "steelMaxSize")
    private BigDecimal steelMaxSize;

    @Column(name = "steelUnitPrice")
    private BigDecimal steelUnitPrice;

}