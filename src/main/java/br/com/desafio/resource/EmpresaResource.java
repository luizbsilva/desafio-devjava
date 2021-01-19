package br.com.desafio.resource;


import br.com.desafio.dto.EmpresaDTO;
import br.com.desafio.dto.EmpresaFilter;
import br.com.desafio.event.RecursoCriadoEvent;
import br.com.desafio.model.Empresa;
import br.com.desafio.repository.EmpresaRepository;
import br.com.desafio.repository.empresas.EmpresaRepositoryQuery;
import br.com.desafio.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresas")
public class EmpresaResource {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;


    @Autowired
    private ApplicationEventPublisher publisher;


    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_EMPRESA') and #oauth2.hasScope('write')")
    public ResponseEntity<Empresa> criar(@Valid @RequestBody final EmpresaDTO Empresa, final HttpServletResponse response) {
        final Empresa EmpresaSalva = this.empresaService.salvar(Empresa);
        this.publisher.publishEvent(new RecursoCriadoEvent(this, response, EmpresaSalva.getCodigo()));
        return ResponseEntity.status(HttpStatus.CREATED).body(EmpresaSalva);
    }

    @GetMapping("/{codigo}")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_EMPRESA') and #oauth2.hasScope('read')")
    public ResponseEntity<Empresa> buscarPeloCodigo(@PathVariable final Long codigo) {
        final Optional<Empresa> Empresa = this.empresaRepository.findById(codigo);
        return Empresa.isPresent() ? ResponseEntity.ok(Empresa.get()) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ROLE_REMOVER_EMPRESA') and #oauth2.hasScope('write')")
    public void remover(@PathVariable final Long codigo) {
        this.empresaRepository.deleteById(codigo);
    }

    @PutMapping("/{codigo}")
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_EMPRESA') and #oauth2.hasScope('write')")
    public ResponseEntity<Empresa> atualizar(@PathVariable final Long codigo, @Valid @RequestBody final EmpresaDTO Empresa) {
        final Empresa EmpresaSalva = this.empresaService.atualizar(codigo, Empresa);
        return ResponseEntity.ok(EmpresaSalva);
    }

    @PutMapping("/{codigo}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_EMPRESA') and #oauth2.hasScope('write')")
    public void atualizarPropriedadeAtivo(@PathVariable final Long codigo, @RequestBody final Boolean ativo) {
        this.empresaService.atualizarPropriedadeAtivo(codigo, ativo);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_EMPRESA') and #oauth2.hasScope('read')")
    public Page<Empresa> pesquisar(EmpresaFilter empresaFilter, Pageable pageable) {
        return empresaService.filtrar(empresaFilter, pageable);
    }

    @GetMapping("/buscar-empresa-matriz")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_EMPRESA') and #oauth2.hasScope('read')")
    public List<Empresa> buscarEmpresasMatriz() {
        return this.empresaService.buscarEmpresasMatriz();
    }
}
