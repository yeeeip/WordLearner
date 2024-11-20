package org.nuzhd.service;

import org.nuzhd.dto.request.SubmissionRequest;
import org.nuzhd.model.Submission;

import java.util.List;
import java.util.UUID;

public interface SubmissionService {

    Submission saveSubmission(SubmissionRequest submissionRequest);

    List<Submission> findAllByUserId(UUID id);
}
