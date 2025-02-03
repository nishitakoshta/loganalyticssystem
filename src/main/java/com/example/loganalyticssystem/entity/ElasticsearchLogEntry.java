package com.example.loganalyticssystem.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
@Document(indexName = "logs_index")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ElasticsearchLogEntry {
    @Id
    private String id;

    private String logMessage;
    private String title;
    private ZonedDateTime timestamp = ZonedDateTime.now();
}

