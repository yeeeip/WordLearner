package org.nuzhd.dto.response;

import java.util.List;
import java.util.UUID;

public record ModuleMatchResponse(
        String title,
        UUID moduleId,
        Integer wordCount,
        List<String> enWords,
        List<String> ruWords,
        List<Integer> answer
) {
}
