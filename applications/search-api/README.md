# Search api for data catalog repository 

Docker image: [dcatno/search-api](https://hub.docker.com/r/dcatno/search-api/)
Base image: [openjdk:8-jre-alpine]()
Source: [Dockerfile](https://github.com/...)

Provides a query api for the data catalog repository.


## License
dcatno/search: [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## Use

`docker run -p 8081:8080 dcatno/search-api`

## Depends on

  * dcatno/elasticsearch
  * dcatno/fuseki
  
## Search for Datasets

Example `/datasets?q=enhet&from=2`. Returns datasets that match *enhet* in title, objective, description, keywords, themes, publisher name and accessrights.  

Query parameters
- `q=enhet` (query for spesifik words (wildcard * is allowed))
- `theme=GOVE,SOCI` (datasets that have theme GOVE and SOCI)
- `publisher=DIFI` (datasets from a publisher)
- `accessRight=PUBLIC` (datasets that have accessRights: PUBLIC, )
- `lastChanged=3` (the datasets that were changed during the last three days)
- `firstHarvestesd=20` (the datasets that were harvested for the first time during the last twenty days)
- `orgPath=/STAT` (all datasets that have publishers that are governmental, other options are /PRIVAT, /FYLKE, /KOMMUNE and /ANNET)
- `from=0` (show page 0)
- `size=50` (number of hits per page, page size)
- `lang=nb` (filter language)
- `sortfield=title` (sort datasets by title, publisher or modified)
- `sortdirection=asc` (sort direction: asc or desc)

## Search for Terms (concepts)

Example `/terms?q=enhet`

Query paramters
- `q=enhet` (query for a specific term, searches in prefLabel, altLabel, definition or description)
- `creator=DIFI` (terms of which has DIFI as creator)
- `orgPath=/STAT/962738899` (all terms defined by government (STAT) and organization number 96273889 and any subunits)

## Search for HarvestCatalogRecords

Example `/harvest/catalog?q=/STAT` which returns aggregations of harvestRecords for the last 7 days, last 30 days and last 365 days for all publisher under the /STAT hierarchy level.

Example `/harvest/catalog?q=/STAT/123456789/987654321` returns aggregations of a particular publisher and all organisations that are organized under it. 




