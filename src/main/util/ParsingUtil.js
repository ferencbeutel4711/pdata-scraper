const parse = require('node-html-parser').parse;
const request = require('request');

function fetchAndParse(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'UniversityProject'
      }
    };
    request(url, options, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject('error during html fetching! err: ' + err + ' RC: ' + res.statusCode + ' response: ' + body);
      }
      const parsingOptions = {
        lowerCaseTagName: false,
        script: true,
        style: false,
        pre: false
      };

      resolve(parse(body, parsingOptions));
    })
  });
}

function unique(array) {
  return [...new Set(array)];
}

function extractImageIdsFromProductData(productData) {
  return unique([].concat.apply([], Object.values(productData.variations)
    .map((variation) => {
      return variation.images.map((image) => {
        return image.id;
      });
    })));
}

function prependHost(productLinks) {
  return productLinks.map((productLink) => {
    return `https://www.otto.de${productLink}`
  })
}

class ParsingUtil {
  static extractProductDetailPageUrls(url) {
    return new Promise((resolve, reject) => {
      fetchAndParse(url).then((parsingResult) => {
        const productLinks = parsingResult.querySelectorAll('.productLink')
          .map((productLink) => {
            return productLink.attributes.href;
          })
          .filter((productLink) => {
            return productLink !== null;
          });
        resolve({
          urls: prependHost(productLinks)
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static extractProductData(url) {
    return new Promise((resolve, reject) => {
      fetchAndParse(url).then((parsingResult) => {
        const productDataJson = JSON.parse(parsingResult.querySelector('#productDataJson').removeWhitespace().innerHTML);
        const imageIds = extractImageIdsFromProductData(productDataJson);

        resolve({
          id: productDataJson.id,
          images: imageIds
        });
      }).catch((error) => {
        reject(error);
      })
    });
  }
}

module.exports = ParsingUtil;
