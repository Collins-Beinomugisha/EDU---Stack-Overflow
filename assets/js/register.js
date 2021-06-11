window.onload = function() {
	$("send").onclick = function(e) {
		$("blank").style.display = "none";
		$("pword").style.display = "none";
		$("err").style.display = "none";
		var username = $("username").value.trim().replace(/ /g,"_");
		var password = $("password").value;
		var password2 = $("password2").value;
		var name = $("name").value;
		var showname = $("showname").value;
		var email = $("email").value;
		var showemail = $("showemail").value;
		var bday = $("bday").value;
		var showbday = $("showbday").value;
		if (username != "" && password != "") {
			if (password == password2) {
				fetch("https://api.eduStack.com/createuser.sjs", {method:"POST",headers:{'Content-Type': 'application/x-www-form-urlencoded'},body:`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&password2=${encodeURIComponent(password2)}&name=${encodeURIComponent(name)}&showname=${showname}&email=${encodeURIComponent(email)}&showemail=${showemail}&birthday=${encodeURIComponent(bday)}&showbday=${showbday}`}).then(response => response.text()).then((response) => {
					if (response.trim() == "Created") {
						location.href = "login.html";
					} else {
						document.getElementById("err").style.display = "";
					}
				}).catch((err) => {});
			} else {
				$("pword").style.display = "";
			}
		} else {
			$("blank").style.display = "";
		}
	}
}