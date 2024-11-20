package org.nuzhd.model;

import java.util.List;

public class TestQuestion {

    private String question;
    private List<AnswerOption> options;

    public TestQuestion(String question, List<AnswerOption> options) {
        this.question = question;
        this.options = options;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<AnswerOption> getOptions() {
        return options;
    }

    public void setOptions(List<AnswerOption> options) {
        this.options = options;
    }


}
