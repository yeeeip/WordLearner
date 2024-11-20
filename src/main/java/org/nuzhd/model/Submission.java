package org.nuzhd.model;

import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int result;
    @UpdateTimestamp
    private LocalDateTime lastSubmission;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private WordModule module;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AppUser user;

    public Submission() {
    }

    public Submission(int result, LocalDateTime lastSubmission, WordModule module, AppUser user) {
        this.result = result;
        this.lastSubmission = lastSubmission;
        this.module = module;
        this.user = user;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public Integer getResult() {
        return result;
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getLastSubmission() {
        return lastSubmission;
    }

    public WordModule getModule() {
        return module;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public void setLastSubmission(LocalDateTime lastSubmission) {
        this.lastSubmission = lastSubmission;
    }

    public void setModule(WordModule module) {
        this.module = module;
    }
}
