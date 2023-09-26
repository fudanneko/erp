package tw.idv.erp.customer.contact.entity;

import lombok.Getter;
import lombok.Setter;
import tw.idv.erp.core.Core;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "contact", schema = "changfeng")
public class Contact extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contactId", nullable = false)
    private Integer contactId;

    @Column(name = "customerId")
    private Integer customerId;

    @Size(max = 45)
    @Column(name = "contactName", length = 45)
    private String contactName;

    @Size(max = 45)
    @Column(name = "contactTitle", length = 45)
    private String contactTitle;

    @Size(max = 45)
    @Column(name = "contactMobile", length = 45)
    private String contactMobile;

}