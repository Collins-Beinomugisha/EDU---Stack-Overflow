function login() {
	var username = $("username").value.trim();
	var password = $("password").value;
	var otp = $("otp").value.trim();
	if (username != "" && password != "" && (!otpmode || (otpmode && otp != ""))) {
		var body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}${otpmode ? `&otp=${otp}` : ""}`;
		fetch("https://api.eduStack.com/v3/createsess.sjs", {method:"POST",headers:{'Content-Type': 'application/x-www-form-urlencoded'},body:body}).then(response => response.text()).then((sess) => {
			sess = sess.trim();
			if (sess == "Invalid username or password") {
				$("badnamepass").style.display = "";
			} else if (sess == "OTP required") {
				otpmode = true;
				$("otpinput").style.display = "";
				$("otp").focus();
			} else {
				localStorage.username = username;
				localStorage.sess = sess;
				if (getAllUrlParams().redir != undefined && getAllUrlParams().redir.trim() != "") {
					location.href = decodeURIComponent(getAllUrlParams().redir);
				} else {
					location.href = "/";
				}
			}
		}).catch((err) => {});
	} else {
		$("blank").style.display = "";
	}
}

var otpmode = false;

window.onload = function() {
	if (localStorage.sess != undefined) {
		if (getAllUrlParams().redir != undefined && getAllUrlParams().redir.trim() != "") {
			location.href = decodeURIComponent(getAllUrlParams().redir);
		} else {
			location.href = "/";
		}
	}
	$("login").onclick = function(e) {
		login();
	}
	$("username").onkeyup = function(e) {
		if (e.key == "Enter") {
			$("password").focus();
		}
	}
	$("password").onkeyup = function(e) {
		if (e.key == "Enter") {
			if (otpmode) {
				$("otp").focus();
			} else {
				login();
			}
		}
	}
	$("otp").onkeyup = function(e) {
		if (e.key == "Enter") {
			login();
		}
	}
}