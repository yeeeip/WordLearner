package org.nuzhd.service.impl;

import jakarta.transaction.Transactional;
import org.nuzhd.dto.request.CreateModuleRequest;
import org.nuzhd.dto.response.CreatedModuleItemResponse;
import org.nuzhd.exception.ModuleNotFoundException;
import org.nuzhd.model.AppUser;
import org.nuzhd.model.WordModule;
import org.nuzhd.repo.ModuleRepository;
import org.nuzhd.service.AppUserService;
import org.nuzhd.service.FileService;
import org.nuzhd.service.ModuleService;
import org.nuzhd.utils.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final FileService fileService;
    private final AppUserService userService;
    private static final Logger logger = LoggerFactory.getLogger(ModuleServiceImpl.class);

    public ModuleServiceImpl(ModuleRepository moduleRepository, FileService fileService, AppUserService userService) {
        this.moduleRepository = moduleRepository;
        this.fileService = fileService;
        this.userService = userService;
    }

    @Override
    @Transactional
    public WordModule saveWithCards(CreateModuleRequest request) {

        AppUser author = userService.getCurrentUser();

        WordModule module = new WordModule(
                request.title(),
                request.description(),
                request.wordCount(),
                LocalDateTime.now(),
                request.words()
                        .stream()
                        .map(Mappers.fromWordCardDto)
                        .toList(),
                author
        );

        author.getUserStats().setModulesCreated(
                author.getUserStats().getModulesCreated() + 1
        );

        userService.save(author);

        return moduleRepository.save(module);
    }

    @Override
    public List<CreatedModuleItemResponse> findCreatedModules() {
        UUID id = userService.getCurrentUser().getId();

        return moduleRepository.findAllByAuthor_Id(id)
                .stream()
                .map(Mappers.fromModuleToCreatedModule)
                .toList();
    }

    @Override
    public WordModule findById(UUID id) {
        return findOrThrow(id);
    }

    public WordModule findOrThrow(UUID id) {
        return moduleRepository.findById(id)
                .orElseThrow(() ->
                        new ModuleNotFoundException("Module with id: %s not found".formatted(id.toString()))
                );
    }

    @Override
    public List<WordModule> findAllModules() {
        return moduleRepository.findAll();
    }

    @Override
    public void deleteById(UUID id) {
        moduleRepository.deleteById(id);
    }
}
