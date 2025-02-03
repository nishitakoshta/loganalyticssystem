package com.example.loganalyticssystem.service.impl;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import com.example.loganalyticssystem.repository.OpenSearchRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.UUID;
@Service
@EnableKafka
public class LogEntryKafkaConsumerServiceImpl {
    private final OpenSearchRepository openSearchRepository;
    public LogEntryKafkaConsumerServiceImpl(@Qualifier("openSearchRepository")OpenSearchRepository openSearchRepository){
        this.openSearchRepository = openSearchRepository;
    }
    @KafkaListener(topics = "logs_topic", groupId = "logGroup")
    public void listen(String message) {
        // When a message is consumed, index it in OpenSearch
        indexLogInOpenSearch(message);
    }

    private void indexLogInOpenSearch(String logMessage) {
        // Index the log in OpenSearch
        ElasticsearchLogEntry logEntry = new ElasticsearchLogEntry();
        logEntry.setId(UUID.randomUUID().toString());
        logEntry.setLogMessage(logMessage);
        logEntry.setTimestamp(ZonedDateTime.now());

        // Index into OpenSearch (use OpenSearch repository)
        openSearchRepository.save(logEntry);
    }
}
