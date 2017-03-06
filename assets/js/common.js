var tool = {
	/****************************
	 * 输入框在输入内容后，出现清除按钮，点击情空输入框中的内容
	 * 
	 * *****************************/
	inputClear:function(){
		
		$(".input_clear input[type=text]").each(function(i,item){
			var num = 0;
			//监听具有input_clear类的输入框，一旦输入内容，就显示清除按钮
			$(item).on("keyup",function(){
				if($(this).val().length > 0){
					//判断num的值，只让按钮添加一次，
					num++;
					if(num <= 1){
						$(this).parent().append('<span>×</span>');
					}
				}
			})
			
			//点击按钮，清除内容
			$(".input_clear").delegate('span','click',function(){
				$(this).parent().find("input[type=text]").val("");
				$(this).remove();
				num = 0;
			})
		})
	},
	/**********************************
	 * 
	 * ie8不支持checked选择器，这里用js进行处理
	 * 
	 * **********************************/
	checkedIE:function(){
		var checked_ie = $('.checked_ie');
		
		checked_ie.each(function(i,item){
			var check_box = $(item).find("input");
			var lab = $(item).find("label");
			var num = 0;
			//初始化点击状态
			if(check_box.is(':checked')){
				lab.addClass("active");
				num ++;
			}
			lab.on("click",function(){
				num ++ ;
//				alert(num);
				if(num%2 == 1){
//					alert("选中");
					lab.addClass("active");
				}else{
//					alert("未选中")
					lab.removeClass("active");
				}
			})
		})
		
	}
}