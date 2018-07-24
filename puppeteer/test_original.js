// test.js
// Script enabling Nagios checks of site areas via casperjs (depends on phantomjs being installed and available in the path)
//
// To check return values use the casper.getHTML function and search for the relevant div.
// A div class can be found using .divName and a div id can be found using #divName
//
// The actual value to test might be found directly within the div, e.g.
//     <div id="m3breadcrumblinks">Off Duty</div>
//   as in the offduty test which, to find the return value, simply requires;
//     casper.getHTML('#m3breadcrumblinks')
//
// Sometimes a sub part of the div may be needed, as in the education test;
//     <div id="m3breadcrumblinks"><a href="http://www.doctors.net.uk/education/?areaid=15">Education</a>
//   which requires;
//     casper.getHTML('#m3breadcrumblinks a')
//   to find the <a href....>Education</a> part.
//
// The forum test uses a variant looking for the div class and then the <a href within that;
//     <div class="location"><div class="m3breadcrumb" style="width:auto;"><div><span>You are here:&nbsp;</span><div id="m3breadcrumblinks"><a href="http://forum.doctors.net.uk/?areaid=4">Forum</a>
//   This is found by using;
//     casper.getHTML('.m3breadcrumb a')
//   although this could just as easily be found using;
//     casper.getHTML('#m3breadcrumblinks a')
//
// The careers page has the test looking for the contents of a <span> so uses;
//     casper.getHTML('.m3breadcrumb span')
//   and looks for the value "You are here:&nbsp;" because the menu wrapper text that should read "Careers" isn't present on the Volcanic page.
//   This test could also look for the contents of the m3breadcrumblinks div id <a href value, as in;
//     casper.getHTML('#m3breadcrumblinks a')
//   and test for the "/home/" text.
//
// The email test is slightly different again because this looks for an id within an <a tag, basically;
//     <a id="synclink" href="http://www.doctors.net.uk/targetting/article.aspx?areaid=11&amp;articleid=21504" target="_blank">Sync device</a>
//   where the syntax of the search looks like;
//     casper.getHTML('a#synclink')
//   and expects to find the text "Sync device"
//
// Tests are invoked manually using the following format;
//     casperjs --ssl-protocol=any --ignore-ssl-errors=true /apps/sitechecks/test.js offduty https://www.doctors.net.uk
//     (note that --ssl-protocol=any, rather than --ssl-protocol=tlsv1 was found to be required for the Careers check to work)
//
// If the path to casperjs is not found when executing the above, export the relevant environment variables using;
//    . /etc/nagios/env.cfg
//


var returnCode = -1,
    responseText = 'UNKNOWN: no response';

var nagiosResponse = function() {
  this.echo(responseText);
  casper.exit(returnCode);
};

// site areas (uris + validator functions)
var siteAreas = {
// Old .Net Home page
//  'home': {
//      waitElement: '#welcomeMessage h2',
//      uri: '/Login/Login.aspx?go=true',
//      validator: function(casper) {
//        var t = casper.getHTML('#welcomeMessage h2');
//        casper.log('Return value: ' + t, 'info');
//        return (t == 'Welcome&nbsp;Nagios Monitor');
//      }
//  },

  'home': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://home.doctors.net.uk/',
      validator: function(casper) {
        var t = casper.getHTML('#m3breadcrumblinks');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Home');
      }
  },

  'forum': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://forum.doctors.net.uk/',
      validator: function(casper) {
        var t = casper.getHTML('.m3breadcrumb a');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Forum');
      }
  },

  'education': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://www.doctors.net.uk/education/',
      validator: function(casper) {
        var t = casper.getHTML('#m3breadcrumblinks a');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Education');
      }
  },

  'library': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://www.doctors.net.uk/library/',
      validator: function(casper) {
        var t = casper.getHTML('#m3breadcrumblinks a');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Library');
      }
  },

//  'news': {
//      waitElement: '#dnukHeaderWrapper',
//      uri: '/Login/Login.aspx?go=true&returnUrl=https://www.doctors.net.uk/news/',
//      validator: function(casper) {
//        var t = casper.getHTML('#m3breadcrumblinks a');
//        casper.log('Return value: ' + t, 'info');
//        return (t == 'News');
//      }
//  },

  'news': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://news.doctors.net.uk/',
      validator: function(casper) {
        var t = casper.getHTML('#m3breadcrumblinks');
        casper.log('Return value: ' + t, 'info');
        return (t == 'News&nbsp;(beta)');
      }
  },

  'offduty': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://offduty.doctors.net.uk/',
      validator: function(casper) {
        var t = casper.getHTML('#m3breadcrumblinks');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Off Duty');
      }
  },

  'email': {
      waitElement: '#header',
      uri: '/Login/Login.aspx?go=true&areaID=3',
      validator: function(casper) {
        var t = casper.getHTML('a#synclink');
        casper.log('Return value: ' + t, 'info');
        return (t == 'Sync device');
      }
  },

// Old jobs page - redundant, superseded by Careers
//  'jobs': {
//      waitElement: '#menuContainer',
//      uri: '/Login/Login.aspx?go=true&areaID=6',
//      validator: function(casper) {
//        var t = casper.getHTML('#dnukTopLineContent td.bodytext a');
//        casper.log('Return value: ' + t, 'info');
//        return (t == 'Jobs');
//      }
//  },

  'careers': {
      waitElement: '#dnukHeaderWrapper',
      uri: '/Login/Login.aspx?go=true&returnUrl=https://careers.doctors.net.uk/',
      validator: function(casper) {
        var t = casper.getHTML('.m3breadcrumb span');
        casper.log('Return value: ' + t, 'info');
        return (t == 'You are here:&nbsp;');
      }
  }
};

var casper = require('casper').create({
//  verbose: true,
//  logLevel: 'debug',
  onTimeout: nagiosResponse,
  onStepTimeout: nagiosResponse,
  onWaitTimeout: nagiosResponse,
  onError: nagiosResponse
});
casper.options.waitTimeout = 30000;

var selectedArea = casper.cli.args.length > 0 ? casper.cli.args[0] : 'library';
var urlPrefix = casper.cli.args.length > 1 ? casper.cli.args[1] : 'https://web03.internal.doctors.net.uk';
var siteArea = siteAreas[selectedArea];

casper.log('Starting check for sitearea: ' + selectedArea + ' urlprefix: ' + urlPrefix, 'info');

// Do login and validate response
casper.start(urlPrefix + siteArea.uri);
casper.then(function() {
//  this.log ( this.getHTML() )
  this.fill('form#aspnetForm', {'ctl00$cCphContent$cTxtUsername':'nagios.monitor', 'ctl00$cCphContent$cTxtPassword': '10m43t'}, false);
  this.click('#ctl00_cCphContent_cBtnLogin');
  this.log('Clicked login form submit', 'info');
});
casper.waitForSelector(siteArea.waitElement, function() {
// Uncomment next line to capture full html returned - depends on logLevel and verbose above also being uncommented
//  this.log ( this.getHTML() )
  if (siteArea.validator.call(this, casper)) {
    returnCode = 0;
    responseText = 'OK: ' + selectedArea + ' login successful';
  } else {
    returnCode = 2;
    responseText = 'Error: ' + selectedArea + ' login failed';//response was: ' + t;
  }
  nagiosResponse.call(this);
});
casper.run();
