package org.nuzhd.service;

import org.nuzhd.dto.request.CreateModuleRequest;
import org.nuzhd.dto.response.CreatedModuleItemResponse;
import org.nuzhd.model.WordModule;

import java.util.List;
import java.util.UUID;

public interface ModuleService {

    WordModule saveWithCards(CreateModuleRequest module);

    List<CreatedModuleItemResponse> findCreatedModules();

    WordModule findById(UUID id);

    List<WordModule> findAllModules();

    void deleteById(UUID id);
}
