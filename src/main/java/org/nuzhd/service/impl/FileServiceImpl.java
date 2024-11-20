package org.nuzhd.service.impl;

import org.nuzhd.exception.FileDownloadException;
import org.nuzhd.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class FileServiceImpl implements FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Override
    public byte[] getByFileName(String fileName) {

        byte[] fileContents;
        try {
            fileContents = Files.readAllBytes(new File("src/main/resources/default.png").toPath());
        } catch (IOException e) {
            logger.error("Unable to find file {}, returning null", fileName);
            throw new FileDownloadException(e);
        }

        return fileContents;
    }
}
