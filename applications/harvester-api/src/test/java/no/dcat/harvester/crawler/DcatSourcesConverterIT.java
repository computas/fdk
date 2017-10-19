package no.dcat.harvester.crawler;

import no.dcat.shared.Catalog;
import no.dcat.shared.Dataset;
import no.difi.dcat.datastore.domain.dcat.builders.DcatReader;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.FileManager;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class DcatSourcesConverterIT {
    private static Logger logger = LoggerFactory.getLogger(DcatSourcesConverterIT.class);


    public DcatReader setupReader(Model model) {
        return new DcatReader(model, "http://localhost:8100", "user", "password");
    }

    @Test
    public void readDifiData() throws Throwable {

        Model model = ModelFactory.createDefaultModel();
        model = FileManager.get().loadModel("difi-dataset-2017-10-19.jsonld");

        DcatReader reader = setupReader(model);
        List<Dataset> datasets = reader.getDatasets();

        assertThat(datasets.size(), is(33));
    }

    @Test
    public void readGeonorgeData() throws Throwable {

        Model model = ModelFactory.createDefaultModel();
        model = FileManager.get().loadModel("geonorge-data-2017-10-19.xml" );

        DcatReader reader = setupReader(model);
        List<Dataset> datasets = reader.getDatasets();

        assertThat(datasets.size(), is(168));
        //Catalog actualCatalog = CatalogBuilder.create(model.getResource(catalogUri));

    }



}