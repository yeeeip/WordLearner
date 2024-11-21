package org.nuzhd.repo;

import org.nuzhd.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    Optional<Submission> findByModuleId(UUID id);

    Optional<Submission> findByModuleIdAndUserId(UUID moduleId, UUID userId);

    List<Submission> findAllByUser_Id(UUID id);

}
