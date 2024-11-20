package org.nuzhd.repo;

import org.nuzhd.model.WordModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ModuleRepository extends JpaRepository<WordModule, UUID> {

    List<WordModule> findAllByAuthor_Id(UUID id);

}
