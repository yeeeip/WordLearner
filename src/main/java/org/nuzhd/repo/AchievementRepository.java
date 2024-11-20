package org.nuzhd.repo;

import org.nuzhd.dto.AchievementDto;
import org.nuzhd.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AchievementRepository extends JpaRepository<Achievement, UUID> {

    @Query(value = """
            SELECT new org.nuzhd.dto.AchievementDto(a.name, a.category, u_a.achieved) FROM UserAchievements u_a
            JOIN Achievement a ON a.id = u_a.achievementId
            WHERE u_a.userId = ?1
            """)
    List<AchievementDto> findAllAchievedByUser(UUID userId);

}
