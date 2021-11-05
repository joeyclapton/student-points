package app.main.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.main.model.Parceiro;

@RestController
@RequestMapping
public class ParceiroController {

    @GetMapping("/parceiro/nome")
    public Parceiro nomeParceiro() {
        var parceiro = new Parceiro();
        parceiro.setNome("Fiat");

        return parceiro;
    }


}
