
const Option = require('./Option');
let Command=function (name,defaultOption) {
  this.name=name;
  this.options={};
  this.defaultOption=defaultOption;
}

let commandMethods = {};

commandMethods.addOption=function (flag,callback,defaultValue,desc) {
  let option = new Option(flag,defaultValue);
  option.addAction(callback);
  option.addDescription(desc);
  this.options[option.getName()]=option;
  return option;
};

commandMethods.execute=function (parsedArguments) {
  let output;
  let option = parsedArguments.LongNames[0]||parsedArguments.defaultOption;
  this.options[option.slice(1)].callback(parsedArguments);
  return output;
}


Command.prototype =commandMethods;
module.exports=Command;
