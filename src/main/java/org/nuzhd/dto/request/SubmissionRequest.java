package org.nuzhd.dto.request;

import org.nuzhd.dto.SubmissionType;

import java.util.UUID;

public record SubmissionRequest(
        Integer correct,
        UUID moduleId,
        SubmissionType type
) {
}
