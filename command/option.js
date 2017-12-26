let Option = function (flag,defaultValue) {
  this.flag = flag;
  this.opts=[];
  this.desc='not availble'
  this.defaultValue=defaultValue||null;
};

Option.prototype.addDescription = function (desc) {
  this.desc=desc;
  return true;
};

Option.prototype.getName = function () {
  return this.flag.replace('-','');
};

Option.prototype.addAction = function (callback) {
  if(typeof callback == 'function' || !callback){
  this.callback=callback||function () {
    return 'no task assigned';
    }
  }else{
    return false;
  }
  return true;
};

Option.prototype.getDescription = function () {
  return this.desc;
};

Option.prototype.getDefaultValue = function () {
  return this.defaultValue;
};
module.exports=Option;
