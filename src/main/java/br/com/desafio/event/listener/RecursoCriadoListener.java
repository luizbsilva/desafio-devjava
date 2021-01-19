package br.com.desafio.event.listener;

import br.com.desafio.event.RecursoCriadoEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@Component
public class RecursoCriadoListener implements ApplicationListener<RecursoCriadoEvent> {

    @Override
    public void onApplicationEvent(final RecursoCriadoEvent recursoCriadoEvent) {
        final HttpServletResponse response = recursoCriadoEvent.getResponse();
        final Long codigo = recursoCriadoEvent.getCodigo();

        this.adicionarHeaderLocation(response, codigo);
    }

    private void adicionarHeaderLocation(final HttpServletResponse response, final Long codigo) {
        final URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
                .buildAndExpand(codigo).toUri();
        response.setHeader("Location", uri.toASCIIString());
    }

}
