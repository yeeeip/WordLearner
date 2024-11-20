package org.nuzhd.dto.response;

public record UpdateUserDataResponse(
        String newUsername,
        String newEmail,
        String newToken
) {
}
