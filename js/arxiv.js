var arxiv = arxiv || (function () {

  var i, l;
  var abs_ids = $("dl dt"),
      abs_content = $("dl dd");

  var tokenizer = new Tokenizer ();

  for (i = 0, l = abs_content.length; i < l; ++i) {
    var abs = $($(abs_content[i]).find("p")).text();
    console.log(tokenizer.tokenize(abs));
  }

  return true;
})();
