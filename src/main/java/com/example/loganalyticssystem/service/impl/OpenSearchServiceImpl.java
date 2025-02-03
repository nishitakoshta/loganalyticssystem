package com.example.loganalyticssystem.service.impl;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import com.example.loganalyticssystem.repository.OpenSearchRepository;
import com.example.loganalyticssystem.service.OpenSearchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.opensearch.action.search.SearchRequest;
import org.opensearch.action.search.SearchResponse;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.index.query.QueryBuilders;
import org.opensearch.search.SearchHit;
import org.opensearch.search.builder.SearchSourceBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class OpenSearchServiceImpl implements OpenSearchService {
    private final RestHighLevelClient openSearchClient;
    private final OpenSearchRepository openSearchRepository;

    public OpenSearchServiceImpl(RestHighLevelClient openSearchClient, OpenSearchRepository openSearchRepository) {
        this.openSearchClient = openSearchClient;
        this.openSearchRepository = openSearchRepository;
    }
    @Override
    public List<Map<String, Object>> getLatestLogs() {
        Page<ElasticsearchLogEntry> logsPage = (Page<ElasticsearchLogEntry>) openSearchRepository.findAll(); // Get the first 10 logs

        // Convert Page to List
        List<ElasticsearchLogEntry> logs = logsPage.getContent(); // Or any other custom query
        List<ElasticsearchLogEntry> mutableLogs = new ArrayList<>(logs);

        // Sort the logs manually by timestamp in descending order
        mutableLogs.sort((log1, log2) -> log2.getTimestamp().compareTo(log1.getTimestamp()));
        // Format the logs before sending to frontend
        List<Map<String, Object>> formattedLogs = mutableLogs.stream()
                .map(log -> {
                    Map<String, Object> logMap = new HashMap<>();
                    logMap.put("id", log.getId());
                    logMap.put("message", log.getLogMessage());
                    logMap.put("timestamp", log.getTimestamp().toString());
                    return logMap;
                })
                .toList();

        return formattedLogs;
    }
    @Override
    public List<ElasticsearchLogEntry> searchLogsByKeyword(String keyword) {
        List<ElasticsearchLogEntry> logs = new ArrayList<>();
        SearchRequest searchRequest = new SearchRequest("logs_index");

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder()
                .query(QueryBuilders.matchQuery("logMessage", keyword)) // Search in logMessage field
                .size(10); // Limit results to 10

        searchRequest.source(searchSourceBuilder);

        try {
            SearchResponse response = openSearchClient.search(searchRequest, RequestOptions.DEFAULT);
            for (SearchHit hit : response.getHits().getHits()) {
                ElasticsearchLogEntry log = new ObjectMapper().readValue(hit.getSourceAsString(), ElasticsearchLogEntry.class);
                logs.add(log);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return logs;
    }
}
