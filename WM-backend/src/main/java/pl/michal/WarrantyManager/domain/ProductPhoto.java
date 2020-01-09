package pl.michal.WarrantyManager.domain;

import javax.persistence.*;

@Entity
public class ProductPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private String patch;

}
