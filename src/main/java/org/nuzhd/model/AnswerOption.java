package org.nuzhd.model;

import java.util.Objects;

public class AnswerOption {

    private String option;
    private boolean isCorrect;

    public AnswerOption(String option, boolean isCorrect) {
        this.option = option;
        this.isCorrect = isCorrect;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerOption that = (AnswerOption) o;
        return Objects.equals(option, that.option);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(option);
    }
}
