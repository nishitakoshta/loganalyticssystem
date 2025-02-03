package com.example.loganalyticssystem.kafkaconfig;

import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.example.loganalyticssystem.repository.OpenSearchRepository;  // Assuming you have this

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
@EnableKafka
@Service
public class KafkaConsumerConfig {

    private final OpenSearchRepository openSearchRepository; // Assuming you have OpenSearch repo

    public KafkaConsumerConfig(OpenSearchRepository openSearchRepository) {
        this.openSearchRepository = openSearchRepository;
    }

    // KafkaListener to listen for messages on logs_topic
    @KafkaListener(topics = "logs_topic", groupId = "logGroup")
    public void listen(String message) {
        indexLogInOpenSearch(message);  // Index it into OpenSearch
    }

    // Method to index log message in OpenSearch
    private void indexLogInOpenSearch(String logMessage) {
        ElasticsearchLogEntry logEntry = ElasticsearchLogEntry.builder()
                .logMessage(logMessage)
                .timestamp(ZonedDateTime.now())
                .build();

        // Save log entry into OpenSearch
        openSearchRepository.save(logEntry);
    }
}

