package org.nuzhd.service.impl;

import org.nuzhd.model.Achievement;
import org.nuzhd.repo.AchievementRepository;
import org.nuzhd.service.AchievementService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementServiceImpl(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    @Override
    public List<Achievement> findAll() {
        return achievementRepository.findAll();
    }
}
