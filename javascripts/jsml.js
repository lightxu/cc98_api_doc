// Copyright (c) 2009-2012 David Caldwell and Jim Radford.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at http://mozilla.org/MPL/2.0/.

(function($) {
	$.fn.jsml = function(value, wl){
		var whitelist = [
			"article",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"small",
			"p",
			"blockquote",
			"blockquote",
			"code",
			"pre",
			"div",
			"abbr",
			"strong",
			"em",
			"mark",
			"ins",
			"del",
			"i",
			"cite",
			"code", 
			"span", 
			"pre",
			"ul",
			"ol",
			"li",
			"a",
			"table",
			"caption",
			"tbody",
			"tr",
			"th",
			"td",
			"img",
			"figure"

		];

		whitelist = $.extend([], whitelist, wl);

		this.empty();
		value = value.reduce(toHTML)
		this.append(value[0]);

		function a(prev, cur, index, array){
			return prev+cur;
		}

		function toHTML(prev, cur, index, array){
			if(prev.constructor === String){	
				if(isTag(prev)){
					var el=document.createElement(prev);
					prev = $(el);
				}else{
					$.error("Invalid tag name:" + prev);
					return;
				}
			}
			else if(prev.constructor === Array)
			{
				if(prev.length === 1)
					prev = document.createElement(prev);
				else
					prev = prev.reduce(toHTML)[0];
			}

			if(cur.constructor === Object){	//attr
				for(var attr in cur){
					if(attr === "class")
					{
						prev.addClass(cur[attr]);
					}else{
						prev.attr(attr, cur[attr]);
					}
				}
				return prev;
			}

			if(cur.constructor === Array){	//child
				if(cur.length === 1)
					cur = [document.createElement(cur)];
				else
					cur = cur.reduce(toHTML);
				
				return prev.append(cur[0]);
			}


			if(cur.constructor === String){
				prev.append(cur);
				return prev;
			}
		}


		return this;

		function isTag(value){
			return (whitelist.indexOf(value)>=0);
		}

	};
})(jQuery);
