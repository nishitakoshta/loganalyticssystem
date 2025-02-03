package com.example.loganalyticssystem.service.impl;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import com.example.loganalyticssystem.service.LogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@Service
public class LogServiceImpl implements LogService {
    private final KafkaTemplate<String, String> kafkaTemplate;
    public LogServiceImpl(KafkaTemplate<String, String> kafkaTemplate){
        this.kafkaTemplate = kafkaTemplate;
    }
    @Override
    public void addLogs(ElasticsearchLogEntry logEntry){
        kafkaTemplate.send("logs_topic", logEntry.getLogMessage());
    }
    @Override
    public ResponseEntity<String> uploadLogFile(MultipartFile file) {
        try {
            // Read log file contents
            String logContent = new String(file.getBytes(), StandardCharsets.UTF_8);
            String title = file.getOriginalFilename();
            String id = UUID.randomUUID().toString();

            // Create log data map
            Map<String, Object> logData = new HashMap<>();
            logData.put("id", id);
            logData.put("title", title);
            logData.put("logMessage", logContent);
            logData.put("timestamp", ZonedDateTime.now().toString());

            // Convert logData map to JSON string
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            String jsonMessage = objectMapper.writeValueAsString(logData);

            // Log what is being sent
            System.out.println("Sending JSON to Kafka: " + jsonMessage);

            // Send to Kafka
            kafkaTemplate.send("logs_topic", jsonMessage);

            return ResponseEntity.ok("Log file uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process log file.");
        }
    }



}
