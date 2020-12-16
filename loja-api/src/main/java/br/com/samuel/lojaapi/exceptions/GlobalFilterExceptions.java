package br.com.samuel.lojaapi.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import br.com.samuel.lojaapi.entity.Error;
import br.com.samuel.lojaapi.exceptions.models.NotFoundException;

@ControllerAdvice
public class GlobalFilterExceptions {

    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleNotFoundException(NotFoundException ex) {
        Error error = new Error(HttpStatus.NOT_FOUND, "Recurso não encontrado", ex.getMessage());
        return error;
    }
}
