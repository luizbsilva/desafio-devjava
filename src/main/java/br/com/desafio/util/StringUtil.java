package br.com.desafio.util;

import org.springframework.util.StringUtils;

public class StringUtil {
    
    public static String removeCaracteresDeNumeros(final String texto) {
        
        if (StringUtils.isEmpty(texto)) {
            return "";
        }
        
        final StringBuilder textoNumerico = new StringBuilder(texto.length());
        
        for (int cotador = 0; cotador < texto.length(); cotador++) {
            final char caracter = texto.charAt(cotador);
            
            if (caracter > 47 && caracter < 58) {
                textoNumerico.append(caracter);
            }
        }
        
        return textoNumerico.toString();
    }
    
}
