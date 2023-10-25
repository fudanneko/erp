package tw.idv.erp.order.product_quotation.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "product_quotation", schema = "changfeng")
public class ProductQuotation extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productQuotationId", nullable = false)
    private Integer productQuotationId;

    @Column(name = "orderDetailId")
    private Integer orderDetailId;

    @Column(name = "quotationDate")
    private Timestamp quotationDate;

    @Column(name = "materialUnitPrice")
    private Integer materialUnitPrice;

    @Column(name = "grindingPrice")
    private Integer grindingPrice;

    @Column(name = "heatTreatmentPrice")
    private Integer heatTreatmentPrice;

    @Column(name = "washerProcessingPrice")
    private Integer washerProcessingPrice;

    @Column(name = "breakingKnifeProcessingPrice")
    private Integer breakingKnifeProcessingPrice;

    @Column(name = "crushingKnifeProcessingPrice")
    private Integer crushingKnifeProcessingPrice;

    @Column(name = "toothCount")
    private Integer toothCount;

    @Column(name = "wireCuttingPrice")
    private Integer wireCuttingPrice;

    @Column(name = "hezhenQuotation")
    private Integer hezhenQuotation;

    @Column(name = "guofengQuotation")
    private Integer guofengQuotation;

    @Column(name = "guoshengQuotation")
    private Integer guoshengQuotation;

    @Column(name = "huataiQuotation")
    private Integer huataiQuotation;

    @Column(name = "jinjiQuotation")
    private Integer jinjiQuotation;

    @Column(name = "otherQuotation")
    private Integer otherQuotation;

    @Column(name = "holeMultiplier")
    private Integer holeMultiplier;

    @Column(name = "holeCount")
    private Integer holeCount;

    @Column(name = "otherProcessingPrice")
    private Integer otherProcessingPrice;

    @Column(name = "totalCost")
    private Integer totalCost;

}