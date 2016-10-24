//declare inlets and outlets //new version
inlets = 5;
outlets = 5;

var distance = 0;
var light = 0;
var debug = false;
var WHAT_IS_CLOSE = 30;
var WHAT_IS_DARK = 30;
var startLoop = false;
//var textEdit = this.patcher.getnamed("textEdit");
//add the built in function of msg_float() so it does something when it receives a float
function msg_float(v)
{
	//myPlayList = this.patcher.getnamed("myPlayList");
	if (inlet==0) {
		distance = v;	
		if (debug){ 
			distance = WHAT_IS_CLOSE +30;
		}else{
			var gain = 158*distance/128;
			outlet(1,gain);
			doTheThing();
		}			
	}
	
	if (inlet==4) {
		light = v;
		if (debug){ 
			light = WHAT_IS_DARK +30;
		}else{
			var gain = 158*light/128;
			outlet(3,gain);
		}
	}
}

function bang(){
	debug=!debug;
	var textEdit = this.patcher.getnamed("textEdit");
	if (debug){
		post("!!In debugMode\n");
		//outlet(4,3445);
		if(textEdit==null){	
			post("Mess not sent");
		}else{
			//textEdit.int(3245);
			textEdit.set("In debugmode");
			textEdit.borderww = 4.0;
			//textEdit.bang();
			post("Mess sent");
		}
		
	}else{
		//post("In running mode\n");
		//outlet(4,append, "ttrer");
		//outlet(4,1234);
		if(textEdit==null){	
			post("Mess not sent");
		}else{
			textEdit.set("In runningmode");
			textEdit.border = 10.0;
		}
		startLoop = true;
		outlet(0,1);
		outlet(2,1);
	}
}

function start(a,b){
	if(b.indexOf("Synth")>0){
		startLoop = true;
	}
}

function done(a,b){
	if(b.indexOf("Synth")>0){
		startLoop = false;
	}
}

function doTheThing(){
	if (distance >= WHAT_IS_CLOSE && light >= WHAT_IS_DARK){
		post("OK play the crap\n");
		if(!startLoop){
			outlet(0,1);
			outlet(2,1);
		}
	}else{ 
		outlet(0,0);
		//outlet(2,0);
		startLoop = false;
	}
}


