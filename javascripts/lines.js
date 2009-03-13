/*
  This is a javascript library used to draw lines on the screen easily and efficiently. 
  It is largely taken from a demo found on http://www.p01.org/releases/Drawing_lines_in_JavaScript/ (I believe it was written by Mathieu 'P01' HENRI)
  I just turned it into a Prototype class, with some useful functions.
*/

var LINE_PATH = "images/line_images"


var preloadedLineImages = false;
document.observe("dom:loaded", function(){ 
  initialize_line_drawing();
});

function initialize_line_drawing()
{
  if($("preload"))
    return;
  var preload_div = new Element("div",{"id":"preload","style":"visibility:hidden; height:0px; width:0px;"});
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/1up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/1down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/2up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/2down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/4up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/4down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/8up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/8down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/16up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/16down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/32up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/32down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/64up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/64down.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/128up.gif"}));
  preload_div.insert(new Element("img",{"src":LINE_PATH+"/128down.gif"}));
  document.body.insert(preload_div);
  document.body.insert(new Element("style").update(".line {position:absolute;}"))
  preloadedLineImages = preload_div.select('img');
} 

var Line = Class.create({
  initialize: function(x1,y1,x2,y2)
  {
    initialize_line_drawing(); //incase called from within a script tag and not yet initialized
    this.handle = new Element("img",{"class":"line"});
    document.body.insert(this.handle);
		this.update(x1,y1,x2,y2);
  },
  
  update: function(Ax,Ay,Bx,By)
  {
    var
  		xMin		= Math.min( Ax, Bx ),
  		yMin		= Math.min( Ay, By ),
  		xMax		= Math.max( Ax, Bx ),
  		yMax		= Math.max( Ay, By ),
  		boxWidth	= Math.max( xMax-xMin, 1 ),
  		boxHeight	= Math.max( yMax-yMin, 1 ),
  		tmp			= Math.min( boxWidth, boxHeight, 256 ),
  		lineIndex	= (Bx-Ax)*(By-Ay)<0?0:1;

  	while( tmp>>=1 )
  		lineIndex+=2;

    if(lineIndex<0 || lineIndex>preloadedLineImages.length-1)
      return;

  	this.handle.src = preloadedLineImages[lineIndex].src;
  	with( this.handle.style )
  	{
  		width	= boxWidth	+"px";
  		height	= boxHeight	+"px";
  		left	= xMin		+"px";
  		top		= yMin		+"px";
  	}
  	
  	this.x1 = Ax;
  	this.x2 = Bx;
  	this.y1 = Ay;
  	this.y2 = By;
  },
  
  destroy: function()
  {
    this.handle.remove();
  },
  
  start: function()
  {
    return [this.x1,this.y1];
  },
  
  stop: function()
  {
    return [this.x2,this.y2];
  }
});
