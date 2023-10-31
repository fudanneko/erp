package tw.idv.erp.order.heat_treatment_price.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "heat_treatment_price", schema = "changfeng")
public class HeatTreatmentPrice extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "heatTreatmentId", nullable = false)
    private Integer heatTreatmentId;

    @Size(max = 45)
    @Column(name = "heatTreatmentMaterial", length = 45)
    private String heatTreatmentMaterial;

    @Column(name = "heatTreatmentUnitPrice", precision = 6, scale = 1)
    private BigDecimal heatTreatmentUnitPrice;

}