package tw.idv.erp.order.product_category.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "product_category", schema = "changfeng")
public class ProductCategory extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryId", nullable = false)
    private Integer categoryId;

    @Size(max = 45)
    @Column(name = "categoryName", length = 45)
    private String categoryName;

    @Size(max = 45)
    @Column(name = "productName", length = 45)
    private String productName;

    @Size(max = 45)
    @Column(name = "productType", length = 45)
    private String productType;

    @Size(max = 45)
    @Column(name = "productDefaultProcess", length = 45)
    private String productDefaultProcess;

}