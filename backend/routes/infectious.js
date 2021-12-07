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

module.exports = router;