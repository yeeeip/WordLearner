package org.nuzhd.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@IdClass(AchievementCompositeKey.class)
@Table(name = "user_achievements")
public class UserAchievements {

    @Id
    @Column(name = "user_id")
    private UUID userId;
    @Id
    @Column(name = "achievement_id")
    private UUID achievementId;
    private boolean achieved;
}

class AchievementCompositeKey {
    private UUID userId;
    private UUID achievementId;

    public AchievementCompositeKey(UUID userId, UUID achievementId) {
        this.userId = userId;
        this.achievementId = achievementId;
    }
}
