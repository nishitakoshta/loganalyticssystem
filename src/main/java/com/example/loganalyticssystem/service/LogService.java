package com.example.loganalyticssystem.service;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
public interface LogService {
    void addLogs(ElasticsearchLogEntry logEntry);
    ResponseEntity<String> uploadLogFile(MultipartFile file);
}
