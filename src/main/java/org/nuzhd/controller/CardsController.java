package org.nuzhd.controller;

import org.nuzhd.dto.response.ModuleCardsResponse;
import org.nuzhd.service.impl.CardsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/word-learner/api/v1/cards")
public class CardsController {

    private final CardsService cardsService;

    public CardsController(CardsService cardsService) {
        this.cardsService = cardsService;
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<ModuleCardsResponse> getModuleCards(@PathVariable("moduleId") UUID id) {

        ModuleCardsResponse response = cardsService.generateCards(id);

        return ResponseEntity
                .ok(response);
    }

}
