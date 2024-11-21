package org.nuzhd.utils;

import org.nuzhd.dto.UserStatisticsDto;
import org.nuzhd.dto.WordTranslationDto;
import org.nuzhd.dto.WordTranslationWithCardDto;
import org.nuzhd.dto.response.CreatedModuleItemResponse;
import org.nuzhd.dto.response.ModuleItemResponse;
import org.nuzhd.dto.response.ModulePageResponse;
import org.nuzhd.dto.response.ModuleSubmissionResponse;
import org.nuzhd.model.Submission;
import org.nuzhd.model.UserStatistics;
import org.nuzhd.model.WordCard;
import org.nuzhd.model.WordModule;

import java.util.function.Function;

public class Mappers {

    public static final Function<WordTranslationWithCardDto, WordCard> fromWordCardDto =
            dto -> {
                if (dto.cardImg() == null) {
                    return new WordCard(dto.wordEn(), dto.wordRu(), "default.png");
                }
                return new WordCard(dto.wordEn(), dto.wordRu(), dto.cardImg());
            };

    public static final Function<WordModule, CreatedModuleItemResponse> fromModuleToCreatedModule =
            dto -> new CreatedModuleItemResponse(dto.getId(), dto.getTitle(), dto.getWordCount(), dto.getCreatedAt());

    public static final Function<UserStatistics, UserStatisticsDto> fromUserStatsToStatsDto =
            stats -> new UserStatisticsDto(
                    stats.getCurrentStreak(),
                    stats.getModulesCreated(),
                    stats.getCardsCompleted(),
                    stats.getMatchesCompleted(),
                    stats.getWordsLearned(),
                    stats.getModulesCompleted(),
                    stats.getTestsCompleted()
            );

    public static final Function<WordCard, WordTranslationDto> fromWordCardToWordTransaltion =
            w -> new WordTranslationDto(w.getWordEn(), w.getWordRu());

    public static final Function<WordModule, ModulePageResponse> fromModuleToModulePageResponse =
            m -> new ModulePageResponse(
                    m.getTitle(),
                    m.getDescription(),
                    m.getWords().stream().map(fromWordCardToWordTransaltion).toList()
            );

    public static final Function<WordModule, ModuleItemResponse> fromModuleToModuleItemResponse =
            m -> new ModuleItemResponse(
                    m.getId(),
                    m.getTitle(),
                    m.getWordCount(),
                    m.getCreatedAt(),
                    m.getAuthor().getUsername()
            );

    public static final Function<Submission, ModuleSubmissionResponse> fromSubmissionToModuleSubmission =
            s -> new ModuleSubmissionResponse(
                    s.getModule().getId(),
                    s.getModule().getTitle(),
                    s.getResult(),
                    s.getModule().getWordCount(),
                    s.getLastSubmission(),
                    s.getModule().getAuthor().getUsername()
            );
}
