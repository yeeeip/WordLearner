package org.nuzhd.dto;

import org.nuzhd.model.AchievementCategory;

public record AchievementDto(String name,
                             AchievementCategory category,
                             boolean achieved) {
}
