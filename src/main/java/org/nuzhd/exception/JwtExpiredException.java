package org.nuzhd.exception;

public class JwtExpiredException extends RuntimeException{

    public JwtExpiredException(String message) {
        super(message);
    }
}
