const report = require("multiple-cucumber-html-reporter");
const os = require('os');

function getOSName(os) {
  let name = '';
  switch(os) {
    case 'win32':
      name = 'windows';
      break;
    case 'darwin':
      name = 'osx';
      break;
    case 'linux':
      name = 'linux';
      break;
    case 'sunos':
      name = 'linux';
      break;
    default:
      name = 'unkown';
  }
  return name;
}

report.generate({
  jsonDir: "./cucumber-report",
  reportPath: "./cucumber-report/report",
  metadata: {
    browser: {
      name: "chrome",
    },
    device: "Local test machine",
    platform: {
      name: getOSName(os.platform),
      version: os.release(),
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress E2E demo" },
      { label: "Release", value: "1.0.0" },
    ],
  },
});