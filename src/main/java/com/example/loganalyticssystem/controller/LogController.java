package com.example.loganalyticssystem.controller;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import com.example.loganalyticssystem.repository.OpenSearchRepository;
import com.example.loganalyticssystem.service.LogService;
import com.example.loganalyticssystem.service.OpenSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/logs")
@CrossOrigin
public class LogController {
    private final LogService logService;
    private final OpenSearchService openSearchService;
    private final OpenSearchRepository openSearchRepository;
    public LogController(LogService logService, OpenSearchService openSearchService, OpenSearchRepository openSearchRepository) {
        this.logService = logService;
        this.openSearchService = openSearchService;
        this.openSearchRepository = openSearchRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addLog(@RequestBody ElasticsearchLogEntry logEntry) {
        logService.addLogs(logEntry);
        return ResponseEntity.ok("Log sent to Kafka!");
    }
    @GetMapping("/latest")
    public ResponseEntity<List<Map<String, Object>>> getLatestLogs() {
        return ResponseEntity.ok(openSearchService.getLatestLogs());
    }
    @GetMapping("/search")
    public ResponseEntity<List<ElasticsearchLogEntry>> searchLogs(@RequestParam String keyword) {
        return ResponseEntity.ok(openSearchService.searchLogsByKeyword(keyword));
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadLogFile(@RequestParam("file") MultipartFile file) {
        return logService.uploadLogFile(file);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ElasticsearchLogEntry> getLogById(@PathVariable String id) {
        try {
            Optional<ElasticsearchLogEntry> log = openSearchRepository.findById(id);
            return log.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


}

