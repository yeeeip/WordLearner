package org.nuzhd.controller;

import org.nuzhd.dto.request.SubmissionRequest;
import org.nuzhd.model.Submission;
import org.nuzhd.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/word-learner/api/v1/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public ResponseEntity<Submission> acceptSubmission(@RequestBody SubmissionRequest submissionRequest) {
        Submission submission = submissionService.saveSubmission(submissionRequest);

        return ResponseEntity
                .status(201)
                .build();
    }

}
