package org.nuzhd.model;

import jakarta.persistence.*;
import org.nuzhd.dto.AchievementDto;

import java.util.UUID;

@Entity
@Table(name = "achievements")
@NamedNativeQuery(name = "Achievement.findAllWithStatus",
        query = """
                SELECT ac.name, ac.achievement_category, u_ac.achieved from achievements ac
                JOIN user_achievements u_ac ON ac.id = u_ac.achievement_id 
                """,
        resultClass = AchievementDto.class)
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(value = EnumType.STRING)
    private AchievementCategory category;

    private String name;

    public UUID getId() {
        return id;
    }

    public AchievementCategory getCategory() {
        return category;
    }

    public String getName() {
        return name;
    }
}
