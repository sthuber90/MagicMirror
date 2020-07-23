// add functionality to refresh page if JS was stopped, because for instance screen was logged or something the like

function getTime() {
	return new Date().getTime();
}

var lastInterval = getTime();

// is not supported when page is used as home screen app on iOS
// ["visibilitychange", "msvisibilitychange", "webkitvisibilitychange"].forEach(function (event) {
// 	document.addEventListener(event, function () {
// 		const now = getTime();
// 		Log.log(`Now: ${now} - Last Interval: ${lastInterval} - Diff: ${now - lastInterval} < 45sec?`);
// 		if (!document.hidden && now - lastInterval >= 45000) {
// 			location.reload();
// 		}
// 		lastInterval = now;
// 	});
// });

setInterval(function () {
	const now = getTime();
	Log.info("Set Interval Reloader");
	Log.log(`Now: ${now} - Last Interval: ${lastInterval} - Diff: ${now - lastInterval} < 45sec?`);
	if (!document.hidden && now - lastInterval >= 45000) {
		Log.warn("RELOAD!");
		location.reload();
	}
	lastInterval = now;
}, 45000);
