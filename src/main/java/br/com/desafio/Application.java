package br.com.desafio;

import br.com.desafio.config.property.ApiProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableConfigurationProperties(ApiProperty.class)
@EnableCaching
public class Application {
    
    private static ApplicationContext applicationContext;
    
    public static void main(final String[] args) {
        applicationContext = SpringApplication.run(Application.class, args);
    }
    
    public static <T> T getBean(final Class<T> type) {
        return applicationContext.getBean(type);
        
    }
    
}
