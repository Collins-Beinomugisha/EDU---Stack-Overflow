

window.onload = function () {
  var sess = localStorage.sess;
  $("recent").onclick = function (e) {
    $("mainfeed").style.display = "";
    $("followblob").style.display = "none";
  };
  $("current").onclick = function (e) {
    $("mainfeed").style.display = "none";
    $("followblob").style.display = "";
  };
}
