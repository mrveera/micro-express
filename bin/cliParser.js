const Parser = require('command-line-arguments-parser');

let cliArguments = function (args) {
  let cliParser = new Parser();
  cliParser.setDefaultOption('-n');
  cliParser.addLegalOption('-n',valid);
  cliParser.addReplacer('--name','n');
  cliParser.addLegalLongName('--help');
  cliParser.setMaximumOptions(1);
  return cliParser.parse(args);
}

let valid = function (value) {
  return value!=null
}

module.exports=cliArguments;
