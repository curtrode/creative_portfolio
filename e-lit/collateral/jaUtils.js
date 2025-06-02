/*
jaUtils.js
Globebop 1.0 by Jim Andrews, December 2014.

jaUtils.js is a collection of utility routines I have assembled
and use in various projects. This version is new to this project.
*/

// EVENT HANDLING
//*****************************************************************

/* el is an element that functions as a button. downFunction
is the function you want to run when the button goes down.
upFunction is the function you want to run when the button
goes up. This function makes the button touch sensitive when
the screen is touch sensitive. If the mouse is supported, it
will respond to mouse events. If it's hybrid touch+mouse,
it will respond to both. */
function setButtonBinding(el, downFunction, upFunction, outFunction) {
	if (typeof(el)=='string') el=document.getElementById(el);
	if (isEventSupported('touchstart') && isEventSupported('touchmove')) {
		el.addEventListener('touchstart', downFunction, false);
		el.addEventListener('touchend', upFunction, false);
	}
	else {
		el.addEventListener('mousedown', downFunction, false);
		el.addEventListener('mouseup', upFunction, false);
		el.addEventListener('mouseout', outFunction, false);
	}
}

// I found this function on the net, which purports
// to tell us if an event is supported in the browser. 
// Any event. For instance, isEventSupported('click') 
// returns a boolean.
var isEventSupported = (function(){
var TAGNAMES = {
	'select':'input','change':'input',
	'submit':'form','reset':'form',
	'error':'img','load':'img','abort':'img'
}
function isEventSupported(eventName) {
	var el = document.createElement(TAGNAMES[eventName] || 'div');
	eventName = 'on' + eventName;
	var isSupported = (eventName in el);
	if (!isSupported) {
		el.setAttribute(eventName, 'return;');
		isSupported = typeof el[eventName] == 'function';
	}
	el = null;
	return isSupported;
}
return isEventSupported;
})();

function hookEvent(element, eventName, callback) {
/*Adds an event listener to the element. The element can be the element ID or the element itself.
The eventName is one of 'mousedown', 'mouseup', 'click', 'dblclick', 'mouseover', 'mouseout', 'mousemove',
'keydown', 'keypress', 'keyup', 'load', 'unload', 'beforeunload', 'abort', 'resize', 'scroll', 'contextmenu',
'focus', 'blur', 'change', 'select', 'reset', 'submit'. 
callback is the name of a function that will get called each time the event occurs.*/
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  }
  else {
	if(element.attachEvent) element.attachEvent("on" + eventName, callback);
	// Internet Explorer  
  }
}

function unhookEvent(element, eventName, callback) {
// Removes an event listener from the element. This works cross-browser, as does hookEvent.
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.removeEventListener)
    element.removeEventListener(eventName, callback, false);
  else {
	if(element.detachEvent) element.detachEvent("on" + eventName, callback);
	// Internet Explorer
  }
}

function getEventTarget(e) {
  // Cross-browser function that returns the current event. 
  e = e ? e : window.event;
  return e.target ? e.target : e.srcElement;
}

function cancelEvent(e) {
  //Cancels the event e.
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function fireEvent(el, evnt) {
  //Fires the evnt on element el. As in fireEvent(element, 'click')
  if(!el) {
	  return;
  }
  if(document.createEvent) {
	  //Firefox
	  var ev = document.createEvent('HTMLEvents');
	  ev.initEvent(evnt, true, true);
	  el.dispatchEvent(ev);
  } else if(document.createEventObject) {
	  //IE
	  var ev = document.createEventObject();
	  el.fireEvent('on'+evnt, ev);
  } else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
	  el['on'+evnt]();
  }
}

function fireEventOLD(el, evnt) {
  //Fires the evnt on element el. As in fireEvent(element, 'click')
  if(!el) {
	  return;
  }
  if(document.createEventObject) {
	  //IE
	  var ev = document.createEventObject();
	  el.fireEvent('on'+evnt, ev);
  } else if(document.createEvent) {
	  //Firefox
	  var ev = document.createEvent('HTMLEvents');
	  ev.initEvent(evnt, true, true);
	  el.dispatchEvent(ev);
  } else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
	  el['on'+evnt]();
  }
}

//*****************************************************************
// BROWSER WIDTH, HEIGHT
//*****************************************************************

function browserWidth() {
	//Returns the width of the browser (as a number).
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
	} else if( document.documentElement && ( document.documentElement.clientWidth ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
	} else if( document.body && ( document.body.clientWidth ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
	}
	return myWidth;
}

function browserHeight() {
	//Returns the height of the browser (as a number).
	var myHeight = 0;
	if( typeof( window.innerHeight ) == 'number' ) {
		//Non-IE
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientHeight ) ) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}

function elementHeight(element) {
	//element can be the ID of the DOM element, or the element itself.
	//Returns the height of the DOM element, in pixels. The value contains the height
	//with the padding, scrollBar, and the border, but does not include the margin.
	if(typeof(element) == "string")
	  element = document.getElementById(element);
	return element.offsetHeight;
}

function elementWidth(element) {
	//element can be the ID of the DOM element, or the element itself.
	//Returns the width of the DOM element, in pixels. The value contains the height
	//with the padding, scrollBar, and the border, but does not include the margin.
	if(typeof(element) == "string")
	  element = document.getElementById(element);
	return element.offsetWidth;
}

function getStyle(element,styleProp) {
//See http://www.quirksmode.org/dom/getstyles.html
//element can be the string id or the element itself.
//styleProp is the string of the css prop you want the value of such as 'paddingLeft'.
//Some CSS properties, such as padding, paddingLeft, and various others around the box model,
//return "" when you try to get the property value the normal way. This handler will, in those
//cases, look to see if the stylesheet value is readable, and returns that instead.
	var y="";
	if(typeof(element) == "string") {
	  element = document.getElementById(element);
	}
	var x = element.style[styleProp];
	if (x) {
		y=x;
	}
	else {
		if (element.currentStyle) {
			y=element.currentStyle[styleProp];
		}
		else {
			if (window.getComputedStyle) {
				y=document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProp);
			}
		}
	}
	return y;
}

function getCSSRuleObject() {
	//See http://javascriptkit.com/dhtmltutors/externalcss3.shtml
	//Returns the CSS Rule object of the styleSheet object
	if (document.styleSheets[0].cssRules)
	crossrule=document.styleSheets[0].cssRules;
	else if (document.styleSheets[0].rules)
	crossrule=document.styleSheets[0].rules;
	return crossrule;
}

function getStyleValue(element, styleProperty) {
	if (element.style[styleProperty]) {
		return element.style[styleProperty];
	}
	else {
		var ruleObject=getCSSRuleObject;
		
	}
}

//*****************************************************************
// ALIGHNMENT
//*****************************************************************

function center(element) {
	//element is an element or its id. The element is centred in the browser.
	//The style.position of the element should be 'absolute'.
	if(typeof(element) == "string") 
		element=document.getElementById(element);	
	var bw=browserWidth();	
	var bh=browserHeight();	
	var ow=parseInt(element.offsetWidth);
	var oh=parseInt(element.offsetHeight);
	element.style.left=(bw-ow)/2 + "px";
	element.style.top=(bh-oh)/2 + "px";
}

function positionxy(el,x,y) {
	var bw=browserWidth();	
	var bh=browserHeight();	
	if (typeof(el) == "string") el=document.getElementById(el);
	var ow=parseInt(el.offsetWidth);
	var oh=parseInt(el.offsetHeight);
	if (x=='c') {
		var le=(bw-ow)/2;
	}
	else {
		var le=x;
	}
	if (y=='c') {
		var tp=(bh-oh)/2;
	}
	else {
		var tp=y;
	}
	el.style.left=le+'px';
	el.style.top=tp+'px';
}

function centerIn(container, element) {
	// Centers element (div) in container (div) vertically and horizontally. 
	//container and element
	// can be string id's or the elements themselves. An absolute position 
	// element is positioned relative to the first parent element that has 
	// a position other than static. If no such element is found, the 
	// containing block is <html>. So element should be absolute position.
	if (typeof(container) == 'string') 
		container=document.getElementById(container);
	if (typeof(element) == 'string') 
		element=document.getElementById(element);
	var cLeft=parseInt(container.style.left);
	var cWidth=parseInt(container.offsetWidth);
	var eWidth=parseInt(element.offsetWidth);
	element.style.left=cWidth/2 - eWidth/2 + 'px';
	// Note that the above means that element's left is relative
	// to container's left.
	var cTop=parseInt(container.style.top);
	var cHeight=parseInt(container.offsetHeight);
	var eHeight=parseInt(element.offsetHeight);
	element.style.top=cHeight/2 - eHeight/2 + 'px';
}

//*****************************************************************
// MISC
//*****************************************************************

function selectText(containerid) {
	// Selects the text in the div with the specified id.
		if (document.selection) {
				var range = document.body.createTextRange();
				range.moveToElementText(document.getElementById(containerid));
				range.select();
		} else if (window.getSelection) {
				var range = document.createRange();
				range.selectNode(document.getElementById(containerid));
				window.getSelection().addRange(range);
		}
}

function randomInteger(min, max) {
  // Returns a random integer between min and max
  // Using Math.round() will give you a non-uniform distribution!
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//*****************************************************************
// OBJECT CLONING ETC
//*****************************************************************

function objectLength(aObject) {
	// Returns the number of key:value pairs in aObject.
	var count = 0;
	for (k in aObject) if (aObject.hasOwnProperty(k)) count++;
	return count;
}

function clone(obj) {
  // Returns a clone of obj.
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;
  // Handle Date
  if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
      var copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
      }
      return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
      var copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
}

//*****************************************************************
// LOAD SCRIPT DYNAMICALLY
//*****************************************************************

function loadScript(p) {
	// p has this form:
	// {baseURL:string, params:[paramstring1, paramstring2,...]}
	// Loads a script dynamically. The form of baseurl is assumed to have at least a ? at the 
	// end. Each string entry in the params array must start with an ampersand
	var head=document.getElementsByTagName("head")[0];
	var s=document.createElement("script");
	for (var i=0; i<p.params.length; i++) {
		p.baseURL = p.baseURL + p.params[i];
	}
	s.src=p.baseURL;
	head.appendChild(s);
}