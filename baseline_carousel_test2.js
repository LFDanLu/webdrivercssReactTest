var assert = require('assert');
var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'chrome'}})
// init WebdriverCSS
require('webdrivercss').init(client,{
  screenshotRoot: 'carousel_screenshots2',
  // failedComparisonsRoot: 'diffs',
  misMatchTolerance: 0.1,
  screenWidth: [1024, 400],
  api: 'http://localhost:9000/api/repositories/'
});

client.init()
.sync()
.url('http://lemonsarebetter.herokuapp.com/widget.php?network=build-validator-staging-s2.fyre.co&site=305506&articleId=screenshotDiff2&appType=carousel')
// .waitForVisible('.back-nav-button', 10000)
.waitForExist('.back-nav-button', 10000)
.pause(5000)
.click('.forward-nav-button')
.webdrivercss('base mosaic', {
  name: 'base mosaic',
  remove: '[class ="kc-item"]'
})
.waitForExist('.kc-item.kc-front-item .hub-btn.hub-btn-link.hub-content-share', 10000)
.click('.kc-item.kc-front-item .hub-btn.hub-btn-link.hub-content-share')
.pause(5000)
.webdrivercss('share menu', {
  name: "share modal",
  remove: '[class ="kc-item"]'
})
.waitForExist('.kc-item.kc-front-item article>div', 10000)
.click('.kc-item.kc-front-item article>div')
.pause(5000)
.webdrivercss('lightbox', {
  name: "lightbox",
  remove: '[class ="kc-item"]'
})
.sync()
.end();
