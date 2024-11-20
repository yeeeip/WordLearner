package org.nuzhd.dto.response;

import org.nuzhd.dto.WordTranslationDto;

import java.util.List;

public record ModulePageResponse(
        String title,
        String description,
        List<WordTranslationDto> words
) {
}
