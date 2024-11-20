package org.nuzhd.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record ModuleItemResponse(
        UUID id,
        String title,
        Integer wordCount,
        LocalDateTime createdAt,
        String authorUsername
) {
}
