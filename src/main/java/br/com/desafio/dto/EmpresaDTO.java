package br.com.desafio.dto;

import br.com.desafio.enums.TipoEmpresa;
import br.com.desafio.model.Empresa;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class EmpresaDTO {

    private Long codigo;

    @NotNull(message = "A Razão Social não pode ser nula")
    @Size(max = 50, message
            = "O CNPJ deve conter no maximo de 50 caracteres")
    private String documento;

    @NotNull(message = "O nome Fantasia não pode ser nula")
    @Size(min = 3, max = 50, message
            = "O nome Fantasia deve conter entre 3 e 50 caracteres")
    private String nomeFantasia;

    @NotNull(message = "Tipo de Empresa não pode ser nula")
    private TipoEmpresa tipoEmpresa;

    @NotNull(message = "A Razão Social não pode ser nula")
    @Size(min = 3, max = 40, message
            = "A Razão Social deve conter entre 3 e 50 caracteres")
    private String razaoSocial;

    @NotNull(message = "O contato não pode ser nula")
    @Size(min = 3, max = 40, message
            = "Contato deve conter entre 3 e 50 caracteres")
    private String contato;

    @NotNull(message = "E-mail não pode ser nula")
    @Size(min = 3, max = 40, message
            = "E-mail deve conter entre 3 e 50 caracteres")
    private String email;

    private EnderecoDTO endereco;

    private String complemento;

    private DadosBasicosEmpresaDTO empresaMatriz;

    public void preencher(Empresa empresa) {

        empresa.setDocumento(this.documento);
        empresa.setNomeFantasia(this.nomeFantasia);
        empresa.setTipoEmpresa(this.tipoEmpresa);
        empresa.setRazaoSocial(this.razaoSocial);
        empresa.setContato(this.contato);
        empresa.setComplemento(this.complemento);
        empresa.setEmail(this.email);
    }
}
