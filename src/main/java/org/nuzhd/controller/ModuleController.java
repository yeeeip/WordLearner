package org.nuzhd.controller;

import org.nuzhd.dto.request.CreateModuleRequest;
import org.nuzhd.dto.response.CreatedModuleItemResponse;
import org.nuzhd.dto.response.ModuleItemResponse;
import org.nuzhd.dto.response.ModulePageResponse;
import org.nuzhd.dto.response.ModuleSubmissionResponse;
import org.nuzhd.model.Submission;
import org.nuzhd.model.WordModule;
import org.nuzhd.service.AppUserService;
import org.nuzhd.service.ModuleService;
import org.nuzhd.service.SubmissionService;
import org.nuzhd.utils.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/word-learner/api/v1/modules")
public class ModuleController {

    private final ModuleService moduleService;
    private final SubmissionService submissionService;
    private final AppUserService userService;

    public ModuleController(ModuleService moduleService, SubmissionService submissionService, AppUserService userService) {
        this.moduleService = moduleService;
        this.submissionService = submissionService;
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UUID> createModule(@RequestBody CreateModuleRequest m) {
        WordModule module = moduleService.saveWithCards(m);

        return ResponseEntity
                .status(201)
                .body(module.getId());
    }

    @GetMapping("/created")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CreatedModuleItemResponse>> getModulesCreatedByUser() {
        List<CreatedModuleItemResponse> createdByUser = moduleService.findCreatedModules();

        return ResponseEntity
                .status(200)
                .body(createdByUser);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<ModuleSubmissionResponse>> getCompletedModules() {
        List<Submission> submissions = submissionService.findAllByUserId(userService.getCurrentUser().getId());

        List<ModuleSubmissionResponse> response = submissions.stream()
                .map(Mappers.fromSubmissionToModuleSubmission)
                .toList();

        return ResponseEntity
                .ok(response);
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<ModulePageResponse> getModulePage(@PathVariable("moduleId") UUID id) {
        WordModule module = moduleService.findById(id);

        ModulePageResponse response = Mappers.fromModuleToModulePageResponse.apply(module);

        return ResponseEntity
                .ok(response);
    }

    @DeleteMapping("/{moduleId}")
    public ResponseEntity<Void> deleteModule(@PathVariable("moduleId") UUID moduleId) {
        moduleService.deleteById(moduleId);

        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping
    public ResponseEntity<List<ModuleItemResponse>> getAllModules() {

        List<WordModule> modules = moduleService.findAllModules();

        List<ModuleItemResponse> response = modules.stream()
                .map(Mappers.fromModuleToModuleItemResponse)
                .toList();

        return ResponseEntity
                .ok(response);
    }

}
