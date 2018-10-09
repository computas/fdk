package no.dcat.harvester.crawler;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.dcat.datastore.domain.DcatSource;
import no.dcat.datastore.domain.dcat.builders.DcatReader;
import no.dcat.harvester.service.SubjectCrawler;
import no.dcat.shared.Dataset;
import no.dcat.shared.Subject;
import no.dcat.shared.testcategories.IntegrationTest;
import org.apache.jena.rdf.model.Model;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.SimpleDateFormat;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertThat;

@ActiveProfiles(value = "unit-integration")
@RunWith(SpringRunner.class)
@SpringBootTest
@Category(IntegrationTest.class)
public class CrawlerValidationIT {
    private static Logger logger = LoggerFactory.getLogger(CrawlerValidationIT.class);
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    SubjectCrawler subjectCrawler;

    public DcatReader setupReader(Model model) {
        return new DcatReader(model, "http://localhost:8100", "user", "password");
    }


    @Test
    public void readDifiDataWithOneInvalidDataset() throws Throwable {

        Resource r = new ClassPathResource("difi-complete-2018-03-08.jsonld");
        DcatSource dcatSource = new DcatSource();
        dcatSource.setUrl("http://testurl");
        CrawlerJob crawlerJob = new CrawlerJob(dcatSource,null, subjectCrawler);
        Model model = crawlerJob.loadModelAndValidate(r.getURL());

       // model.write(System.out, "TURTLE");

        DcatReader reader = setupReader(model);
        List<Dataset> datasets = reader.getDatasets();

        Dataset found = datasets.stream().filter(dataset -> dataset.getUri().startsWith("https://data.norge.no/node/1939")).findFirst().get();

        assertThat("the dataset is found in modeldata before validation", found, is(notNullValue()));
        assertThat("the number of datasets before validation", datasets.size() , is(550));

        crawlerJob.isValid(model);
        crawlerJob.removeNonValidDatasets(model);

        reader = setupReader(model);
        datasets = reader.getDatasets();

        boolean notFound = datasets.stream().noneMatch(dataset -> dataset.getUri().startsWith("https://data.norge.no/node/1939"));
        assertThat("the dataset is not found after removing non-valid dataset", notFound, is(true));
        assertThat("the number of datasets after removing non-valid dataset", datasets.size(), is(549));

    }

}