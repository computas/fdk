
import {AxiosESTransport} from "searchkit";
const defaults = require("lodash/defaults");
import * as axios from "axios";
const qs = require('qs');

export class QueryTransport extends AxiosESTransport {
  constructor(host, options){
    super()
    this.options = defaults(options, {
      headers:{},
      //searchUrlPath: window.fdkSettings.queryUrl + "/search"
        // TODO MAKE THIS GENERIC
        searchUrlPath: "/search"
    })
    if(this.options.basicAuth){
      this.options.headers["Authorization"] = (
        "Basic " + btoa(this.options.basicAuth))
    }
    this.axios = axios.create({
      baseURL:this.host,
      timeout:AxiosESTransport.timeout,
      headers:this.options.headers
    })
    this.filters = [
      {
        key: 'publisher.name.raw',
        paramName: 'publisher',
        name: 'publisherCount',
        rawName: 'publisher.name.raw3'
      },
      {
        key: 'theme.code.raw',
        paramName: 'theme',
        rawName: 'theme.code.raw4',
        name: 'theme_count'
      },
      {
        key: 'accessRights.authorityCode.raw',
        paramName: 'accessright',
        rawName: 'accessRights.authorityCode.raw5',
        name: 'accessRightCount'
      },
    ];
  }

  search(query){
    this.filters.forEach((filter)=> {
      // http://localhost:8083/search?q=test&from=0&size=10&lang=nb&publisher=AKERSHUS%20FYLKESKOMMUNE
      filter.query = '';
      let multiple = false;
      if(query.post_filter) { // there is an aggregation post_filter
        if(query.post_filter.bool) { // array of post_filters
          query.post_filter.bool.must.forEach((post_filter) => {
            if(post_filter.term[filter.key]) {
              if(filter.query.length === 0) {
                filter.query += '&' + filter.paramName +'=';
              }
              if (multiple) {
                  filter.query += ',';
              }
              filter.query += encodeURIComponent(post_filter.term[filter.key]);
              multiple = true;
            }
          })
        } else if(query.post_filter.term) { // single post_filter
          filter.query = (query.post_filter.term[filter.key] ? '&' + filter.paramName +'=' + encodeURIComponent(query.post_filter.term[filter.key]) : '');
        }
      }
      filter.query = filter.query.replace(/,\s*$/, "");
    })

    let sortfield = "_score";
    let sortdirection = "asc";

    let querySortObj = query.sort[0]; // assume that only one sort field is possible
    if (querySortObj) { // there is a sort code
      if (_.has(querySortObj, '_score')) {
        sortfield = "_score";
        sortdirection = "asc";
      } else if (_.has(querySortObj, 'title')) {
        sortfield= "title.nb";
      } else if (_.has(querySortObj, 'modified')) {
        sortfield= "modified";
        sortdirection = "desc";
      } else if (_.has(querySortObj,'publisher.name')) {
        sortfield= "publisher.name";
      } else {
        console.log('other! (should not happen)');
      }
    }

    let filtersUrlFragment = this.filters.map(filter=>filter.query).join(''); // build url fragment from list of filters
    return this.axios.get(
      `${this.options.searchUrlPath}?q=` +
			(query.query ? encodeURIComponent(query.query.simple_query_string.query) : '') +
			'&from=' +
			((!query.from) ? '0' : query.from) +
			'&size=' +
      query.size +
      '&lang=nb' +
      filtersUrlFragment +
      (sortfield !== "_score" ? '&sortfield='+sortfield+'&sortdirection='+ sortdirection : '')
		)
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 50)))
      .then((response)=>this.getData.call(this, response))
  }


  getData(response) {
    let aggregations = response.data.aggregations;
      this.filters.forEach((filter)=>{
        let rawName = filter.rawName;
        let name = filter.name;
        let rawNameShort = rawName.substr(0, rawName.length-1);
        if (aggregations && aggregations.hasOwnProperty(name)) {
            aggregations[rawName] = {};
            aggregations[rawName].size = '5';
            aggregations[rawName][rawNameShort] = aggregations[name];
            aggregations[rawName][rawNameShort].buckets = aggregations[rawName][rawNameShort].buckets.slice(0,100);
            delete aggregations[name];
        }
      })
    return response.data
  }

}