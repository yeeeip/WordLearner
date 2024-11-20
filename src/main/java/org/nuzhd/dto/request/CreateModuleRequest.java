package org.nuzhd.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.nuzhd.dto.WordTranslationWithCardDto;

import java.util.List;

public record CreateModuleRequest(
        @NotBlank(message = "Название модуля не может быть пустым")
        @Size(min = 5, max = 100, message = "Название модуля должно содержать от {min} до {max} символов")
        String title,
        @NotBlank(message = "Описание модуля не может быь пустым")
        @Size(min = 5, max = 100, message = "Описание модуля должно содержать от {min} до {max} символов")
        String description,
        @Min(value = 5, message = "Модуль должен содержать хотя бы 5 слов")
        @Max(value = 30, message = "Модуль должен содержать не более 30 слов")
        Integer wordCount,
        @Size(min = 5,max = 30)
        List<WordTranslationWithCardDto> words
) {
}
