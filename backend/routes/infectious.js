const express = require('express');
const router = express.Router();
const SparqlClient = require('sparql-http-client');
const axios = require('axios');

const dbpediaEndpointUrl = "https://dbpedia.org/sparql";
const bioportalEndpointUrl = "http://sparql.bioontology.org/sparql/"
const bioportalApiKey = "7f190679-605d-41f2-89de-572af1f28205" // deveria estar num .env

router.get('/', async (req, res) => {
    console.log("Hi!");
    var query_string = "PREFIX omv: <http://omv.ontoware.org/2005/05/ontology#>\n" +
    "SELECT ?ont ?name ?acr " +
    "WHERE { " +
    "	?ont a omv:Ontology .  " +
    "	?ont omv:acronym ?acr ." +
    "	?ont omv:name ?name . " +
    " }";

    await axios({
        url: '/sparql?query=' + encodeURIComponent(query_string) + "&apikey=" + encodeURIComponent(bioportalApiKey),
        baseURL: 'http://sparql.bioontology.org',
        port: 8080,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then((res) => {
        console.log(res.data.results);
    }).catch((err) => {
        console.log(err);
    });

    res.send("Hi!");
    });

module.exports = router;