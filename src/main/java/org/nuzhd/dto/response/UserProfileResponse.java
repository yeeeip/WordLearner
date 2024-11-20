package org.nuzhd.dto.response;

import org.nuzhd.dto.AchievementDto;
import org.nuzhd.dto.UserStatisticsDto;
import org.nuzhd.model.AchievementCategory;

import java.util.EnumMap;
import java.util.List;

public record UserProfileResponse(String username, String email,
                                  UserStatisticsDto userStatisticsDto,
                                  EnumMap<AchievementCategory, List<AchievementDto>> achievements) {
}
