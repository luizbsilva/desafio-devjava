package br.com.desafio.exceptionhandler;



public class CPFException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CPFException(String message) {
		super(message);
	}


}
