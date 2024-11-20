package org.nuzhd.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreatedModuleItemResponse(UUID id,
                                        String title,
                                        Integer wordCount,
                                        LocalDateTime createdAt) {
}
