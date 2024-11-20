package org.nuzhd.exception;

public class FileDownloadException extends RuntimeException {
    public FileDownloadException(String message) {
        super(message);
    }

    public FileDownloadException(Throwable cause) {
        super(cause);
    }
}
