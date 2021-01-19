package br.com.desafio.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("desafio")
public class ApiProperty {

    private String originPermitida = "http://localhost:4200";

    private final Seguranca seguranca = new Seguranca();

    public Seguranca getSeguranca() {
        return this.seguranca;
    }

    public String getOriginPermitida() {
        return this.originPermitida;
    }

    public void setOriginPermitida(final String originPermitida) {
        this.originPermitida = originPermitida;
    }

    public static class Seguranca {

        private boolean enableHttps;

        public boolean isEnableHttps() {
            return this.enableHttps;
        }

        public void setEnableHttps(final boolean enableHttps) {
            this.enableHttps = enableHttps;
        }
    }
}
