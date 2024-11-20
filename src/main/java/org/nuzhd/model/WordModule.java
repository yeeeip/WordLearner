package org.nuzhd.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "module")
public class WordModule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String title;
    private String description;
    private Integer wordCount;
    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private List<WordCard> words;

    @ManyToOne
    private AppUser author;

    public WordModule() {
    }

    public WordModule(String title, String description, Integer wordCount, LocalDateTime createdAt, List<WordCard> words, AppUser author) {
        this.title = title;
        this.description = description;
        this.wordCount = wordCount;
        this.createdAt = createdAt;
        this.words = words;
        this.author = author;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<WordCard> getWords() {
        return words;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWords(List<WordCard> words) {
        this.words = words;
    }

    public Integer getWordCount() {
        return wordCount;
    }

    public void setWordCount(Integer wordCount) {
        this.wordCount = wordCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public AppUser getAuthor() {
        return author;
    }

    @Override
    public String toString() {
        return "WordModule{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", words=" + words +
                '}';
    }
}
