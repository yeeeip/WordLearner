package org.nuzhd.controller;

import org.nuzhd.dto.response.ModuleMatchResponse;
import org.nuzhd.service.impl.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/word-learner/api/v1/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<ModuleMatchResponse> generateTestByModule(@PathVariable("moduleId") UUID id) {
        ModuleMatchResponse test = matchService.generateMatchTest(id);

        return ResponseEntity
                .ok(test);
    }
}
