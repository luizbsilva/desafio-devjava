package br.com.desafio.repository.empresas;

import br.com.desafio.dto.EmpresaFilter;
import br.com.desafio.model.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class EmpresaRepositoryImpl implements EmpresaRepositoryQuery {

    @PersistenceContext
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    @Override
    public Page<Empresa> filtrar(EmpresaFilter empresaFilter, Pageable pageable) {
        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Empresa> criteria = builder.createQuery(Empresa.class);
        Root<Empresa> root = criteria.from(Empresa.class);

        Predicate[] predicates = criarRestricoes(empresaFilter, builder, root);
        criteria.where(predicates);

        TypedQuery<Empresa> query = getEntityManager().createQuery(criteria);
        adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(empresaFilter));
    }

    private Predicate[] criarRestricoes(EmpresaFilter empresaFilterr, CriteriaBuilder builder,
                                        Root<Empresa> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (!StringUtils.isEmpty(empresaFilterr.getNome())) {
            predicates.add(builder.like(
                    builder.lower(root.get("nomeFantasia")), "%" + empresaFilterr.getNome().toLowerCase() + "%"));
        }
        if (!StringUtils.isEmpty(empresaFilterr.getDocumento())) {
            predicates.add(builder.like(
                    builder.lower(root.get("documento")), "%" + empresaFilterr.getDocumento().toLowerCase() + "%"));
        }



        return predicates.toArray(new Predicate[predicates.size()]);
    }

    private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
        int paginaAtual = pageable.getPageNumber();
        int totalRegistrosPorPagina = pageable.getPageSize();
        int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

        query.setFirstResult(primeiroRegistroDaPagina);
        query.setMaxResults(totalRegistrosPorPagina);
    }

    private Long total(EmpresaFilter empresaFilter) {
        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
        Root<Empresa> root = criteria.from(Empresa.class);

        Predicate[] predicates = criarRestricoes(empresaFilter, builder, root);
        criteria.where(predicates);

        criteria.select(builder.count(root));
        return getEntityManager().createQuery(criteria).getSingleResult();
    }




}
