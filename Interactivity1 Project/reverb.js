inlets = 5;

var sliderLeft =0;
var volumeLeft = 0;
var volumeRight = 0;
var playing= false;

//The three standard functions that are called from connected devices.

function bang(){
	var leftInput = this.patcher.getnamed("sliderLeft");
	var rightInput = this.patcher.getnamed("sliderRight");
	var leftGain = this.patcher.getnamed("leftGain");
	var rightGain = this.patcher.getnamed("rightGain");
	var myPlayList = this.patcher.getnamed("myPlayList");
	if(inlet ==0){
		//myPlayList.play(1);  //Not working the way I thought.....
		myPlayList.loop(1,1);
		myPlayList.int(1);
		leftInput.set(100);
		rightInput.set(120);
		leftGain.set(50);
		rightGain.set(80);
		
	}
	if (inlet == 1){
		leftInput.set(0);
		rightInput.set(0);
		leftGain.set(0);
		rightGain.set(0);
		myPlayList.pause();
	}	
}

function msg_float(f){
	//
	post("f: "+f+"\n");
	var leftGain = this.patcher.getnamed("leftGain");
	var rightGain = this.patcher.getnamed("rightGain");
	var myPlayList = this.patcher.getnamed("myPlayList");
	//myPlayList.loop(1,0);
	if (inlet==2){
		volumeLeft = f;
		
 		if (volumeLeft > 20){
			leftGain.set(volumeLeft);
		}
	}
	if (inlet ==3){
		volumeRight = f;
		if (volumeRight > 20){
			rightGain.set(volumeRight + 20);
		}
	}
	if(volumeLeft<40&&volumeRight<40){
		myPlayList.pause();
		playing = false;
	}
	if(volumeLeft>100&&volumeRight>100){
		if (!playing){
			myPlayList.int(1);	
			playing = true;
		}
	}
	
}

function msg_int(i){
	/*post("i: "+i + "\n");*/
	
}

//These functions are called from the playlist
//Look at the documentation for playlist on output.

function start(a,b){
	post("start Tune number "+ a+" "+ b +"\n");
	
}

function done(a,b){
	post("done+Tune number "+ a+" "+ b +"\n");
	if(volumeLeft>80&&volumeRight>80){
		var myPlayList = this.patcher.getnamed("myPlayList");
		myPlayList.int(1);
		playing = true;
	}else{
		playing = false;
	}
}