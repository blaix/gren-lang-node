/*

import Dict exposing (empty, insert)
import Gren.Kernel.Platform exposing (export)
import Gren.Kernel.Scheduler exposing (binding, succeed)
import Gren.Kernel.FilePath exposing (fromString)

*/

var process = require("node:process");

var _Node_log = F2(function (text, args) {
  // This function is used for simple applications where the main function returns String
  // NOTE: this function needs __Platform_export available to work
  console.log(text);
  return {};
});

var _Node_init = __Scheduler_binding(function (callback) {
  callback(
    __Scheduler_succeed({
      __$applicationPath: __FilePath_fromString(module.filename),
      __$arch: process.arch,
      __$args: process.argv,
      __$platform: process.platform,
      __$stderr: process.stderr,
      __$stdin: process.stdin,
      __$stdout: process.stdout,
    })
  );
});

var _Node_getEnvironmentVariables = __Scheduler_binding(function (callback) {
  callback(__Scheduler_succeed(_Node_objToDict(process.env)));
});

var _Node_exitWithCode = function (code) {
  return __Scheduler_binding(function (callback) {
    process.exit(code);
  });
};

var _Node_setExitCode = function (code) {
  return __Scheduler_binding(function (callback) {
    process.exitCode = code;
    callback(__Scheduler_succeed({}));
  });
};

// Helpers

// TODO: Move to core package?
function _Node_objToDict(obj) {
  var dict = __Dict_empty;

  for (var key in obj) {
    dict = A3(__Dict_insert, key, obj[key], dict);
  }

  return dict;
}
