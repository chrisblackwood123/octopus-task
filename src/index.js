"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var outagesController_js_1 = require("./src/controller/client.js");
function main() {
    console.log("Here");
    (0, outagesController_js_1.getOutages)().then(function (r) { return console.log(r); });
}
