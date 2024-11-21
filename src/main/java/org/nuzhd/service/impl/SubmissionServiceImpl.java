package org.nuzhd.service.impl;

import jakarta.transaction.Transactional;
import org.nuzhd.dto.request.SubmissionRequest;
import org.nuzhd.exception.UnknownSubmissionTypeException;
import org.nuzhd.model.*;
import org.nuzhd.repo.AchievementRepository;
import org.nuzhd.repo.SubmissionRepository;
import org.nuzhd.service.AppUserService;
import org.nuzhd.service.ModuleService;
import org.nuzhd.service.SubmissionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    private final ModuleService moduleService;
    private final SubmissionRepository submissionRepo;
    private final AppUserService appUserService;

    public SubmissionServiceImpl(ModuleService moduleService, SubmissionRepository submissionRepo, AppUserService appUserService) {
        this.moduleService = moduleService;
        this.submissionRepo = submissionRepo;
        this.appUserService = appUserService;
    }

    @Override
    @Transactional
    public Submission saveSubmission(SubmissionRequest submissionRequest) {
        WordModule module = moduleService.findById(submissionRequest.moduleId());
        AppUser user = appUserService.getCurrentUser();

        Submission submission = submissionRepo.findByPkModuleIdAndPkUserId(user.getId(), submissionRequest.moduleId())
                .orElse(new Submission(0, LocalDateTime.now(), module, appUserService.getCurrentUser()));

        int diff = submissionRequest.correct() - submission.getResult();

        if (diff > 0) {
            user.getUserStats().setWordsLearned(
                    user.getUserStats().getWordsLearned() + diff
            );
        }

        if (submission.getResult() < module.getWordCount() && submissionRequest.correct() >= module.getWordCount()) {
            user.getUserStats().setModulesCompleted(
                    user.getUserStats().getModulesCompleted() + 1
            );
        }

        submission.setResult(
                Math.max(submission.getResult(), submissionRequest.correct())
        );

        switch (submissionRequest.type()) {
            case TEST -> user.getUserStats().setTestsCompleted(
                    user.getUserStats().getTestsCompleted() + 1
            );
            case MATCH -> user.getUserStats().setMatchesCompleted(
                    user.getUserStats().getMatchesCompleted() + 1
            );
            case CARDS -> user.getUserStats().setCardsCompleted(
                    user.getUserStats().getCardsCompleted() + 1
            );
            default -> throw new UnknownSubmissionTypeException("Некорректный тип теста");
        }

        appUserService.save(user);
        return submissionRepo.save(submission);
    }

    @Override
    public List<Submission> findAllByUserId(UUID id) {
        return submissionRepo.findAllByUser_Id(id);
    }
}
