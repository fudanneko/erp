package tw.idv.erp.customer.customer_details.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "customer_details", schema = "changfeng")
public class CustomerDetail extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerId", nullable = false)
    private Integer customerId;

    @Size(max = 45)
    @NotNull
    @Column(name = "customeruk", nullable = false, length = 45)
    private String customeruk;

    @Size(max = 45)
    @Column(name = "customerName", length = 45)
    private String customerName;

    @Size(max = 45)
    @Column(name = "customerPhone", length = 45)
    private String customerPhone;

    @Size(max = 45)
    @Column(name = "customerFax", length = 45)
    private String customerFax;

    @Size(max = 200)
    @Column(name = "customerAddress", length = 200)
    private String customerAddress;

    @Column(name = "customerMultiplier", precision = 4, scale = 1)
    private BigDecimal customerMultiplier;

    @Size(max = 500)
    @Column(name = "note", length = 500)
    private String note;

}