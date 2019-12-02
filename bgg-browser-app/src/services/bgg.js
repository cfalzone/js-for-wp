const convert = require('xml-js');

const bgg = {};

const rootPath = 'https://www.boardgamegeek.com/xmlapi2';
const maxTries = 3;

bgg.loadCollection = username => {
  return new Promise((resolve, reject) => {
    if (!username) {
      reject();
      return;
    }

    bgg.performFetch(`${rootPath}/collection?username=${username}&subtype=boardgame&excludesubtype=boardgameexpansion&own=1`)
      .then(response => {
        return response.text();
      }).then(xml => {
        // Convert the XML to JSON
        const json = convert.xml2json(xml, {compact: true});
        const collection = JSON.parse(json);
        
        console.log('Fetched games. Example:', collection.items.item[0]);

        // Conver the JSON to an array of just the data we want
        const gamesJsonArray = Array.from(collection.items.item);
        let gamesArray = [];
        gamesJsonArray.forEach(gameJson => gamesArray.push({
          id: gameJson._attributes.objectid,
          name: gameJson.name._text,
          type: gameJson._attributes.subtype,
          image: gameJson.image._text,
          thumb: gameJson.thumbnail._text,
          yearPublished: gameJson.yearpublished._text
        }));

        console.log("Fetched Collection Array: ", gamesArray);

        resolve(gamesArray);
      }).catch(err => {
        console.error('Unable to Fectch BGG Collection: ', err);
        reject(err);
      });

  });
};

bgg.performFetch = (url, tries=0) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject();
      return;
    }

    fetch(url).then(response => {
      if (response.status === 200) {
        resolve(response);
      } else {
        if (tries > maxTries) {
          reject('Max Tries Exceeded');
          return;
        }
        bgg.performFetch(url, tries++)
          .then(resolve)
          .catch(reject);
      }
    }).catch(err => reject(err));
  });
}

export default bgg;
