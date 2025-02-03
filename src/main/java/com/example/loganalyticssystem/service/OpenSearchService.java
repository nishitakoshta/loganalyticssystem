package com.example.loganalyticssystem.service;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;

import java.util.List;
import java.util.Map;
public interface OpenSearchService {
    List<Map<String, Object>> getLatestLogs();
    List<ElasticsearchLogEntry> searchLogsByKeyword(String keyword);
}
