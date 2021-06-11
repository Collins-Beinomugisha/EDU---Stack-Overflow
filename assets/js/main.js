
function getAllUrlParams() {
	var queries = location.search.slice(1).split("&");
	var obj = {};
	for (var i in queries) {
		if (queries[i] != "") {
			var tmp = queries[i].split("=");
			obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
		}
	}
	return obj;
}

function $(id) {
	return document.getElementById(id);
}

function sanetize(str) {
	return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function finishLoading() {
	$("load").style.display = "none";
	$("page").style.display = "";
}

function truncate(str, len) {
	var returnValue = str;
	if (str.length > len) {
		returnValue = str.slice(0, len) + "...";
	}
	return returnValue;
}

function toBlock(id, post) {
	var html = `<div class="post" onclick="goToPost(${id});">
		<a href="post.html?id=${id}" style="font-size:100%;text-decoration:none;"><b>${emojify(sanetize(truncate(post.title, 100)))}</b></a>
		<div class="meta" style="margin-top:3px;">
			<span>
				Posted by: <a href="user.html?id=${encodeURIComponent(post.poster)}">${sanetize(post.poster)}</a>${post.verified ? "&#10004;&#65039;" : ""}<br/>
				&#8679; ${post.upvotes} &#8681 ${post.downvotes}
			</span>
		</div>
	</div>`;
	return html;
}

function goToPost(id) {
	location.href = "post.html?id="+id;
}


