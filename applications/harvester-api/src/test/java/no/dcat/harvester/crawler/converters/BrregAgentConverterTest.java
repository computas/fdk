package no.dcat.harvester.crawler.converters;

import no.dcat.harvester.HarvesterApplication;
import no.dcat.shared.testcategories.UnitTest;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.NodeIterator;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.util.FileManager;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.SKOS;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;


@Category(UnitTest.class)
public class BrregAgentConverterTest {

	@Test
	public void testConvertBrregFileBlankNode() throws Exception {
		BrregAgentConverter converter = new BrregAgentConverter(HarvesterApplication.getBrregCache());

		Model model = FileManager.get().loadModel(BrregAgentConverterTest.class.getClassLoader().getResource("brreg/blankNodeTest.xml").getFile());

		converter.collectFromModel(model);

		// this just tests that we can handle blank nodes
		// no assertion is made, just tests that there is no null pointer exception
	}
	
	@Test
	public void testMissingBrregFile() throws Exception {
		BrregAgentConverter converter = new BrregAgentConverter(HarvesterApplication.getBrregCache());
		
		Model model = ModelFactory.createDefaultModel();
		
		converter.collectFromUri("http://test", model, model.createResource("http://test"));
		
		NodeIterator listObjectsOfProperty = model.listObjectsOfProperty(RDF.type);
		
		assertTrue("Expected empty model", listObjectsOfProperty.toList().isEmpty());
	}

	@Test
	public void testPreferredNameWithHitInCanonicalNames() {
		BrregAgentConverter converter = new BrregAgentConverter(HarvesterApplication.getBrregCache());

		Model model = ModelFactory.createDefaultModel();
		Resource publisher = model.createResource("http://publisheruri");

		converter.addPreferredOrganisationName(model, publisher, "889640782", "Arbeids og velferdsetaten" );

		Statement prefLabelStmt = publisher.getProperty(SKOS.prefLabel);
		String actualLabel = prefLabelStmt.getObject().asLiteral().getString();

		assertThat(actualLabel, Matchers.is("Arbeids og velferdsetaten"));

	}

	@Test
	public void testPreferredNameWithNoHitInCanonicalNames() {
		BrregAgentConverter converter = new BrregAgentConverter(HarvesterApplication.getBrregCache());

		Model model = ModelFactory.createDefaultModel();
		Resource publisher = model.createResource("http://publisheruri");

		converter.addPreferredOrganisationName(model, publisher, "123", "Orginal navn" );

		Statement prefLabelStmt = publisher.getProperty(SKOS.prefLabel);
		String actualLabel = prefLabelStmt.getObject().asLiteral().getString();

		assertThat(actualLabel, Matchers.is("Orginal navn"));
	}

	@Test
	public void testPreferredNameWithNoOriginalName() {
		BrregAgentConverter converter = new BrregAgentConverter(HarvesterApplication.getBrregCache());

		Model model = ModelFactory.createDefaultModel();
		Resource publisher = model.createResource("http://publisheruri");

		converter.addPreferredOrganisationName(model, publisher, "454", null );

		Statement prefLabelStmt = publisher.getProperty(SKOS.prefLabel);

		assertThat(prefLabelStmt, Matchers.is(Matchers.nullValue()));

	}

}
