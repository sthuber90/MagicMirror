/* global console */
/* exported Log */

/* Magic Mirror
 * Logger
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

// This logger is very simple, but needs to be extended.
// This system can eventually be used to push the log messages to an external target.

const Log = (function () {
	const module = {
		do: function (i) {
			console.log(i);
			try {
				sendLogsToHumio(i);
			} catch (err) {
				console.error(err);
			}
		}
	};
	return {
		info: Function.prototype.bind.call(module.do, console),
		log: Function.prototype.bind.call(module.do, console),
		error: Function.prototype.bind.call(module.do, console),
		warn: Function.prototype.bind.call(module.do, console),
		group: Function.prototype.bind.call(console.group, console),
		groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
		groupEnd: Function.prototype.bind.call(console.groupEnd, console),
		time: Function.prototype.bind.call(console.time, console),
		timeEnd: Function.prototype.bind.call(console.timeEnd, console),
		timeStamp: Function.prototype.bind.call(console.timeStamp, console)
	};
})();

function sendLogsToHumio(message) {
	const url = "https://cloud.humio.com/api/v1/dataspaces/humio/ingest-messages";

	var fields = {
		"url": window.location.href,
		// "hostname": extractHostname(window.location.href),
		"device": navigator.appVersion,
		"message": message
	};

	const request = [
		{
			"type": "syslog",
			"fields": fields,
			"messages": [
				message
			]
		}
	];

	fetch(url, {
		method: "POST",
		body: JSON.stringify(request),
		headers: new Headers({
			"Content-Type": "application/json",
			"Authorization": "Bearer " + process.env.HUMIO_TOKEN
		})
	}).then(function () { console.log("sucessfully sent logs"); }).catch(function (error) { console.log("error:", error); });
};
