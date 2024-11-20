package org.nuzhd.service.impl;

import org.nuzhd.dto.response.ModuleTestResponse;
import org.nuzhd.model.*;
import org.nuzhd.service.ModuleService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TestService {

    private final ModuleService moduleService;
    private final Random rand = new Random();

    public TestService(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    public ModuleTestResponse generateTest(UUID moduleId) {
        WordModule module = moduleService.findById(moduleId);

        ModuleTestResponse test = new ModuleTestResponse(
                module.getTitle(),
                module.getWordCount(),
                module.getId()
        );

        List<TestQuestion> questions = generateQuestions(test.getQuestionCount(), module.getWords());
        test.setQuestions(questions);

        return test;
    }

    private List<TestQuestion> generateQuestions(int n, List<WordCard> wordCards) {
        List<TestQuestion> questions = new ArrayList<>(n);
        for (WordCard c : wordCards) {
            questions.add(new TestQuestion(
                    c.getWordEn(), generateAnswerOptions(new ArrayList<>(wordCards), c, 4)
            ));
        }

        return questions;
    }

    private List<AnswerOption> generateAnswerOptions(List<WordCard> wordCards, WordCard answer, int nOptions) {
        Set<AnswerOption> options = new HashSet<>();
        options.add(new AnswerOption(answer.getWordRu(), true));
        wordCards.remove(answer);

        while (options.size() < nOptions) {
            WordCard opt = wordCards.get(rand.nextInt(0, wordCards.size()));
            options.add(new AnswerOption(opt.getWordRu(), false));
        }

        return options
                .stream()
                .toList();
    }


}
