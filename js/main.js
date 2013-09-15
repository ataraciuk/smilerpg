SmileRPG = {};

SmileRPG.init = function() {
	SmileRPG.XPLABEL.html(SmileRPG.PPL);
	SmileRPG.initCamera();
	SmileRPG.TWITTERBTN.click(function(e) {
		window.open(this.href, '_blank','width=640, height=480');
	});
	//google.load("search", "1");
	//google.setOnLoadCallback(SmileRPG.onGoogleLoad);
	$.get('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey&callback=SmileRPG.processResults');
}

SmileRPG.processResults = function (d) {
	$('#resultImg').attr('src', d.responseData.results[0].url);
}

SmileRPG.initCamera = function() {
	var sd = new SmileDetector("vid");
	sd.onSmile(SmileRPG.smileCB);
	sd.start(SmileRPG.CBTO);
	SmileRPG.currentTime = new Date().getTime();
}

SmileRPG.onGoogleLoad = function () {
	SmileRPG.imageSearch = new google.search.ImageSearch();
	SmileRPG.imageSearch.setSearchCompleteCallback(this, SmileRPG.searchComplete, null);
    SmileRPG.imageSearch.execute("pony");
    // Include the required Google branding
    google.search.Search.getBranding('branding');
}

SmileRPG.smileCB = function(isSmile){
	if(isSmile) {
		if(!SmileRPG.lost) {
			SmileRPG.firstSmile = true;
			SmileRPG.ptsToNext -= SmileRPG.PPCB;
			if(SmileRPG.ptsToNext < 1) {
				SmileRPG.ptsToNext = SmileRPG.PPL;
				SmileRPG.currentLvl++;
				SmileRPG.LVLLABEL.html(SmileRPG.currentLvl);
			}
			SmileRPG.XPLABEL.html(SmileRPG.ptsToNext);
			SmileRPG.XPBAR.css('width', + (SmileRPG.PPL - SmileRPG.ptsToNext) * 100 / SmileRPG.PPL + '%');
		}
	} else if(SmileRPG.firstSmile && !SmileRPG.lost) {
		SmileRPG.lost = true;
		var playedTime = (new Date().getTime() - SmileRPG.currentTime) / 1000;
		var textToTweet = encodeURIComponent("I reached level "+SmileRPG.currentLvl+" in Smile: RPG! #socialhacking");
		SmileRPG.TWITTERBTN.attr('href', SmileRPG.TWEETERBASE + textToTweet).click()
			.attr('href', SmileRPG.TWEETERBASE + 
				encodeURIComponent('I allowed a stranger to use my camera for '+playedTime+' seconds! #socialhacking'))
			.click();
		
	}

}

SmileRPG.searchComplete = function() {
	if (SmileRPG.imageSearch.results && SmileRPG.imageSearch.results.length > 0) {
		$('#resultImg').attr('src', SmileRPG.imageSearch.results[0].url);
	}
}

SmileRPG.PPL = 1000;
SmileRPG.PPCB = 100;
SmileRPG.CBTO = 100;
SmileRPG.XPLABEL = $('#xpToUp').children();
SmileRPG.LVLLABEL = $('#level').children();
SmileRPG.XPBAR = $('#xpBar').children();
SmileRPG.TWEETERBASE = 'http://twitter.com/intent/tweet?text=';
SmileRPG.TWITTERBTN = $('#twitterA');
SmileRPG.GOOGLESEARCH = 'https://www.google.com/search?safe=off&tbm=isch&q=pony';

SmileRPG.currentLvl = 1;
SmileRPG.ptsToNext = SmileRPG.PPL;
SmileRPG.currentTime = 0;
SmileRPG.firstSmile = false;
SmileRPG.lost = false;
SmileRPG.imageSearch = null;


document.addEventListener("DOMContentLoaded", function () {
	SmileRPG.init();
});