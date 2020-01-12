/**
 * http://usejsdoc.org/
 */
var Utils = {
		
		isLoading:false,
		
		showLoading:function(msg){
			this.isLoading = true;
			$.blockUI({message:'<div style="padding:10px;font-size: 2em;text-align: center;font-family:\'Ostrich Sans regular\';display:block;color:#f36c25;background: #feefe7;"><img style="vertical-align:middle;" src="Img/gif/loading_2.gif">'
				+'<div style="display:inline-block;font-size:1.5em;text-transform:uppercase;">'+msg+'</div></div>',
				css:{ cursor: 'default',top: '25%',border:'solid 2px #f36c25'}});
		},
		hideLoading:function(){
			this.isLoading = false;
			$.unblockUI();
		},

			
		empty:function(data){
			if(typeof(data) == 'number' || typeof(data) == 'boolean'){
				return false;
			}
			if(typeof(data) == 'undefined' || data === null){
				return true;
			}
			if(typeof(data.length) != 'undefined'){
				return data.length == 0;
			}

			var count = 0;

			for (var i in data){
				if(data.hasOwnProperty(i)){
					count ++;
				}
			}
			return count == 0;
		},
		emptydlg:function(id){
			$('#' + id + ' .modal-body').empty();
		},
		getView:function (id, idtofill){
			let html = $('#' + id).html();
			$('#'+idtofill + ' .modal-body').html(html);
		
		},
		enabledisableChildmenu:function(event){
			let parent = $(event.target).parent().parent();
			$(parent).find('a').removeClass("active");
			$(event.target).addClass('active');
		}
}