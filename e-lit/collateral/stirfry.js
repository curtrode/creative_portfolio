/*
A stir fry text has the following form. It has gPassages (integer)
texts. This one has 3 passages: one by McGann, one by Weizenbaum, and
one by Marx. Each passage is chopped into gLength pieces. gLength
is 25 in this stir fry. When the reader places the mouse over part
n of text t, the program replaces that small text with part n of
text t+1. 

Each of the gLength HTML elements with id's of j0 to j24, or jwhatever,
if gLength=whatever, holds HTML code. Not necessarily just text.
This means that a stir fry can also involve graphics or any
arbitrary HTML code, not just text. Marko Niemi made a stir fry,
for instance, that displays images, not texts. The stir fry is a
multi-media form. 

Let's look at how the gLength HTML elements j0 to j24 are coded. Below, 
we see an example.

<p id="j24" class="passage0" data-type="t" data-idnum="24">
  Jerome J. McGann<br><i data-type="c">Social Values and Poetic Acts</i><br>Harvard University Press, 1988.
</p>

This is a paragraph (p) element, but the elements can be span or
div or whatever. If an element starts out being a div, it will
remain a div; if it starts out being a p, it will remain a p, etc.

The id starts with j. And is followed by a number between 0 and gLength-1.

The style/class is initially passage0, a style coded in the stylesheet.
As the user stirs the text, the style and content cycle among the 
gPassages passages and styles.

The data-type of these elements must be "t". Note that in our example,
there is inner content like this:
<i data-type="c">Social Values and Poetic Acts</i>
Any tagged inner content must have data-type="c". This is important
for the touchscreen programming to work right.

*/

//****************************************************************
// GLOBALS
//****************************************************************

var gPassages=4;
// This stir fry has 4 passages, ie 4 main texts. One of the passages is basically blank ("    .")
var gPassageStyles=["passage0","passage1", "passage2", "passage3"];
// An array of 4 style names, a style for each passage.
var gLength=19;
// Each passage in this stir fry is chopped into 19 pieces.
var gStateOfArt;
// An array of length gLength. Each passage is referred to by
// an index from 0 to gPassages-1. Each element of the gStateOfArt
// array is such an integer. In other words, element x of
// gStateOfArt tells us which passage is currently displayed by
// the HTML node with id='j'+x. All gLength elements are 
// initially 0.
var gTextArray;
// A 2-dimensional array that holds the texts. gTextArray[s][t]
// holds part t of passage s. 
var gCounter=0;
// When the user clicks the image at the bottom, the program
// displays an unstirred passage. This integer is an index
// between 0 and gPassages-1 that indicates which passage
// will be displayed when that button is clicked.

//****************************************************************
// INITIALIZATION
//****************************************************************

window.onload=initialize;  

function initialize() {
	// Runs after window has loaded. Initializes program.
	document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
      // This prevents the body scrolling on the iPad as you
      // 'drag' touch.
  });
	gStateOfArt=[];
	for (var i=0; i<gLength; i++) {
	  gStateOfArt[i]=0;
	}
	// Initializes gStateOfArt to have gLength entries of 0.
	gTextArray = new Array(gPassages);
	for (var i=0; i < gPassages; i++) 
	{   
	  gTextArray[i] = new Array(gLength);  
	}
	// Initializes gTextArray to be a 2-dimensional array.
	gTextArray[0][0] = "We can’t make turtle soup <br> "
	gTextArray[0][1] = "Throwing bricks into trees, <br> "
	
	gTextArray[0][2] = "Unless we miss the grackles <br> "
	gTextArray[0][3] = "(Who keep us awake afternoons) <br> "

	gTextArray[0][4] = "And one of the bricks careens <br> "
	gTextArray[0][5] = "Into a creek and cracks off the skull <br> "

	gTextArray[0][6] = "Of a snapper too slow to see <br> "
	gTextArray[0][7] = "What’s bearing down on him— <br> "

	gTextArray[0][8] = "A brick without his name on it, <br> "
	gTextArray[0][9] = "With no need for his meat. <br> "

	gTextArray[0][10] = "And so we wind up hunting  <br> "
	gTextArray[0][11] = "(Illegal in this jurisdiction) <br> "

	gTextArray[0][12] = "Not particularly soup-hungry <br> "
	gTextArray[0][13] = "But buying and mincing garlic anyway,  <br> "

	gTextArray[0][14] = "To guard our tired liberties— <br> "
	gTextArray[0][15] = "Our bedrooms near the grackles <br> "

	gTextArray[0][16] = "And the trees where they gather <br> "
	gTextArray[0][17] = "To readle-eak into the evening. <br><br> "
	
	gTextArray[0][18] = "Curt Rode<br><i data-type=\"c\">Collateral Damage<br>"
	
	
	// Above is the first passage. 
	gTextArray[1][0] = "They’ve been abroad now <br>"
	gTextArray[1][1] = "Long enough to have leased  <br>"

	gTextArray[1][2] = "Walk-ups on streets thick <br>"
	gTextArray[1][3] = "With garlic and coal. <br>"

	gTextArray[1][4] = "They’ve grown to like wine <br>"
	gTextArray[1][5] = "With breakfast, cocoa in chili, <br>"

	gTextArray[1][6] = "The way the shops closing early <br>"
	gTextArray[1][7] = "Has broken their routines.<br> "

	gTextArray[1][8] = "Mornings on the plaza, <br>"
	gTextArray[1][9] = "As ivory light thickens <br>"

	gTextArray[1][10] = "Around the statues, <br>"
	gTextArray[1][11] = "Women in beautiful linen <br>"

	gTextArray[1][12] = "Blink sadly at their papers <br>"
	gTextArray[1][13] = "While the men share joking jabs <br>"

	gTextArray[1][14] = "Beneath the tobacconist’s awning. <br>"
	gTextArray[1][15] = "In blue coveralls, <br>" 

	gTextArray[1][16] = "City workers sweep passports  <br>"
	gTextArray[1][17] = "Which collect like dead birds overnight. <br><br> "

	gTextArray[1][18] = "Curt Rode<br><i data-type=\"c\">Glory<br>"
	// Above is the second passage.
	
	gTextArray[2][0] = "Truth be told, <br> "
	gTextArray[2][1] = "She turned me down, <br>"

	gTextArray[2][2] = "Kept it to a few kisses, <br> "
	gTextArray[2][3] = "My fingers just beginning to touch <br> "

	gTextArray[2][4] = "The thick curls of her hair— <br> "
	gTextArray[2][5] = "The liquid drawn close to my lips <br> "

	gTextArray[2][6] = "Only to watch it repool <br> "
	gTextArray[2][7] = "At the bottom of the glass.  <br> "

	gTextArray[2][8] = "How strange, then, <br> "
	gTextArray[2][9] = "That I’m softly elated, <br> "

	gTextArray[2][10] = "Stranger still I’m grateful <br> "
	gTextArray[2][11] = "For the smallness of the sip, <br> "

	gTextArray[2][12] = "For being allowed to taste <br> "
	gTextArray[2][13] = "What a full swallow would mask, <br> "

	gTextArray[2][14] = "The lip my lips <br> "
	gTextArray[2][15] = "first encountered, <br> "

	gTextArray[2][16] = "The lips that opened me <br> "
	gTextArray[2][17] = "into a ready smile. <br><br> "	

	gTextArray[2][18] = "Curt Rode<br><i data-type=\"c\">First Steps Back<br>"
	
	
	// Above is the third passage.
	
	gTextArray[3][0] = "   .<br> "
	gTextArray[3][1] = "   .<br> "

	gTextArray[3][2] = "   .<br> "
	gTextArray[3][3] = "   .<br> "

	gTextArray[3][4] = "   .<br> "
	gTextArray[3][5] = "   .<br> "

	gTextArray[3][6] = "   .<br> "
	gTextArray[3][7] = "   .<br> "

	gTextArray[3][8] = "   .<br> "
	gTextArray[3][9] = "   .<br> "

	gTextArray[3][10] = "   .<br> "
	gTextArray[3][11] = "   .<br> "

	gTextArray[3][12] = "   .<br> "
	gTextArray[3][13] = "   .<br> "

	gTextArray[3][14] = "   .<br> "
	gTextArray[3][15] = "   .<br> "

	gTextArray[3][16] = "   .<br> "
	gTextArray[3][17] = "   .<br><br> "	

	gTextArray[3][18] = "   .<br>"
	
	// Above is the fourth passage.
	
	setBindings();
	resizeBrowser();
}; // end of initialize

function setBindings() {
  // Called once. Toward the end of initialize.
  window.addEventListener("resize", resizeBrowser, false);
  if (isEventSupported("touchmove")) {
    //set up touch handling
    var maintextobj=document.getElementById("maintext");
    document.body.addEventListener("touchstart", touchInProgress, false);
    document.body.addEventListener("touchmove", touchInProgress, false);
  }
  else {
    // Mouse handling
    for (var i=0; i<gLength; i++) {
      document.getElementById('j' + i).addEventListener("mouseover", cutupMouse, false);
    }
  }
} // end of setBindings

//****************************************************************
// FUNCTIONS
//****************************************************************

function resizeBrowser() {
	// Called at the beginning of the program and when the user resizes the browser.
	var bh=browserHeight();
	var mainTextHeight=bh - elementHeight(document.getElementById('titleImg'));
	var textHeight=elementHeight('maintext');
	if (mainTextHeight>=textHeight) {
		document.getElementById('maintext').style.top=Math.round((mainTextHeight-textHeight)/2) + 'px';
	}
	else {
			document.getElementById('maintext').style.top='0px';
	}
}

function cutupMouse() {
	// This gets called each time the mouseover event occurs over
	// one of the html elements with id such as j0 or j5 etc.
  var x=this.getAttribute("data-idnum");
  var xint=parseInt(x);
  gStateOfArt[xint]=(gStateOfArt[xint]+1) % gPassages;
  // When the reader places the mouse over part n of text t, the 
  //program replaces that small text with part n of text t+1. 
  cutup(this, gStateOfArt[xint], xint);
}

function cutup(Textian, jstate, jposition) {
	// Gets called each time the program stirs the text.
	// Textian is the html object. jstate is the number
	// of the passage. jposition is the number of the part.
  Textian.innerHTML=gTextArray[jstate][jposition];
  Textian.className=gPassageStyles[jstate];
}

function touchInProgress(e) {
	// Gets called each time the user stirs the text on a touchscreen.
	var touch = e.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	var el= document.elementFromPoint(x,y); 
	//el is the topmost element the user is touching.
	if (el) {
    var dataType=el.getAttribute('data-type');
    // Each of the gLength HTML elements with id of j0 or j24
    // (or whatever) have data-type="t". Tagged inner content
    // of those elements must have data-type="c".
    if (dataType) {
    	// Then el is either one of our j0 to j24 elements or
    	// an element inside those.
    	while (dataType != 't') {
    		// This loop ensures that el ends up being one of our
    		// targeted j0 to j24 elements.
    		el=el.parentNode;
    		dataType=el.getAttribute('data-type');
    	}
    	var idnumasstring=el.getAttribute("data-idnum");
	    if (idnumasstring) {
	      var idnum=parseInt(idnumasstring);
	      gStateOfArt[idnum]=(gStateOfArt[idnum]+1)%gPassages;
	      cutup(el, gStateOfArt[idnum], idnum);
	    }

    }
	}
} // end of touchInProgress

function order() {
	// Called when the user clicks the button that
	// cycles through the texts.
	gCounter=(gCounter+1) % gPassages;
	for (var i=0; i<gLength; i++) {
		var el=document.getElementById("j"+i)
		el.innerHTML = gTextArray[gCounter][i];
		el.className=gPassageStyles[gCounter];
	}
}

/*
	var maintext=document.getElementById('maintext');
  for (var i=0; i<gLength; i++) {
	  var n=document.createElement('span');
	  n.setAttribute('id', 'j'+i);
	  n.setAttribute('class', gPassageStyles[gCounter]);
	  n.setAttribute('data-type', 't');
	  n.setAttribute('data-idnum', i.toString());
	  n.innerHTML=gTextArray[gCounter][i];
	  gObjArray[i]=n;
	  maintext.appendChild(n);
	}
	*/
