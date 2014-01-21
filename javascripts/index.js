function buildErrorMessage(e) {
    return e.line !== undefined && e.column !== undefined
		? "Line " + e.line + ", column " + e.column + ": " + e.message
    	: e.message;
}

$(document).ready(function () {
  var parsed_html = pegjs.parse($("#content").text());
  $("#content").html(parsed_html);
});
