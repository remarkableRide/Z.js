        (function() {
          'use strict';
    				var Util = (function() {
    					var prefix = 'ficiton_reader_';
              //HTML5储存数据
    					var StorageGetter = function(key) {
    						return localStorage.getItem(prefix + key);
    					}
    					var StorageSetter = function(key, val) {
    						return localStorage.setItem(prefix + key,val);
    					}
              //对JSONP数据进行解码的封装函数
    					var getBSONP=function(url, callback) {
    						return $.jsonp({
    							url : url,
    							cache : true,
    							callback : "duokan_fiction_chapter",
    							success : function(result) {
    								var data = $.base64.decode(result);
    								var json = decodeURIComponent(escape(data));
    								callback(json);
    							}
    						});
    					};
    					return {
    						getBSONP : getBSONP,
    						StorageGetter : StorageGetter,
    						StorageSetter : StorageSetter
    					}
    				})();

           //从HTML中取出DOM节点的对象
        var Dom={
              top_nav:$('#top-nav'),
              bottom_nav:$('.bottom-nav'),
              night_day_switch_button: $('night-day-switch-button'),
              font_container:$('.font-container'),
              font_button:$('#font-button'),
              large_font:$('large-font'),              
           }
        var Win=$(window);
        var Doc=$(document);
        var readerModel;
        var readerUI;
        var RootContainer=$('#fiction_container');
        var initFontSize=Util.StorageGetter('font_size');
            initFontSize=parseInt(initFontSize);
             if(!initFontSize){
              initFontSize=14;
             } 
              RootContainer.css('font-size',initFontSize);

        function main(){
               	//TODO 整个项目的入口函数
              readerModel=ReaderModel();
              readerUI=ReaderBaseFrame(RootContainer);
               	readerModel.init(function(data){
               		readerUI(data);
               	})
                     EventHanlder();
               }

        function ReaderModel(){
               	//todo 服务器端请求数据
               	var Chapter_id;
               	var ChapterTotal;
               	var init=function(UIcallback){
               		 getFictionInfo(function(){
               		 	getCurChapterContent(Chapter_id,function(){
                           UIcallback&&UIcallback(data);
               		 	},'json');
               		})
                  }
               	var getFictionInfo=function(callback){
               		$.get('data/chapter.json',function(data){
                       //TODO 获得全部章节JSON
                       Chapter_id=Util.StorageGetter('last_chapter_id');
                       if(!Chapter_id){
                        Chapter_id=1;
                        }
                       ChapterTotal=data.chapters.length;
                       callback&&callback();
               		},'json');
               	}
         
               	 var getCurChapterContent=function(Chapter_id,callback){
                      $.get('data/data'+Chapter_id+'.json',function(data){
                        if(data.result==1){
                        	var url=data.jsonp;
                        	Util.getBSONP(url,function(data){
                        		callback&&callback(data);
                        	});
                        }
                      },'json')
               	  }
               	var prevChapter=function(UIcallback){
                      Chapter_id=parseInt(Chapter_id,10);
                      if(Chapter_id==0){
                      	return;
                      }
                     Chapter_id-=1;
                     util.StorageSetter('last_chapter_id',Chapter_id);
                      getCurChapterContent(Chapter_id,UIcallback);
               	}
               		var nextChapter=function(UIcallback){
               		  Chapter_id=parseInt(Chapter_id,10);
                      if(Chapter_id==ChapterTotal){
                      	return;
                      }
                      Chapter_id+=1;
                      getCurChapterContent(Chapter_id,UIcallback);
                      util.StorageSetter('last_chapter_id',Chapter_id);
               	}
               	
                 	return{
                 		init:init,
                 		prevChapter:prevChapter,
                 		nextChapter:nextChapter,
                 	}
                 } 

        function ReaderBaseFrame(container) {
                //渲染UI
                debugger
          					function parseChapterData(jsonData) {
          						var jsonObj = JSON.parse(jsonData);
          						var html = "<h4>" + jsonObj.t + "</h4>";
          						for (var i = 0; i < jsonObj.p.length; i++) {
          							html += "<p>" + jsonObj.p[i] + "</p>";
          						}
                      debugger
          						return html
                     
          					}

          					return function(data) {
          						container.html(parseChapterData(data))
                      console.log('1')
          					}
          				}
              
            function EventHanlder(){
               	//todo 交互的事件绑定
               	$('#top-nav').click(function(){
               		if(Dom.top_nav.css('display')=='none'){
               			Dom.bottom_nav.show();
               			Dom.top_nav.show();
               		}else{
               			Dom.bottom_nav.hide();
               			Dom.top_nav.hide();
               			Dom.font_container.hide();
               			Dom.font_button.removeClass('current');

               		}
               	});
               Dom.font_button.click(function(){
                	 	if(Dom.font_container.css('display')=='none'){
               			Dom.font_container.show();
               			Dom.font_button.addClass('current');
               			
               		}else{
               			Dom.font_container.hide();
               			Dom.font_button.removeClass('current');
               		}
                });
              Dom.large_font.click(function() {
    							if (InitFontSize > 20) {
    								return;
    							}
    							InitFontSize += 1;
    							Util.StorageSetter('font_size', InitFontSize);
    							RootContainer.css('font-size', InitFontSize);
    						});
               
                $('#small-font').click(function() {
    							if (InitFontSize <14) {
    								return;
    							}
    							InitFontSize -= 1;
    							Util.StorageSetter('font_size', InitFontSize);
    							RootContainer.css('font-size', InitFontSize);
    						});

                $('.bgc-1').click(function(){
                		Util.StorageSetter('background','#e9dfc7' );
    					$('body').css('background','#e9dfc7');
                });
                  $('.bgc-2').click(function(){
                		Util.StorageSetter('background','#6699FF' );
    					$('body').css('background','#6699FF');
                });
                    $('.bgc-3').click(function(){
                		Util.StorageSetter('background','#00CC99' );
    					$('body').css('background','#00CC99');
                });
                      $('.bgc-4').click(function(){
                		Util.StorageSetter('background','#99CCCC' );
    					$('body').css('background','#99CCCC');
                });
                $('#night_icon').click(function(){
                	$('#day_icon').show();
                	$('#night_icon').hide();
                	$('body').css('background','#99CCCC');
                	
                });
                  $('#day_icon').click(function(){
                	$('#day_icon').hide();
                	$('#night_icon').show();
                	$('body').css('background','#e9dfc7');
                	
                });

                	Win.scroll(function(){
               			Dom.bottom_nav.hide();
               			Dom.top_nav.hide();
               			Dom.font_container.hide();
               			Dom.font_button.removeClass('current');
               	});
                   $('#prev_button').click(function(){
                   	//TODO...获得章节的翻页数据-把数据拿出来渲染
                           readerModel.prevChapter(function(data){
                           	readerUI(data);
                           })
                   });
                     $('#next_button').click(function(){
                   	//TODO...获得章节的翻页数据-把数据拿出来渲染
                           readerModel.nextChapter(function(data){
                           	readerUI(data);
                           
                           })
                   });
              }
               
          
           main();
         })();

      
      