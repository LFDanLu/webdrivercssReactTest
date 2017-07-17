//Test for Accordion components
var expect = require('chai').expect
var assert = require('assert');
var client = require('webdriverio').remote({desiredCapabilities:{browserName: 'chrome'}})
var numDiffErrors = 0;
// init WebdriverCSS
require('webdrivercss').init(client,{
  screenshotRoot: 'react',
  // failedComparisonsRoot: 'diffs',
  misMatchTolerance: 0.01,
  screenWidth: [1600],
  api: 'http://localhost:9000/api/repositories/'
});

client.init()
.sync()
.url('http://cdn.livefyre.com/libs/react-spectrum/v1.1.1/storybook/index.html')
.waitForExist('.Pane.vertical.Pane1', 10000)
.pause(3000)

//Test for Accoridion Multiselectable
.waitForVisible('a[title="Open Multiselectable"]', 10000)
.pause(1000)
.click('a[title="Open Multiselectable"]')
.frame(0)
.waitForVisible('.coral3-Accordion', 10000)
//Uncomment the below if you want to force an error
// .click('.coral3-Accordion>div:nth-child(1)')
// .click('.coral3-Accordion>div:nth-child(2)')
.frame(null)
.webdrivercss('Multiselectable_Accordion_Component', {
  name: 'None_Open',
  exclude: [".Pane.vertical.Pane1"],
  hide: [".Resizer.vertical", ".Pane.vertical.Pane2 .Pane.horizontal.Pane2"] 
}, function (err, res){
  // assert.ifError(err);
  if (!res.None_Open[0].isWithinMisMatchTolerance){
    console.log(res.None_Open[0].isWithinMisMatchTolerance)
    numDiffErrors+=1
  }
})


//Test for Accordion Default selected index
.waitForVisible('a[title="Open Default selected index"]', 10000)
.pause(1000)
.click('a[title="Open Default selected index"]')
.frame(0)
.waitForVisible('.coral3-Accordion', 10000)
//.click('.coral3-Accordion>div:nth-child(1)')
.frame(null)
.webdrivercss('Default_selected_index_Accordion_Component', {
  name: '2nd_Item_Open',
  exclude: [".Pane.vertical.Pane1"],
  hide: [".Resizer.vertical", ".Pane.vertical.Pane2 .Pane.horizontal.Pane2"]
}, function (err, res){
  assert.ifError(err);
  if (!res['2nd_Item_Open'][0].isWithinMisMatchTolerance){
    console.log(res['2nd_Item_Open'][0].isWithinMisMatchTolerance)
    numDiffErrors+=1
  }
})

//Testing Shell Header Default
.waitForVisible('a[title="Open ShellHeader"]', 10000)
.pause(1000)
.click('a[title="Open ShellHeader"]')
//.click('a[title="Open homeIcon: adobeAnalyticsColor"]')
.frame(0)
.waitForVisible('.coral3-Shell-header.coral--dark', 10000)
.click('.coral-Button.coral-Button--minimal.coral-Button--medium.coral3-Shell-menu-button span')
.frame(null)
.webdrivercss('Default_ShellHeader', {
  name: 'Org_Dropdown_Menu',
  exclude: [".Pane.vertical.Pane1"],
  hide: [".Resizer.vertical", ".Pane.vertical.Pane2 .Pane.horizontal.Pane2"] 
}, function (err, res){
  assert.ifError(err);
  if (!res['Org_Dropdown_Menu'][0].isWithinMisMatchTolerance){
    console.log(res['Org_Dropdown_Menu'][0].isWithinMisMatchTolerance)
    numDiffErrors+=1
  }
})

.sync()
.pause(1000, function (result){
  assert.equal(numDiffErrors, 0, "You have "+numDiffErrors+" diff errors")
})
.end();
