package tw.idv.erp.order.tooth_count_price.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "tooth_count_price", schema = "changfeng")
public class ToothCountPrice extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "toothId", nullable = false)
    private Integer toothId;

    @Column(name = "toothMinThickness")
    private Integer toothMinThickness;

    @Column(name = "toothMaxThickness")
    private Integer toothMaxThickness;

    @Column(name = "toothUnitPrice")
    private Integer toothUnitPrice;

}