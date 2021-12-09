const express = require('express');
const router = express.Router();
const axios = require('axios');

const dbpediaBaseUrl = "https://live.dbpedia.org";
const bioportalBaseUrl = "http://sparql.bioontology.org"
const bioportalApiKey = "7f190679-605d-41f2-89de-572af1f28205" // deveria estar num .env

router.get('/dbpedia', async (req, res) => {
    var query_string = "select distinct ?Concept where {[] a ?Concept} LIMIT 100";

    await axios({
        url: '/sparql?' + 'default-graph-uri=http%3A%2F%2Fdbpedia.org' + '&query=' + encodeURIComponent(query_string),
        baseURL: dbpediaBaseUrl,
        port: 443,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then((dbpedia_res) => {
        return res.json(dbpedia_res.data);
    }).catch((err) => {
        return res.json(err);
    })
});

router.get('/bioportal', async (req, res) => {
    var query_string = "PREFIX omv: <http://omv.ontoware.org/2005/05/ontology#>\n" +
    "SELECT ?ont ?name ?acr " +
    "WHERE { " +
    "	?ont a omv:Ontology .  " +
    "	?ont omv:acronym ?acr ." +
    "	?ont omv:name ?name . " +
    " }";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Returns all entries
 */
router.get('/bioportal/all', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX obo: <http://purl.obolibrary.org/obo/>\n" +
                        "SELECT ?s ?label ?definition WHERE { " +
                        "   GRAPH <http://bioportal.bioontology.org/ontologies/DOID> { " +
                        "       ?s a owl:Class . " +
                        "       ?s rdfs:label ?label . " +
                        "       OPTIONAL { " +
                        "           ?s obo:def ?definition . " +
                        "       }" +  
                        "   }" +
                        "} ORDER BY ASC(?label)";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Searches for entries that match the given string
 * TODO: swap "autoimmune" with search string
 */
router.get('/bioportal/search', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "SELECT ?uri ?label ?definition WHERE { " +
                        "   GRAPH <http://bioportal.bioontology.org/ontologies/DOID> { " +
                        "       ?uri a owl:Class . " +
                        "       ?uri rdfs:label ?label . " +
                        "       FILTER regex(UCASE(?label), UCASE(\"autoimmune\")) . " +
                        "   }" +
                        "} ORDER BY ASC(?label)";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Gets label, definition and superclass URI for a given URI
 * TODO: swap <http://purl.obolibrary.org/obo/DOID_0060051> with search URI
 */
router.get('/bioportal/getClass', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX obo: <http://purl.obolibrary.org/obo/>\n" +
                        "SELECT ?label ?definition ?superclass WHERE { " +
                        "   GRAPH <http://bioportal.bioontology.org/ontologies/DOID> { " +
                        "       <http://purl.obolibrary.org/obo/DOID_0060051> rdfs:label ?label . " +
                        "       OPTIONAL { " +
                        "           <http://purl.obolibrary.org/obo/DOID_0060051> obo:def ?definition . " +
                        "       }" +
                        "       OPTIONAL { " +
                        "           <http://purl.obolibrary.org/obo/DOID_0060051> rdfs:subClassOf ?superclass . " +
                        "       }" +
                        "   }" +
                        "}";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Gets synonyms for a given URI
 * TODO: swap <http://purl.obolibrary.org/obo/DOID_0060051> with search URI
 */
router.get('/bioportal/getSynonyms', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX obo: <http://purl.obolibrary.org/obo/>\n" +
                        "PREFIX goobo: <http://www.geneontology.org/formats/oboInOWL#>\n" +
                        "SELECT ?synonym WHERE { " +
                        "   GRAPH <http://bioportal.bioontology.org/ontologies/DOID> { " +
                        "       <http://purl.obolibrary.org/obo/DOID_0050651> goobo:hasExactSynonym ?synonym . " +
                        "   }" +
                        "}";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Gets URIs of subclasses of a given URI
 * TODO: swap <http://purl.obolibrary.org/obo/DOID_114> with search URI
 */
router.get('/bioportal/getSubClasses', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX obo: <http://purl.obolibrary.org/obo/>\n" +
                        "PREFIX goobo: <http://www.geneontology.org/formats/oboInOWL#>\n" +
                        "SELECT ?subclass WHERE { " +
                        "   GRAPH <http://bioportal.bioontology.org/ontologies/DOID> { " +
                        "       ?subclass rdfs:subClassOf <http://purl.obolibrary.org/obo/DOID_114> . " +
                        "   }" +
                        "}";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: bioportalBaseUrl,
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((bioportal_res) => {
        return res.send(bioportal_res.data);
    }).catch((err) => {
        return res.json(err);
    });
});

/**
 * Get abstract for a given string
 * might return multiple entries or none, depending on dbpedia contents
 * TODO: swap "autoimmune" with search string
 */
router.get('/dbpedia/getAbstract', async (req, res) => {
    var query_string =  "PREFIX owl:  <http://www.w3.org/2002/07/owl#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                        "select ?uri ?label ?abstract where { " +
                        "   ?uri a dbo:Disease ; " +
                        "   rdfs:label ?label . " +
                        "   OPTIONAL { " +
                        "       ?uri dbo:abstract ?abstract . " +
                        "   } " +
                        "   FILTER (LANG ( ?label ) = 'en' ) " +
                        "   FILTER (LANG ( ?abstract) = 'en' ) " +
                        "   FILTER regex(UCASE(?label), UCASE(\"autoimmune\")) . " +
                        "} ORDER BY ASC(?label)"; 

    await axios({
        url: '/sparql?' + 'default-graph-uri=http%3A%2F%2Fdbpedia.org' + '&query=' + encodeURIComponent(query_string),
        baseURL: dbpediaBaseUrl,
        port: 443,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then((dbpedia_res) => {
        return res.json(dbpedia_res.data);
    }).catch((err) => {
        return res.json(err);
    })
});

module.exports = router;