package br.com.samuel.lojaapi.exceptions.models;

public class NotFoundException extends Exception {
      
    private static final long serialVersionUID = 1L;

    public NotFoundException(String message) {
        super(message);
    }
}
