(function($){
	$.fn.CheckBox =function  (call) {
		$(this).find('input').css({"display":"none"});
		$(this).each(function(){
			var hasOn = $(this).hasClass('on');				
			if(hasOn){
				$(this).children('input').prop("checked",true); 
			}
		})		
		$(this).click(function () {
			var type = $(this).children('input').attr("type");
			var isCheck = $(this).children('input').prop("checked");
			if (type=="radio") {
				$(this).addClass('on').siblings().removeClass('on');
				$(this).children('input').prop("checked",true).siblings().prop("checked",false);
			} else{				
				if(!isCheck){
					$(this).addClass('on');
					$(this).children('input').prop("checked",true);
				}
				else{
					$(this).removeClass('on');
					$(this).children('input').prop("checked",false);
				}
			}
			if(typeof(call) === "function"){
				call($(this));
			}
		});
		
		
	}
})(jQuery);
