package br.com.desafio.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class EmpresaFilter implements Serializable {

    private static final long serialVersionUID = 1L;

    private String nome;

    private String documento;
}
