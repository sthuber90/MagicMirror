// add functionality to refresh page if JS was stopped, because for instance screen was logged or something the like

function getTime() {
	return new Date().getTime();
}

var lastInterval = getTime();

["visibilitychange", "msvisibilitychange", "webkitvisibilitychange"].forEach(function (event) {
	document.addEventListener(event, function () {
		const now = getTime();
		Log.log(`Now: ${now} - Last Interval: ${lastInterval} - Diff: ${now - lastInterval} < 45sec?`);
		if (!document.hidden && now - lastInterval >= 45000) {
			location.reload();
		}
		lastInterval = now;
	});
});
