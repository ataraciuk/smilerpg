SmileRPG = {};

SmileRPG.init = function() {
	SmileRPG.XPLABEL.html(SmileRPG.PPL);
	SmileRPG.TWITTERBTN.click(function(e) {
		window.open(this.href, '_blank','width=640, height=480');
	});
	google.setOnLoadCallback(SmileRPG.onGoogleLoad);
}

SmileRPG.initCamera = function() {
	var sd = new SmileDetector("vid");
	sd.onSmile(SmileRPG.smileCB);
	sd.start(SmileRPG.CBTO);
}

SmileRPG.onGoogleLoad = function () {
	SmileRPG.imageSearch = new google.search.ImageSearch();
	SmileRPG.imageSearch.setSearchCompleteCallback(this, SmileRPG.searchComplete, null);
    // Include the required Google branding
    google.search.Search.getBranding('branding');
    $('#instructions').show();
    $('#hateBtn').click(function(e){
    	e.preventDefault();
    	var val = $('#hateVal').val().trim();
    	if(val.length > 0) {
    		SmileRPG.imageSearch.execute(val);
    		SmileRPG.searchVal = val;
    	}
    });
}

SmileRPG.smileCB = function(isSmile){
	if(isSmile) {
		if(!SmileRPG.lost) {
			if(!SmileRPG.firstSmile) SmileRPG.currentTime = new Date().getTime();
			SmileRPG.firstSmile = true;
			SmileRPG.ptsToNext -= SmileRPG.PPCB;
			if(SmileRPG.ptsToNext < 1) {
				SmileRPG.ptsToNext = SmileRPG.PPL;
				SmileRPG.currentLvl++;
				SmileRPG.LVLLABEL.html(SmileRPG.currentLvl);
				SmileRPG.LVLLABEL.animate({'font-size':'+=10px'}, function(){
					SmileRPG.LVLLABEL.animate({'font-size':'-=9px'});
				});
			}
			SmileRPG.XPLABEL.html(SmileRPG.ptsToNext);
			SmileRPG.XPBAR.css('width', + (SmileRPG.PPL - SmileRPG.ptsToNext) * 100 / SmileRPG.PPL + '%');
		}
	} else if(SmileRPG.firstSmile && !SmileRPG.lost) {
		SmileRPG.lost = true;
		var playedTime = Math.floor((new Date().getTime() - SmileRPG.currentTime) / 1000);
		$('#afterImg').fadeOut(function(){
			$('#gameOver').fadeIn();
		});
		var lvlTxt = "I reached level "+SmileRPG.currentLvl+" in Smile: RPG! #socialhacking";
		var strangerTxt = 'I allowed a stranger to access my camera for '+playedTime+' seconds! #socialhacking';
		var playTxt = 'I spent '+playedTime+' seconds smiling at a picture of '+SmileRPG.searchVal + ' #socialhacking';
		SmileRPG.TWITTERBTN
			.attr('href', SmileRPG.TWEETERBASE + encodeURIComponent(strangerTxt)).click()
			.attr('href', SmileRPG.TWEETERBASE + encodeURIComponent(playTxt)).click()
			.attr('href', SmileRPG.TWEETERBASE + encodeURIComponent(lvlTxt)).click();
		FB.ui({
			method: 'feed',
			link: 'http://ataraciuk.github.io/smilerpg',
			caption: 'Smile: RPG',
			description: lvlTxt+'\n\n'+playTxt+'\n\n'+strangerTxt,
			picture: SmileRPG.pictureUrl
			}, function(response){});
		
	}

}

SmileRPG.searchComplete = function() {
	if (SmileRPG.imageSearch.results && SmileRPG.imageSearch.results.length > 0) {
		SmileRPG.pictureUrl = SmileRPG.imageSearch.results[0].url;
		$('#resultImg').attr('src', SmileRPG.pictureUrl);
		$('#instructions').fadeOut(function(){
			$('#afterImg').fadeIn();
			$('#gameScore').fadeIn();
		});
		SmileRPG.initCamera();
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
SmileRPG.searchVal = '';
SmileRPG.pictureUrl = '';


document.addEventListener("DOMContentLoaded", function () {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
		FB.init({
	  		appId: '215564378604605',
	  		channelUrl: '//ataraciuk.github.io/smilerpg/channel.html',
		}); 
	});    
	//$('#loginbutton,#feedbutton').removeAttr('disabled');
	SmileRPG.init();
});