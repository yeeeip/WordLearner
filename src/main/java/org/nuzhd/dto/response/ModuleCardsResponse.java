package org.nuzhd.dto.response;

import org.nuzhd.dto.WordTranslationWithCardDto;

import java.util.List;
import java.util.UUID;

public record ModuleCardsResponse(
        String title,
        List<WordTranslationWithCardDto> cards,
        UUID moduleId
) {
}
