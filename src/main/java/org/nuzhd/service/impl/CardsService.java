package org.nuzhd.service.impl;

import org.nuzhd.dto.WordTranslationWithCardDto;
import org.nuzhd.dto.response.ModuleCardsResponse;
import org.nuzhd.model.WordCard;
import org.nuzhd.model.WordModule;
import org.nuzhd.service.ModuleService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class CardsService {

    private final ModuleService moduleService;

    public CardsService(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    public ModuleCardsResponse generateCards(UUID moduleId) {
        WordModule module = moduleService.findById(moduleId);

        List<WordTranslationWithCardDto> cards = new ArrayList<>();

        for (WordCard card : module.getWords()) {
            cards.add(new WordTranslationWithCardDto(card.getWordEn(), card.getWordRu(), card.getCardImg()));
        }

        Collections.shuffle(cards);

        return new ModuleCardsResponse(module.getTitle(), cards, module.getId());
    }

}
