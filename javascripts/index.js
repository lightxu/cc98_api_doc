function buildErrorMessage(e) {
    return e.line !== undefined && e.column !== undefined
		? "Line " + e.line + ", column " + e.column + ": " + e.message
    	: e.message;
}

$(document).ready(function () {
  var parsed_ast = pegjs.parse($("#content").text());
  $("#content").jsml(parsed_ast);
});
