package org.nuzhd.dto;

public record UserStatisticsDto(
        int currentStreak,
        int modulesCreated,
        int cardsCompleted,
        int matchesCompleted,
        int wordsLearned,
        int modulesCompleted,
        int testsCompleted
) {
}
