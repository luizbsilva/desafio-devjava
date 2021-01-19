package br.com.desafio.model;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public abstract class EntidadeBase implements Serializable {

    private static final long serialVersionUID = 2279373407613957602L;

}
