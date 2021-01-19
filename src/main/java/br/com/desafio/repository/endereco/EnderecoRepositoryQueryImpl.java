package br.com.desafio.repository.endereco;

import br.com.desafio.dto.EnderecoDTO;
import br.com.desafio.model.Endereco;
import br.com.desafio.util.StringUtil;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class EnderecoRepositoryQueryImpl implements EnderecoRepositoryQuery{

    @PersistenceContext
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    @Override
    public Endereco buscarEndereco(final EnderecoDTO filtro) {
        final CriteriaBuilder cb = this.getEntityManager().getCriteriaBuilder();
        final CriteriaQuery<Endereco> criteria = cb.createQuery(Endereco.class);
        final Root<Endereco> from = criteria.from(Endereco.class);

        criteria.select(from);
        criteria.where(this.montarWhereParaBuscaDeEndereco(from, filtro));

        final TypedQuery<Endereco> query = this.getEntityManager().createQuery(criteria);

        try {
            return query.getSingleResult();
        } catch (final NoResultException e) {
            return null;
        }
    }

    private Predicate[] montarWhereParaBuscaDeEndereco(final Root<Endereco> from, final EnderecoDTO filtro) {
        final CriteriaBuilder cb = this.getEntityManager().getCriteriaBuilder();
        final List<Predicate> predicates = new ArrayList<>();

        if (Objects.nonNull(filtro.getCodigo())) {
            predicates.add(cb.equal(from.get("id"), filtro.getCodigo()));
        } else {
            predicates.add(cb.equal(from.get("cep"), StringUtil.removeCaracteresDeNumeros(filtro.getCep())));
            predicates.add(cb.equal(from.get("logradouro"), filtro.getLogradouro()));
            predicates.add(cb.equal(from.get("bairro"), filtro.getBairro()));
        }

        return predicates.toArray(new Predicate[predicates.size()]);
    }

}
