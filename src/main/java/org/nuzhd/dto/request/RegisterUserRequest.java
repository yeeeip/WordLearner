package org.nuzhd.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record RegisterUserRequest(
        @NotBlank
        @Length(min = 2, max = 50, message = "Имя пользователя должно содержать от {min} до {max} символов")
        String username,
        @Email(message = "Неверный формат адреса электронной почты")
        String email,
        @NotBlank
        @Length(min = 8, max = 50, message = "Пароль должен содержать от {min} до {max} символов")
        String password,
        @JsonProperty("passwordConf")
        String passwordConfirmation
) {
}
