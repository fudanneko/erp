package tw.idv.erp.order.order_detail.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "order_details", schema = "changfeng")
public class OrderDetail extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderDetailId", nullable = false)
    private Integer id;

    @Column(name = "orderId")
    private Integer orderId;

    @Column(name = "categoryId")
    private Integer categoryId;

    @Column(name = "length")
    private Integer length;

    @Column(name = "width")
    private Integer width;

    @Column(name = "thickness")
    private Integer thickness;

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

    @Size(max = 45)
    @Column(name = "productSubtotal", length = 45)
    private String productSubtotal;

}