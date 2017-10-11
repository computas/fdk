package no.dcat.shared;

import lombok.Data;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
@ToString(includeFieldNames = false)
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class SkosConcept {

    private String uri; // = "http://brreg.no/skosConcept/" + UUID.randomUUID().toString();
    private Map<String, String> prefLabel = new HashMap<>();
    private String extraType;

    public static SkosConcept getInstance(String sourceUrl, String prefLabelInNb, String extraType) {
        SkosConcept skosConcept = new SkosConcept();
        skosConcept.uri = sourceUrl;
        skosConcept.prefLabel.put("nb", prefLabelInNb);
        skosConcept.extraType = extraType;
        return skosConcept;
    }

    public static SkosConcept getInstance(String sourceUrl, String prefLabelInNb) {
        SkosConcept skosConcept = new SkosConcept();
        skosConcept.uri = sourceUrl;
        skosConcept.prefLabel.put("nb", prefLabelInNb);
        skosConcept.extraType = null;
        return skosConcept;
    }
}
