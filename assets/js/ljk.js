var listFun = {
	/****************************
	 * 
	 * 点击输入框，即输入框获得焦点的时候，其父级边框有focus样式
	 * 
	 * ***************************/
	listLiFocus:function(){
		var list_li = $('.list_li');
		
		list_li.each(function(i,item){
			var inp = $(item).find("input");
			inp.on("focus",function(){
				$(item).addClass("active");
			})
			inp.on("blur",function(){
				$(item).removeClass("active");
			})
		})
	},
	
	/***********************************
	 * 
	 * 获取验证码
	 * 
	 * *********************************/
	getCode:function(){
		//再次点击发送验证码的时间间隔
		var TIME = 60;
		var num = TIME;
		
		var code_btn = $("#code_btn");
		var setTime = null;
		
		code_btn.on("click",function(){
			var that = $(this);
			$(this).attr("disabled",true);
			setTime = setInterval(function(){
				num -- ;
				if(num < 0){
					that.text("获取验证码");
					that.attr("disabled",false);
					clearInterval(setTime);
					num = TIME;
				}else{
					that.text(num);
				}
			},1000)
		})
	},
	
	/************************************
	 * 
	 * 注册表单验证
	 * 
	 * *******************************/
	testFromInput:function(){
		var phone_code = $('#phone_code');
		var pwd = $("#pwd");
		var pwd_repeat = $("#pwd_repeat");
		var test_code = $("#test_code");
		var msg = $("#msg");
		
		phone_code.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("手机号码不能够为空！");
			}
		})
		pwd.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("请输入由数字，字母组成的6-15位密码！");
			}
		})
		pwd_repeat.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("请再次输入确认密码！");
			}
		})
		test_code.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("验证码不能够为空！");
			}
		})
	},
	
	/************************************
	 * 
	 * 登录表单验证
	 * 
	 * *******************************/
	signTestFromInput:function(){
		var phone_code = $('#phone_code');
		var pwd = $("#pwd");
		var test_code = $("#test_code");
		var msg = $("#msg");
		
		phone_code.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("账号不能够为空！");
			}
		})
		pwd.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("请输入密码！");
			}
		})
		test_code.on("blur",function(){
			if($(this).val() == ""){
				msg.show().text("验证码不能够为空！");
			}
		})
	},
	/******************************
	 * 
	 * 数字输入框组件（包含加减运算，input可以输入）
	 * 
	 * 在输入框上，默认写有最小值（data-min）和最大值(data-max)，如果没有这两个属性，那么最小值默认为0，最大值为999999。
	 * *******************************/
	numbox:function(){
		var reg = /^[1-9]\d{0,5}$/;
		
		//点击减号
		$('.numbox > .numbox_minus').on("click",function(){
			var inpE = $(this).parent().find('input');
			var min = $(inpE).attr("data-min") || 0;
			var max = $(inpE).attr("data-max") || 999999;
			var inpNum = Number(inpE.val());
			
			if(inpNum > min){
				inpE.val(inpNum-1);
			}else{
				inpE.val(min);
			}
		})
		//点击加号
		$('.numbox > .numbox_plus').on("click",function(){
			var inpE = $(this).parent().find('input');
			var min = $(inpE).attr("data-min") || 0;
			var max = $(inpE).attr("data-max") || 999999;
			var inpNum = Number(inpE.val());

			if(inpNum < max){
				inpE.val(inpNum+1);
			}else{
				inpE.val(max);
			}
		})
		
		//输入框
		$('.numbox').each(function(i,e){
			var oldNum = 0;
			var inpNum = 0;
			$(this).find('input').on('keyup',function(){
				var min = $(this).attr("data-min") || 0;
				var max = $(this).attr("data-max") || 999999;
				inpNum = Number($(this).val());
				if($(this).val() == ""){
					$(this).val("");
				}else if(reg.test($(this).val())){
					if(inpNum < min){
						$(this).val(min);
					}
					if(inpNum > max){
						$(this).val(max);
					}
					oldNum = $(this).val();
				}else{
					$(this).val(oldNum);
				}
			});
			$(this).find('input').on('blur',function(){
				var min = $(this).attr("data-min") || 0;
				var max = $(this).attr("data-max") || 999999;
				inpNum = Number($(this).val());
				if($(this).val() == ""){
					$(this).val(1);
				}
				if(inpNum < min){
						$(this).val(min);
					}
				if(inpNum > max){
					$(this).val(max);
				}
			})
			
		})
	},
	/***********************************************
	 * 
	 * 商品详情页面图片展示：点击上一张和下一张时，图片列表移动。点击列表中的图片，在大图显示区域显示出点击的图片（查看大图），获得焦点的元素的类默认为：active
	 * def = {
	 	* 	id:""		整个函数相关的所有元素的盒子
			prev:"",    点击跳转上一张的元素
			next:"",	点击跳转下一张的元素
			list:"",	图片列表盒子元素
			w:"",		图片每次移动的距离
			num:"",		图片列表显示出来的个数
			li:"",		装载图片的盒子
			big:"",		大图显示的盒子
		}
	 * 
	 * *********************************************/
	goodsListPic:function(params){
		var def = {
			id:"",
			prev:".prev",
			next:".next",
			list:"",
			w:"",
			num:"",
			li:"",
			big:""
		}
		var option = $.extend(def,params);
		
		var id = option.id;
		var prev = $(id).find(option.prev);
		var next = $(id).find(option.next);
		var list = $(id).find(option.list);
		var w = option.w;
		var num = option.num;
		var li = $(id).find(option.li);
//		var big = $(id).find(option.big);
		var big = findImg($(option.big));
		
		var liLen = li.size();
		//隐藏的图片元素个数
		var hNum = liLen - num;
		var picNum = 0;
		
		//点击列表图片，显示为高亮，同时替换大图的图片路径。
		li.click(function(){
			//点击元素显示高亮
			li.removeClass("active");
			$(this).addClass("active");
			//替换路径
			var thisSrc = findImg($(this)).attr("src");
			big.attr("src",thisSrc);
		})
		
		//点击上一张
		prev.click(function(){
			var listMargin = parseInt(list.css("margin-left"));
			if(listMargin > -hNum*w){
				picNum --;
				list.css("margin-left",picNum*w);
			}
		})
		//点击下一张
		next.click(function(){
			var listMargin = parseInt(list.css("margin-left"));
			if(listMargin < 0){
				picNum ++;
				list.css("margin-left",picNum*w);
			}
		})
		
		//如果当前元素是图片元素，则返回改元素，如果不是，那么就在改元素下面去找图片元素并返回（这样处理主要是考虑页面结构，可能页面上有这样的需求：
		//传进来的参数不一定是图片元素，而是它的父级）
		function findImg(e){
			if(e.is("img")){
				return e;
			}else{
				return e.find("img");
			}
		}
	},
	/***********************************************
	 * 
	 * 商品详情页面评论图片展示：点击上一张和下一张时，图片在大图中显示。点击列表中的图片，在大图显示区域显示出点击的图片（查看大图），
	 * 点击收起时，大图显示区域隐藏。获得焦点的元素的类默认为：active
	 * def = {
	 	 	picBox:""	装载图片列表和显示大图以及操作按钮的盒子
			prev:"",    点击跳转上一张的元素
			next:"",	点击跳转下一张的元素
			bigBox:"",	点击收起按钮，要隐藏的元素
			li:"",		装载图片的盒子
			big:"",		大图显示的盒子
			close:""	大图显示的盒子收起（关闭）按钮
		}
	 * 
	 * *********************************************/
	goodsCommentListPic:function(params){
		var def = {
			picBox:"",
			prev:".prev",
			next:".next",
			li:"",
			big:"",
			close:"",
			bigBox:""
		}
		var option = $.extend(def,params);
		
		var picBox = option.picBox;

		$(picBox).each(function(i,item){
			var prev = $(item).find(option.prev);
			var next = $(item).find(option.next);
			var close = $(item).find(option.close);
			var bigBox = $(item).find(option.bigBox);
			var li = $(item).find(option.li);
			var big = findImg($(item).find(option.big));
			//序号记录参数
			var num = 0;
			
			//点击列表图片，显示为高亮，同时替换大图的图片路径。
			li.click(function(){
				//点击元素显示高亮
				li.removeClass("active");
				$(this).addClass("active");
				//当前点击元素的序号
				num = $(this).index();
				//显示出大图盒子
				bigBox.show();
				//替换路径
				var thisSrc = findImg($(this)).attr("src");
				big.attr("src",thisSrc);
			})
			
			//点击上一张
			prev.click(function(){
				num -- ;
				if(num >= 0){
					var e = li.eq(num);
					li.removeClass("active");
					e.addClass("active");
					var thisSrc = findImg(e).attr("src");
					big.attr("src",thisSrc);
				}else{
					num ++;
				}
				
			})
			//点击下一张
			next.click(function(){
				num ++ ;
				if(num < li.size()){
					var e = li.eq(num);
					li.removeClass("active");
					e.addClass("active");
					var thisSrc = findImg(e).attr("src");
					big.attr("src",thisSrc);
				}else{
					num --;
				}
			})
			//点击关闭大图显示框
			close.click(function(){
				bigBox.hide();
				li.removeClass("active");
			})
			
			//如果当前元素是图片元素，则返回改元素，如果不是，那么就在改元素下面去找图片元素并返回（这样处理主要是考虑页面结构，可能页面上有这样的需求：
			//传进来的参数不一定是图片元素，而是它的父级）
			function findImg(e){
				if(e.is("img")){
					return e;
				}else{
					return e.find("img");
				}
			}
		})
	},
	/******************************************
	 * 
	 * 套餐切换
	 * 
	 * **************************************/
	btnActive:function(e){
		$(e).click(function(){
			$(e).removeClass("active");
			$(this).addClass("active");
		})
	},
	
	/******************************************
	 * 
	 * 商品评论和详情的切换
	 * 
	 * **************************************/
	goodsCon:function(){
		$(".goods_nav_btn").click(function(){
			$(".goods_nav_btn").removeClass("active");
			$(this).addClass("active");
			var num = $(this).index();
			$(".goods_con").hide();
			$(".goods_con").eq(num).show();
		})
	},
	
	/******************************************
	 * 
	 * 条件筛选
	 * 
	 * **************************************/
	screening:function(){
		$(".screen_con").each(function(i,item){
			var btn = $(item).find(".li_btn");
			var shanc = $(item).find(".shanc");
			var li_btn_first = $(item).find(".li_btn_first");
			//点击选择筛选条件
			btn.click(function(){
				btn.removeClass("active");
				$(this).addClass("active");
			})
			//点击删除，回到默认全部的状态
			shanc.click(function(){
				console.log($(this).parent());
				$(this).parent().removeClass("active");
				li_btn_first.addClass("active");
				return false;
			})
		})
	},
	/************************************************
	 * 
	 * 点击添加乘机人，弹出添加弹框
	 * 
	 * *********************************************/
	addManProp:function(){
		//点击添加的按钮时，弹出弹出框
		$("#add_plane_man").click(function(){
			$("#prop_man_box").show();
		})
		//点击确认添加的按钮时，弹出框隐藏
		$("#add_man_btn").click(function(){
			$("#prop_man_box").hide();
		})
		
		$("#prop_man_box").click(function(){
			$(this).hide();
		})
		
		$("#prop_man_con").click(function(){
			return false;
		})
	},
	/********************************************************
	 * 
	 * 点击添加地址，弹出添加弹框
	 * 
	 * *****************************************************/
	addAddressProp:function(){
		//点击添加的按钮时，弹出弹出框
		$("#add_adderss").click(function(){
			$("#prop_address_box").show();
		})
		//点击确认添加的按钮时，弹出框隐藏
		$("#add_address_btn").click(function(){
			$("#prop_address_box").hide();
		})
		
		$("#prop_address_box").click(function(){
			$(this).hide();
		})
		
		$("#prop_address_con").click(function(){
			return false;
		})
	}
}



//订单详情页面：点击选择成人，儿童，婴儿的回调函数
function CheckBoxCall(obj){
	var d_age = obj.attr("data-age");
	if(d_age == "man"){
		$(".no_baby").show();
		$(".baby").hide();
		$("#msg").hide();
	}else if(d_age == "child"){
		$(".no_baby").show();
		$(".baby").hide();
		$("#msg").show().text("2周岁及其以上的未成年人，乘机需要提供户口簿");
	}else if(d_age == "baby"){
		$(".no_baby").hide();
		$(".baby").show();
		$("#msg").show().text("乘机需要提供户口簿");
	}
}