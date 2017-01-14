
"use strict"
$(function() {
	$(window).on("keyup", function(e) {
		$(".search_text").focus();
		if (e.which > 48 && e.which < 105 || e.which == 8) {
			util.getJson();
		}
	});
	$(".search_text").bind("input propertychange", function(e) {
		//console.log(1)
		util.getJson()
	});
	$(".search_text").on("blur", function() {
		util.searchHide()
	});
	$(document).on("click", function(e) {
		$(".search_xl").hide();
	});
	$(".search_text").on("click", function() {
		util.getJson();
	});
	$(".search_xl").on("click", function(e) {
		if (e.target.tagName == "LI") {
			var text = $(e.target).text();
			$(".search_text").val(text);
			location.href = "http://cn.bing.com/search?q=" + text;
		}
	});
	$(".form").on("submit", function() {
		var text = $(".search_text").val();
		//alert(text)
		location.href = "http://cn.bing.com/search?q=" + text;
		return false;
	});
	$(".share").find(".div").on("mouseenter", function(e) {
		var than = this;
		new util.ShareAnimate(than).shareShow();
	});
	$(".share").find(".div").on("mouseleave", function(e) {
		var than = this;
		new util.ShareAnimate(than).shareHide();
	});
	$(".qq,.wb,.wx,.share_1").hover(function(e) {
			if (e.target.tagName == "SPAN") return;
			$(".qq,.wb,.wx,.share_1.qq,.wb,.wx,.share_1").stop(true)
			$(".wx").show().animate({
				"margin-left": "-60px"
			}, 120, function() {
				$(".wb").show().animate({
					"margin-left": "-120px"
				}, 120, function() {
					$(".qq").show().animate({
						"margin-left": "-180px"
					}, 120)
				});
			});
		}, function(e) {
			if (e.target.tagName == "SPAN") return;
			$(".qq,.wb,.wx,.share_1").stop(true);
			$(".qq").animate({
				"margin-left": -160
			}, 120, function() {
				$(".qq").hide();
				$(".wb").animate({
					"margin-left": -100
				}, 120, function() {
					$(".wb").hide();
					$(".wx").animate({
						"margin-left": -40
					}, 120, function() {
						$(".wx").hide();
					});
				});
			});
		});
})

var util = {
	searchShow: function() {
		var $div = $("<div></div>");
		$div.attr("class", "search_div")
		if ($(".search_div").length == 0) {
			$div.appendTo($(body));
			$div.animate({
				opacity: 0.5
			}, 400);
		}
		$(window).on("resize", function(e) {
			$div.height(e.pageY).width("e.pageX")
		})
	},
	searchHide: function() {
		$(".search_div").animate({
			opacity: 0
		}, 400, function() {
			$(".search_div").remove();
		})
	},
	addScript: function(url) {
		var script = document.createElement("script");
		script.id = url;
		var id = document.getElementById(url);
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	getJson: function(e) {
		util.searchShow()
		var searchText = $(".search_text").val();
		var sugurl = "http://suggestion.baidu.com/su?wd=" + searchText + "&cb=window.baidu.sug";
		sugurl = sugurl.replace("#content#", searchText);
		//定义回调函数
		window.baidu = {
				sug: function(json) {
					//alert(json)
					//console.log(json)
					var html = "";
					var json = json.s;
					for (var i = 0; i < json.length; i++) {
						html += "<li>" + json[i] + "</li>"
					}
					$(".search_xl").html(html);
					$(".search_xl").show();
				}
			}
			//动态添加JS脚本
		if ($("#url").length === 0) {
			util.addScript("url")
			$("#url").attr("src", sugurl)
		} else {
			$("#url").remove();
			util.addScript("url")
			$("#url").attr("src", sugurl)
		};
	},
	ShareAnimate: function(ele) {
		this.ele = ele;
	}
};
util.ShareAnimate.prototype.shareHide = function() {
		var left = -336,
			i = 0;
		var that = this;
		var time = setInterval(function() {
			if (i < 9) {
				$(that.ele).css("background-positionX", left);
				i++;
				left += 42;
				//console.log(time)
			} else {
				$(this.ele).css({
					height: "40px",
					width: "40px",
					margin: "0px 10px"
				});
				clearInterval(time)
			};
		}, 1000 / 500)
	},
	util.ShareAnimate.prototype.shareShow = function() {
		var left = 0,
			i = 0,
			that = this;
		$(this.ele).css({
			height: "42px",
			width: "42px",
			margin: "-1px 9px"
		});
		var time = setInterval(function() {
			//alert(left)
			if (i < 8) {
				$(that.ele).css("background-positionX", left);
				i++;
				left -= 42;
				//console.log(time)
			} else {
				clearInterval(time)
			}
		}, 1000 / 500)
	};
