package no.dcat.harvester.crawler;

import no.dcat.admin.store.AdminDataStore;
import no.dcat.admin.store.DcatDataStore;
import no.dcat.admin.store.domain.DcatSource;
import no.dcat.harvester.crawler.handlers.ElasticSearchResultHandler;
import org.junit.Test;
import org.mockito.Mockito;

import java.io.IOException;

/**
 * Created by bgrova on 11.10.2016.
 */
public class LoadMiniDatasett {

    @Test
    public void createExampleData() throws IOException {

        loadDatasetFromFile("datasett-mini.ttl");


    }



    public void loadDatasetFromFile(String filename) {
        ClassLoader classLoader = getClass().getClassLoader();

        DcatSource dcatSource = new DcatSource("http//dcat.no/test", "Test", classLoader.getResource(filename).getFile(), "admin_user", "123456789");

        DcatDataStore dcatDataStore = Mockito.mock(DcatDataStore.class);
        Mockito.doThrow(Exception.class).when(dcatDataStore).saveDataCatalogue(Mockito.anyObject(), Mockito.anyObject());

        //FusekiResultHandler fshandler = new FusekiResultHandler(dcatDataStore, null);
        ElasticSearchResultHandler esHandler = new ElasticSearchResultHandler("localhost",9300, "elasticsearch", "http://localhost:8100", "user", "password");

        AdminDataStore adminDataStore = Mockito.mock(AdminDataStore.class);

        CrawlerJob job = new CrawlerJob(dcatSource, adminDataStore, null, esHandler);


        job.run();
    }
}