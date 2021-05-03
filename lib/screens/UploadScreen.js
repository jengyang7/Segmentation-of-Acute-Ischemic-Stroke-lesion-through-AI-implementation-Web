"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _WebContext = require("../context/WebContext");

var _uploady = _interopRequireWildcard(require("@rpldy/uploady"));

var _uploadButton = _interopRequireDefault(require("@rpldy/upload-button"));

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LogProgress = () => {
  (0, _uploady.useItemProgressListener)(item => {
    console.log("File ".concat(item.file.name, " completed: ").concat(item.completed));
  });
  return null;
};

const UploadScreen = (_ref) => {
  let {
    navigation
  } = _ref;
  const {
    state
  } = (0, _react.useContext)(_WebContext.Context);
  return (0, _jsxRuntime.jsxs)(_uploady.default, {
    method: "POST",
    destination: {
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1"
      },
      url: "http://127.0.0.1:5000/upload"
    },
    children: [(0, _jsxRuntime.jsx)(LogProgress, {}), (0, _jsxRuntime.jsx)(_uploadButton.default, {})]
  });
};

var _default = UploadScreen;
exports.default = _default;