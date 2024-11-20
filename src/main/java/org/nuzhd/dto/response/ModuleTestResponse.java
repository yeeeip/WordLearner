package org.nuzhd.dto.response;

import org.nuzhd.model.TestQuestion;

import java.util.List;
import java.util.UUID;

public class ModuleTestResponse {

    private String title;
    private Integer questionCount;
    private UUID moduleId;
    private List<TestQuestion> questions;

    public ModuleTestResponse(String title, Integer questionCount, UUID moduleId) {
        this.title = title;
        this.questionCount = questionCount;
        this.moduleId = moduleId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(Integer questionCount) {
        this.questionCount = questionCount;
    }

    public UUID getModuleId() {
        return moduleId;
    }

    public void setModuleId(UUID moduleId) {
        this.moduleId = moduleId;
    }

    public List<TestQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<TestQuestion> questions) {
        this.questions = questions;
    }
}
