/**
 * Created by azu on 2014/03/23.
 * LICENSE : MIT
 */
"use strict";
var parse = require("markdown-to-ast").parse;
var txtTraverser = require("txt-ast-traverse");
module.exports = function (code) {
    var ast = parse(code);
    var enters = [];
    var leaves = [];
    var both = [];
    txtTraverser.traverse(ast, {
        enter: function (node) {
            if (!node.loc) {
                return;
            }
            var items = {
                visitorType: "enter",
                loc: node.loc
            };
            enters.push(items);
            both.push(items);
        },
        leave: function (node) {
            if (!node.loc) {
                return;
            }
            var items = {
                visitorType: "leave",
                loc: node.loc
            };
            leaves.push(items);
            both.push(items);
        }
    });
    return {
        both: both,
        enter: enters,
        leave: leaves
    };
};