package org.nuzhd.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {

    byte[] getByFileName(String fileName);
}
