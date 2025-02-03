package com.example.loganalyticssystem.repository;
import com.example.loganalyticssystem.entity.ElasticsearchLogEntry;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
public interface OpenSearchRepository extends ElasticsearchRepository<ElasticsearchLogEntry, String> {
}
