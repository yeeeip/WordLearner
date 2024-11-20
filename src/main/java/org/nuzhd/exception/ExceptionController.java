package org.nuzhd.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorResponse onInvalidJson(HttpMessageNotReadableException ex) {
        return new CustomErrorResponse(400, "Ошибка парсинга JSON", ex.getMessage());
    }

    @ExceptionHandler(ModuleNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorResponse onModuleNotExist(ModuleNotFoundException ex) {
        return new CustomErrorResponse(400, "Модуль не найден", ex.getMessage());
    }

    @ExceptionHandler(UsernameExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorResponse onUsernameExists(UsernameExistsException ex) {
        return new CustomErrorResponse(400, "Пользователь с таким логином уже существует", ex.getMessage());
    }

    @ExceptionHandler(EmailExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorResponse onEmailExists(EmailExistsException ex) {
        return new CustomErrorResponse(400, "Пользователь с таким email уже существует", ex.getMessage());
    }

    @ExceptionHandler(UnknownSubmissionTypeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorResponse onUnknownSubmissionType(UnknownSubmissionTypeException ex) {
        return new CustomErrorResponse(400, "Некорректный submission", ex.getMessage());
    }

}
