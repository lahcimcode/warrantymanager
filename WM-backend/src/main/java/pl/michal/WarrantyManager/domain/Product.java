package pl.michal.WarrantyManager.domain;

import pl.michal.WarrantyManager.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String receipt;

    private Boolean hiding;

    private Integer warranty;

    private LocalDateTime purchaseDate;


//    Lista tagów, baza liczy 1000 userów, 1 user ma 25 produktów, 1 produkt ma 5 tagów
//    125 tys tagów do przeszukania teoretycznie ale bedac w grupie szukamy po wielu userach
//    czy w takiej sytuacji elastixsearch się nada?

}
