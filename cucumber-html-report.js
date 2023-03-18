const report = require("multiple-cucumber-html-reporter");
const os = require('os');


let nameFormatted = '';
switch(os.platform()) {
  case 'win32':
    nameFormatted = 'windows';
    break;
  case 'darwin':
    nameFormatted = 'osx';
    break;
  case 'linux':
    nameFormatted = 'linux';
    break;
  case 'sunos':
    nameFormatted = 'linux';
    break;
  default:
    nameFormatted = 'unkown';
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
      name: nameFormatted,
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