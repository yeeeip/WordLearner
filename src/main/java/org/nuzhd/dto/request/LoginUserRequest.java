package org.nuzhd.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginUserRequest(
        @Email(message = "Неверный формат электронной почты")
        String email,
        @NotBlank(message = "Пароль не может быть пустым")
        String password
) {
}
