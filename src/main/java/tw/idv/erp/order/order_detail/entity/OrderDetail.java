package tw.idv.erp.order.order_detail.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "order_details", schema = "changfeng")
public class OrderDetail extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderDetailId", nullable = false)
    private Integer orderDetailId;

    @Column(name = "orderId")
    private Integer orderId;

    @Size(max = 45)
    @Column(name = "customerName", length = 45)
    private String customerName;

    @Column(name = "categoryId")
    private Integer categoryId;

    @Column(name = "length")
    private BigDecimal length;

    @Column(name = "width")
    private BigDecimal width;

    @Column(name = "thickness")
    private BigDecimal thickness;

    @Size(max = 50)
    @Column(name = "productMaterial", length = 50)
    private String productMaterial;

    @Size(max = 2000)
    @Column(name = "manufacturingProcess", length = 2000)
    private String manufacturingProcess;

    @Column(name = "productQuotationUnitPrice")
    private Integer productQuotationUnitPrice;

    @Column(name = "productQuantity")
    private Integer productQuantity;

    @Column(name = "productSubtotal", precision = 10, scale = 1)
    private BigDecimal productSubtotal;

    @Size(max = 500)
    @Column(name = "note", length = 500)
    private String note;

}