package org.nuzhd.exception;

public record CustomErrorResponse(
        int status,
        String message,
        String originalMessage
) {
}
