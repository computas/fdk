package no.acat.spec.converters;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.parser.OpenAPIV3Parser;
import no.acat.config.Utils;

import java.io.IOException;

public class OpenApiV3JsonSpecConverter {
    public static boolean canConvert(String spec) {
        ObjectMapper mapper = Utils.jsonMapper();
        try {
            JsonNode rootNode = mapper.readTree(spec);

            String version = rootNode.path("openapi").asText();
            return version.length() > 2 && version.substring(0, 2).equals("3.");
        } catch (IOException e) {
            return false;
        }
    }

    public static OpenAPI convert(String spec) {
        try {
            return new OpenAPIV3Parser().readContents(spec, null, null).getOpenAPI();
        } catch (Error e) {
            throw new IllegalArgumentException("Cannot import spec as OpenApi v3 json", e);
        }
    }
}
