package app.main.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter // Isso aqui adiciona getters para os atributos
@Setter // Isso aqui adiciona setters para todos os atributos
@NoArgsConstructor // Isso aqui cria um constructor sem argumentos
@AllArgsConstructor // Isso aqui cria um constructor com argumentos/atributos
public class Parceiro {
    private String nome;
}
