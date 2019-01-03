const validUrl = require('valid-url');

function isValidUrl(url) {
  return validUrl.is_web_uri(url);
}

function isOttoDomain(url) {
  return new URL(url).hostname === 'www.otto.de';
}

function hasProductDetailPagePath(url) {
  return new URL(url).pathname.startsWith('/p/');
}

function hasSearchResultPagePath(url) {
  return new URL(url).pathname.startsWith('/suche/');
}

class UrlVerifier {
  static isProductDetailPageUrl(url) {
    return isValidUrl(url) && isOttoDomain(url) && hasProductDetailPagePath(url);
  }

  static isSearchResultPageUrl(url) {
    return isValidUrl(url) && isOttoDomain(url) && hasSearchResultPagePath(url);
  }
}

module.exports = UrlVerifier;
