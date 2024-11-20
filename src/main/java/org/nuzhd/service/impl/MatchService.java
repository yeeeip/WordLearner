package org.nuzhd.service.impl;

import org.nuzhd.dto.response.ModuleMatchResponse;
import org.nuzhd.model.WordCard;
import org.nuzhd.model.WordModule;
import org.nuzhd.service.ModuleService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final ModuleService moduleService;

    public MatchService(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    public ModuleMatchResponse generateMatchTest(UUID moduleId) {
        WordModule module = moduleService.findById(moduleId);

        List<WordCard> words = module.getWords();

        List<String> ruWords = words.stream()
                .map(WordCard::getWordRu)
                .collect(Collectors.toList());
        List<String> enWords = words.stream()
                .map(WordCard::getWordEn)
                .toList();

        Collections.shuffle(ruWords);

        List<Integer> answer = new ArrayList<>();

        for (WordCard w : words) {
            for (int i = 0; i < ruWords.size(); i++) {
                if (w.getWordRu().equals(ruWords.get(i))) {
                    answer.add(i+1);
                }
            }
        }

        return new ModuleMatchResponse(
                module.getTitle(),
                module.getId(),
                module.getWordCount(),
                enWords,
                ruWords,
                answer
        );
    }

}
