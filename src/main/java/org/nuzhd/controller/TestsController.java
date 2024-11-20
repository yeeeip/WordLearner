package org.nuzhd.controller;

import org.nuzhd.dto.response.ModuleTestResponse;
import org.nuzhd.service.impl.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/word-learner/api/v1/tests")
public class TestsController {

    private final TestService testService;

    public TestsController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<ModuleTestResponse> generateTestByModule(@PathVariable("moduleId") UUID id) {
        ModuleTestResponse test = testService.generateTest(id);

        return ResponseEntity
                .ok(test);
    }
}
