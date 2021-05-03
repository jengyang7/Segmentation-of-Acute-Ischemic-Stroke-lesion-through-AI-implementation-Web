"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _App = _interopRequireDefault(require("./App"));

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders learn react link', () => {
  const {
    getByText
  } = (0, _react2.render)((0, _jsxRuntime.jsx)(_App.default, {}));
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});