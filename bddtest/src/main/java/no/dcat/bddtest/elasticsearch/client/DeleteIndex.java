package no.dcat.bddtest.elasticsearch.client;

import no.dcat.harvester.crawler.handlers.ElasticSearchResultHandler;
import no.difi.dcat.datastore.Elasticsearch;
import org.elasticsearch.action.ActionFuture;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexResponse;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.index.IndexNotFoundException;
import org.elasticsearch.index.query.QueryBuilders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class for deleting index in Elasticsearch.
 */
public class DeleteIndex {
    private final Logger logger = LoggerFactory.getLogger(DeleteIndex.class);

    private final String hostname;
    private final String clustername = "elasticsearch";
    private final int port;

    public DeleteIndex(String hostname, int port) {
        this.hostname = hostname;
        this.port = port;
    }

    public void deleteIndex(String index) {
        try (Elasticsearch elasticsearch = new Elasticsearch(hostname, port, clustername)) {
            logger.trace("Deleting indexing {}", index);
            deleteIndexInElasticsearch(elasticsearch, index);
        } catch (Exception e) {
            logger.error("Exception occurred while deleting index: {}", e.getMessage());
            throw e;
        }
    }

    private void deleteIndexInElasticsearch(Elasticsearch elasticsearch, String index) {
        try {
            elasticsearch.getClient().admin().indices().delete(new DeleteIndexRequest(index)).actionGet();
        } catch (IndexNotFoundException e) {
            logger.info("Index not found.");
        }
    }
}
