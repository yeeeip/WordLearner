package org.nuzhd.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "word_card")
public class WordCard {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String wordEn;
    private String wordRu;
    private String cardImg;

    public WordCard() {
    }

    public WordCard(String wordEn, String wordRu, String cardImg) {
        this.wordEn = wordEn;
        this.wordRu = wordRu;
        this.cardImg = cardImg;
    }

    public String getWordEn() {
        return wordEn;
    }

    public String getWordRu() {
        return wordRu;
    }

    public String getCardImg() {
        return cardImg;
    }

    public void setWordEn(String wordEn) {
        this.wordEn = wordEn;
    }

    public void setWordRu(String wordRu) {
        this.wordRu = wordRu;
    }

    public void setCardImg(String cardImg) {
        this.cardImg = cardImg;
    }
}
