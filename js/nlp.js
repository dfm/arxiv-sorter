//
// Adapted from: https://github.com/NaturalNode/natural
// (licence included below) by Dan Foreman-Mackey
//

/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Tokenizer = Tokenizer || (function () {

  "use strict";

  //
  // An implementation of the Treebank Word Tokenizer.
  //
  var contractions2 = [
    /(.)('ll|'re|'ve|n't|'s|'m|'d)\b/ig,
    /\b(can)(not)\b/ig,
    /\b(D)('ye)\b/ig,
    /\b(Gim)(me)\b/ig,
    /\b(Gon)(na)\b/ig,
    /\b(Got)(ta)\b/ig,
    /\b(Lem)(me)\b/ig,
    /\b(Mor)('n)\b/ig,
    /\b(T)(is)\b/ig,
    /\b(T)(was)\b/ig,
    /\b(Wan)(na)\b/ig
  ];
  var contractions3 = [
    /\b(Whad)(dd)(ya)\b/ig,
    /\b(Wha)(t)(cha)\b/ig
  ];

  var Tokenizer = window.Tokenizer = function() {};
  Tokenizer.prototype.trim = function(array) {
    if (array[array.length - 1] == '') array.pop();
    if (array[0] == '') array.shift();
    return array;
  };
  Tokenizer.prototype.attach = function() {
    var self = this;
    String.prototype.tokenize = function() {
      return self.tokenize(this);
    }
  };

  Tokenizer.prototype.tokenize = function (text) {
    contractions2.forEach(function(regexp) {
      text = text.replace(regexp,"$1 $2");
    });

    contractions3.forEach(function(regexp) {
      text = text.replace(regexp,"$1 $2 $3");
    });

    // most punctuation
    text = text.replace(/([^\w\.\'\-\/\+\<\>,&])/g, " $1 ");

    // commas if followed by space
    text = text.replace(/(,\s)/g, " $1");

    // single quotes if followed by a space
    text = text.replace(/('\s)/g, " $1");

    // periods before newline or end of string
    text = text.replace(/\. *(\n|$)/g, " . ");
    return  _.without(text.split(/\s+/), '');
  };

  return Tokenizer;

})();
