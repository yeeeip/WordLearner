package org.nuzhd.exception;

public class ModuleNotFoundException extends RuntimeException{
    public ModuleNotFoundException(String message) {
        super(message);
    }
}
