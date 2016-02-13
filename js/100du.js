$(function () {
	//搜索框切换
	(function(){
		var aLi = $('#search_bar').find('li');
		var oText = $('#search_bar').find('.main .text')
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var iNow = 0;
		oText.val(arrText[iNow]);
		aLi.each(function (index) {
			$(this).click(function () {
				aLi.removeClass('active');
				$(this).addClass('active');
				oText.val(arrText[index]);
				iNow = index;
			})
		})
		oText.focus(function(){
			if ($(this).val() == arrText[iNow]) {
				oText.val('')
			}
		})
		oText.blur(function (){
			if ($(this).val() == '') {
				oText.val(arrText[iNow])
			}
		})
	})();
	//滚动播放
	(function () {
		var oUl = $('#search_bar').find('.key_text ul');
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'' },
			{ 'name':'畅畅', 'time':7, 'title':'广东3天抓获涉黄疑犯', 'url':'' },
			{ 'name':'萱萱', 'time':9, 'title':'国台办回应王郁琦', 'url':'' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'' },
			{ 'name':'萱萱', 'time':13, 'title':'那些灿烂华美的瞬间', 'url':'' },
			{ 'name':'畅畅', 'time':15, 'title':'广东3天抓获涉黄疑犯', 'url':'' },
		];
		var oUp = $('#search_bar .key_text').find('.triangle_up');
		var oDown = $('#search_bar .key_text').find('.triangle_down_red');
		var iNow = 0;
		var timer = null;
		var str = '';
		for ( var i=0; i<arrData.length; i++ ) {
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
		}
		oUl.html( str );
		oUp.click(function () {
			move(-1);
		});
		oDown.click(function () {
			move(1);
		});
		oUl.hover(function (){
			clearInterval( timer );
		},autoPlay);
		function autoPlay() {
			timer = setInterval(function () {
				move(-1);
			}, 3500);
		}
		autoPlay();
		function move(num){
			iNow += num;
			if ( Math.abs(iNow) > arrData.length-1 ) {
				iNow = 0;
			}
			if ( iNow > 0 ) {
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({top: 30*iNow }, 2200, 'elasticOut');
		}
	})();
	//选项卡
	(function () {
		fn($('.tabNav1'),$('.tabCon1'),'click');
		fn($('.tabNav2'),$('.tabCon2'),'click');
		fn($('.tabNav3'),$('.tabCon3'),'mouseover');
		fn($('.tabNav4'),$('.tabCon4'),'mouseover');
		function fn(aNav,aCon,event) {
			var aLi = aNav.find('li');
			aCon.hide().eq(0).show();
			aLi.each(function (index) {
				$(this).on(event,function () {
					aLi.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aLi.find('a').attr('class', 'triangle_down_gray');
					$(this).find('a').attr('class', 'triangle_down_red');
					aCon.hide().eq(index).show();
				})
			})
		}
	})();
	//自动播放焦点图
	(function () {
		var oPic = $('.recommend .picture').find('.window');
		var aImg = $('.recommend .picture .pic').find('img');
		var oP = $('.recommend .picture').find('p');
		var arrText = [
			{'title':'爸爸去哪儿啦...','src':'./img/content/img1.gif'},
			{'title':'人像摄影中的光影感','src':'./img/content/img2.gif'},
			{'title':'娇柔妩媚、美艳大方','src':'./img/content/img3.gif'},
		]
		var iNow = 0;
		var timer = null;
		oPic.attr('src',arrText[0].src);
		oP.html(arrText[0].title);
		aImg.each(function (index) {
			$(this).click(function () {
				iNow = $(this).index();
				fn();
			})
		})
		$('.recommend .picture').hover(function () {
			clearInterval(timer);
		},auto)
		auto();
		function auto() {
			timer = setInterval(function () {
				iNow++;
				iNow%=aImg.length;
				fn();
			},2000)
		}
		function fn() {
			aImg.removeClass('active').eq(iNow).addClass('active');
			oP.html(arrText[iNow].title);
			oPic.attr('src',arrText[iNow].src);
		}
	})();
	//BBS高亮显示
	(function () {
		$('.bbs ol li').mouseover(function () {
			$('.bbs ol li').removeClass('active');
			$(this).addClass('active');
		})
	})();
	//日历区域
	(function () {
		var aSpan = $('.calendar h3 span');
		var aImg = $('.calendar ol .img');
		var oDiv = $('.calendar .detail');
		var oImg = oDiv.find('img');
		var oStrong = oDiv.find('strong');
		var oP = oDiv.find('p');
		var oSpan = oDiv.find('span');
		aImg.hover(function () {
			var iTop = $(this).parent().position().top - 30;
			var iLeft = $(this).parent().position().left + 50;
			var index = $(this).parent().index()%7;
			oDiv.show().css({'left':iLeft,'top':iTop});
			oImg.attr('src',$(this).attr('src'));
			oP.html($(this).attr('info'));
			oStrong.html(aSpan.eq(index).text());
			oSpan.html($(this).attr('title'))
		},function () {
			oDiv.hide()
		})
	})();
	//红人烧客
	(function () {
		var arr = [
			'',
			'用户名：性感宝贝1<br>区域：朝阳CBD<br>人气：111111',
			'用户名：性感宝贝2<br>区域：朝阳CBD<br>人气：222222',
			'用户名：性感宝贝3<br>区域：朝阳CBD<br>人气：333333',
			'用户名：性感宝贝4<br>区域：朝阳CBD<br>人气：444444',
			'用户名：性感宝贝5<br>区域：朝阳CBD<br>人气：555555',
			'用户名：性感宝贝6<br>区域：朝阳CBD<br>人气：666666',
			'用户名：性感宝贝7<br>区域：朝阳CBD<br>人气：777777',
			'用户名：性感宝贝8<br>区域：朝阳CBD<br>人气：888888',
			'用户名：性感宝贝9<br>区域：朝阳CBD<br>人气：999999',
			'用户名：性感宝贝10<br>区域：朝阳CBD<br>人气：000000',
		];
		var aImg = $('.hot_pic li img');
		var oP = $('.hot_pic p');
		aImg.hover(function () {
			var iLeft = $(this).position().left;
			var iTop = $(this).position().top;
			if ( $(this).parent().index() == 0 ) return;
			if ( $(this).parent().index() == 6 || $(this).parent().index() == 10){
				oP.show().css({'left':iLeft - 80,'top':iTop});
			} else {
				oP.show().css({'left':iLeft,'top':iTop});
			}
			oP.html(arr[$(this).parent().index()]);
		},function () {
			oP.hide()
		})
	})();
})