package tw.idv.erp.order.order.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "`order`", schema = "changfeng")
public class Order extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId", nullable = false)
    private Integer orderId;

    @Size(max = 10)
    @Column(name = "customerId", length = 10)
    private String customerId;

    @Size(max = 45)
    @Column(name = "customerName", length = 45)
    private String customerName;

    @Column(name = "orderDate")
    private Timestamp orderDate;

    @Column(name = "deliveryDate")
    private Timestamp deliveryDate;

    @Column(name = "quotation")
    private Integer quotation;

    @Size(max = 500)
    @Column(name = "note", length = 500)
    private String note;

    @Column(name = "orderState")
    private Integer orderState;

}