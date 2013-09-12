SmileRPG = {};

SmileRPG.init = function() {
	SmileRPG.XPLABEL.html(SmileRPG.PPL);
	SmileRPG.initCamera();
}

SmileRPG.initCamera = function() {
	var sd = new SmileDetector("vid");
	sd.onSmile(SmileRPG.smileCB);
	sd.start(SmileRPG.CBTO);
}

SmileRPG.smileCB = function(isSmile){
	if(isSmile) {
		SmileRPG.ptsToNext -= SmileRPG.PPCB;
		if(SmileRPG.ptsToNext < 1) {
			SmileRPG.ptsToNext = SmileRPG.PPL;
			SmileRPG.currentLvl++;
			SmileRPG.LVLLABEL.html(SmileRPG.currentLvl);
		}
		SmileRPG.XPLABEL.html(SmileRPG.ptsToNext);
	}

}

SmileRPG.PPL = 1000;
SmileRPG.PPCB = 100;
SmileRPG.CBTO = 100;
SmileRPG.XPLABEL = $('#xpToUp').children();
SmileRPG.LVLLABEL = $('#level').children();

SmileRPG.currentLvl = 1;
SmileRPG.ptsToNext = SmileRPG.PPL;
SmileRPG.currentTime = 0;


document.addEventListener("DOMContentLoaded", function () {
	SmileRPG.init();
});