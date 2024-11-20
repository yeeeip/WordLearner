package org.nuzhd.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "user_statistics")
public class UserStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int currentStreak;
    private int modulesCreated;
    private int cardsCompleted;
    private int matchesCompleted;
    private int wordsLearned;
    private int modulesCompleted;
    private int testsCompleted;

    public UUID getId() {
        return id;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public Integer getModulesCreated() {
        return modulesCreated;
    }

    public void setModulesCreated(Integer modulesCreated) {
        this.modulesCreated = modulesCreated;
    }

    public Integer getCardsCompleted() {
        return cardsCompleted;
    }

    public void setCardsCompleted(Integer cardsCompleted) {
        this.cardsCompleted = cardsCompleted;
    }

    public Integer getMatchesCompleted() {
        return matchesCompleted;
    }

    public void setMatchesCompleted(Integer matchesCompleted) {
        this.matchesCompleted = matchesCompleted;
    }

    public Integer getWordsLearned() {
        return wordsLearned;
    }

    public void setWordsLearned(Integer wordsLearned) {
        this.wordsLearned = wordsLearned;
    }

    public Integer getModulesCompleted() {
        return modulesCompleted;
    }

    public void setModulesCompleted(Integer modulesCompleted) {
        this.modulesCompleted = modulesCompleted;
    }

    public Integer getTestsCompleted() {
        return testsCompleted;
    }

    public void setTestsCompleted(Integer testsCompleted) {
        this.testsCompleted = testsCompleted;
    }
}
