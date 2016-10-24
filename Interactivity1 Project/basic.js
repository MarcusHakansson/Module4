inlets = 3;
outlets = 1;
var mess = 	this.patcher.getnamed("mess");
function bang(){
	post("Bang\n");
}

function msg_float(f){
 post("Got value: "+f +"\n");
 	mess.set("Float value: "+f);
	outlet(0,f);
	mess.set("float value: "+f);
}

function msg_int(i){
	post("Got value: "+i+"\n");
	outlet(0,i);
	mess.set("int value: "+i);
}