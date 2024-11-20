package org.nuzhd.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record ModuleSubmissionResponse(
        UUID id,
        String title,
        Integer result,
        Integer wordCount,
        LocalDateTime lastSubmission,
        String authorUsername
) {
}
