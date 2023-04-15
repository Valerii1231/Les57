"use strict";

//  1
var path = require('path');

var fs = require('fs');

var users = [{
  name: 'Mike',
  age: 25
}, {
  name: 'Bob',
  age: 32
}, {
  name: 'Nikola',
  age: 17
}];
var filePath = path.join('src', 'users.js');
var data1 = 'const users = ' + JSON.stringify(users, null, 4).replace(/"([^"]+)":/g, '$1:') + '; ';
fs.writeFile(filePath, data1, function (err) {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('users.js written to src.');
  }
}); //  2

var data2 = JSON.stringify(users, null, 4);
fs.writeFile('data.json', data2, function (err) {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('data.json written.');
  }
}); //  3

var newData = [{
  name: 'Anna',
  age: 24
}, {
  name: 'Tom',
  age: 52
}];
var filePath1 = path.join('src', 'users.js');
var data3 = '\nconst newData = ' + JSON.stringify(newData, null, 4).replace(/"([^"]+)":/g, '$1:') + '; ';
fs.appendFile(filePath1, data3, function (err) {
  if (err) throw err;
  console.log('newData appended to users.js');
}); //  4

var promises = fs.promises;

var setData = function setData() {
  var fileData, newDataArray, newDataString;
  return regeneratorRuntime.async(function setData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(promises.readFile('data.json', 'utf8'));

        case 3:
          fileData = _context.sent;
          newDataArray = JSON.parse(fileData);
          newDataArray.push.apply(newDataArray, newData);
          newDataString = JSON.stringify(newDataArray, null, 4);
          _context.next = 9;
          return regeneratorRuntime.awrap(promises.truncate('data.json', 0));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(promises.appendFile('data.json', newDataString));

        case 11:
          console.log('newData appended to data.json');
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error('Error', _context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

setData(); //  5

var filePath2 = 'data.json';

var isExist = function isExist(filePath2) {
  return regeneratorRuntime.async(function isExist$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fs.promises.stat(filePath2));

        case 3:
          return _context2.abrupt("return", true);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", false);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

isExist(filePath2).then(function (result) {
  if (result) {
    console.log('File data.json exists');
  } else {
    console.log('File data.json does not exist');
  }
})["catch"](function (err) {
  console.error('Error', err);
});