package tw.idv.erp.order.product_quotation.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import java.math.BigDecimal;
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
    private BigDecimal materialUnitPrice;

    @Column(name = "breakingKnifegrindingPrice")
    private BigDecimal breakingKnifegrindingPrice;

    @Column(name = "grindingPrice")
    private BigDecimal grindingPrice;

    @Column(name = "heatTreatmentPrice")
    private BigDecimal heatTreatmentPrice;

    @Column(name = "washerProcessingPrice")
    private BigDecimal washerProcessingPrice;

    @Column(name = "breakingKnifeProcessingPrice")
    private BigDecimal breakingKnifeProcessingPrice;

    @Column(name = "crushingKnifeProcessingPrice")
    private BigDecimal crushingKnifeProcessingPrice;

    @Column(name = "toothCount")
    private Integer toothCount;

    @Column(name = "wireCuttingPrice")
    private BigDecimal wireCuttingPrice;

    @Column(name = "hezhenQuotation")
    private BigDecimal hezhenQuotation;

    @Column(name = "guofengQuotation")
    private BigDecimal guofengQuotation;

    @Column(name = "guoshengQuotation")
    private BigDecimal guoshengQuotation;

    @Column(name = "huataiQuotation")
    private BigDecimal huataiQuotation;

    @Column(name = "jinjiQuotation")
    private BigDecimal jinjiQuotation;

    @Column(name = "otherQuotation")
    private BigDecimal otherQuotation;

    @Column(name = "holeMultiplier")
    private BigDecimal holeMultiplier;

    @Column(name = "holeCount")
    private Integer holeCount;

    @Column(name = "holeMachiningPrice")
    private BigDecimal holeMachiningPrice;

    @Column(name = "otherProcessingPrice")
    private BigDecimal otherProcessingPrice;

    @Column(name = "totalCost")
    private BigDecimal totalCost;

}