package com.example.loganalyticssystem.elasticsearchconfig;
import org.apache.http.HttpHost;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestClientBuilder;
import org.opensearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class OpenSearchConfig {

    @Bean
    public RestHighLevelClient restHighLevelClient() {
        RestClientBuilder builder = RestClient.builder(
                new HttpHost("localhost", 9200, "http"));  // Change this to your OpenSearch host and port
        return new RestHighLevelClient(builder);
    }
}
