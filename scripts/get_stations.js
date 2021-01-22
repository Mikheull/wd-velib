const axios = require('axios');
const fs = require('fs'); 

/**
 * Sauvegarde des données
 */
axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=1500')
.then(function (response) {

    let _data = response.data.records;

    for (const [key, value] of Object.entries(_data)) {
        _data[key].properties = _data[key].fields;
        _data[key].properties.id = _data[key].recordid;
        delete _data[key].fields;
        delete _data[key].datasetid;
        delete _data[key].recordid;
        delete _data[key].record_timestamp;
        delete _data[key].properties.coordonnees_geo;
        delete _data[key].properties.capacity;
    }

    var jsonContent = JSON.stringify(_data); 
    fs.writeFile("../public/data/stations.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    }); 

}).catch(err => {
    console.log(err);
});
