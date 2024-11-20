package org.nuzhd.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record UpdateUserDataRequest(
        @NotBlank
        @Length(min = 2, max = 50, message = "Имя пользователя должно содержать от {min} до {max} символов")
        String username,
        @Email(message = "Некорректный email")
        String email
) {
}
