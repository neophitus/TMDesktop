/*!
 * jQuery jDesktop plugin version 1.0
 * http://fractalbrain.net/
 *
 * Copyright 2010,  Krtolica Vujadin - FractalBrain.net
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

;(function($){	
	
    $.fn.jWindow = function(options){		
			
		// position, dimensions and state(min/max) of window (with default values)
		var p = {pX: 200,pY: 200,pW: 400,pH: 300, pS: 'min', pXtb: 200, pYtb: 200, pWtb: 400, pHtb: 300};		
	
		var s = $.extend({}, $.fn.jWindow.defaults, options);		  

		  	this.each(function(){
		  		var $this = $(this);
		  		var title = $this.attr("title");
				$this.attr("title", "");
		  		
		  		if ($this.is("div")) {		// check if target element is of 'div' type		  			
					if(s.width < 0) s.width *= -1;if(s.height < 0) s.height *= -1;
					s.width -= 40; s.height -= 56;
					if(s.width < 200) s.width = 200;if(s.height < 40) s.height = 40;
					if(s.width > $('#main').width() - 40) s.width = $('#main').width() - 40;
					if(s.height > $('#main').height() - 90) s.height = $('#main').height() - 90;
					if (s.yPos < 0 || s.yPos > $('#main').height()) {						
						if($('#main').height() > s.height)
							s.yPos = ($('#main').height() - s.height) / 2;
						else s.yPos = 35;
					} else {
						s.yPos += 35;
					};
					if(s.xPos < 0 || s.xPos > $('#main').width()){	s.xPos = ($('#main').width() - s.width) / 2; }
		  			$this.addClass(s.theme).css({
		  				width: s.width,
		  				height: s.height,
		  				left: s.xPos,
		  				top: s.yPos,
		  				'z-index': $.fn.jWindow.jWindowsZ
		  			});	

				 
		  			p.pX = s.xPos;
		  			p.pY = s.yPos;
		  			p.pW = s.width;
		  			p.pH = s.height;

		  			$this.html('').html($.fn.jWindow._window).find('div.titletext').text(title);
					try {  // ie7 error ??? for loading window
						$this.find('div.winmask').css({
							'width': $this.width() - 16,
							'height': $this.height() + 16
						});
					}
					catch(e){ };
							
					
		  			if (s.movable) {
						$this
						.bind('dragstart',function( event ){ 
							if ( !$(event.target).is('.jwinhandle')  ) return false;
								var E = $(this);									
								return E.find('div.winmask').css({
									width: E.width() - 16,
									height: E.height() + 16
								}).clone().insertAfter(E).css('zIndex',E.css('z-index')+1).attr('id','winmaskclone');
					        })
					    .bind('drag',function( event ){
							if(p.pS == 'min'){
								var E = $(this); 									
								
								if(E.is('.child')){										
									E = $( event.dragProxy ); Ep = E.parent();
									E.css({ display: 'block', top: event.offsetY - Ep.position().top,left: event.offsetX - Ep.position().left});
									pos = E.position();
									if(pos.top < 0 ) E.css({top: 0}); 
									if(pos.top > Ep.height() + 16 - E.height()) E.css({top: Ep.height() + 16 - E.height()});
									if(pos.left < 0) E.css({left: 0}); 
									if(pos.left > Ep.width() - 16 - E.width()) E.css({left: Ep.width() - 16 - E.width()});
								}
								else{
									E = $( event.dragProxy ); Ep = E.parent();
									E.css({ display: 'block', top: event.offsetY,left: event.offsetX});
									pos = E.position();
									if(pos.top < 35 ) E.css({top: 35}); 
									if(pos.top > Ep.height()  - 25) E.css({top: Ep.height() - 25});
									if(pos.left < -E.width() - 20) E.css({left: -E.width() - 20}); 
									if(pos.left > Ep.width() - 100) E.css({left: Ep.width() -  100}); 
								}
							}
						})
					    .bind('dragend',function( event ){
							if(p.pS == 'min'){
								var E = $(this); $( event.dragProxy ).css('backgroundColor','red');
								$('#main div.highlighter').remove();
								$( event.dragProxy ).animate({opacity: 0});
								E.animate({top: $( event.dragProxy ).position().top, left: $( event.dragProxy ).position().left},function(){
									$( event.dragProxy ).remove();
								});		
							}
						});
					}
					else $this.find('div.jwinhandle').css('cursor', 'default');
						
					s.resizable ? Resizable(true, $this, false) : Resizable(false, $this, false);
		  			
		  			if (s.closable) 
		  				$this.find('span.winclose').click(function(){							
		  					CloseWin($this);							
		  				}).css('display', 'block');
						
					if(s.minimizable){
						$this.find('span.winmin').css('display','block');
						$('#tcontainer').append("<div id='" + $this.attr('id') + "tbcont' class='wintbcont'><span id='" + 
										$this.attr('id') +
										"tb' class='wintb'>" + 
										$this.find('div.titletext').text() + 										
										"</span>" + (s.closable ? "<span class='wintbclose' title='close'></span>" : "") +
										"</div>");
						$('#' + $this.attr('id') + 'tb').bind('click', function(e){
							$('#main div.highlighter').remove();
							RestoreWin($this, $('#' + $this.attr('id') + 'tb'));																	
						}).hover(
						      function () {
								$this.find('div.winmask').clone().appendTo('#main').addClass('highlighter')
									  .css({display: 'block', 'background-color': 'red', 'border-color':'red', 
									  		position: 'absolute', top: $this.position().top, 
											left: $this.position().left, width: $this.width() - 16, 
											height: $this.height() + 16, 'z-index': $.fn.jWindow.jWindowsZ})
											  .pulse({
											    speed: 600,
												opacityRange: [0.2,0.6]
												});	
						      }, 
						      function () {
						        $('#main div.highlighter,div.miniclone').remove();
						      }
					    );
						$('#' + $this.attr('id') + 'tbcont').find('span.wintbclose').unbind('click').bind('click', function() {
						    if ($this.is('._down_') && s.closeConfirm) {								
								RestoreWin($this, $('#' + $this.attr('id') + 'tb'));
								 var timeout = setTimeout( function(){
									CloseWin($this);
									timeout = null;
								}, s.animationspeed
								);							
							}
							else CloseWin($this);
							}).css('opacity','0.5').hover(function(){
								$(this).css({
									'opacity': 1,
									'background': 'url(css/images/jwindows/closeh.gif)'
								});
							}, function(){
								$(this).css({
									'opacity': 0.5,
									'background': 'url(css/images/jwindows/close.gif)'
								});
							});
																	

						$this.find('span.winmin').bind('click', function(e){
							MinWin($this, $('#' + $this.attr('id') + 'tb'));
						});
					};
		  			
		  			$this.bind('mousedown', function(e){	// added 3/25/2010: for roundabout - check for 'startpos' attribute
		  				if(!$this.attr('startpos')) $this.css('z-index', $.fn.jWindow.jWindowsZ++);
		  			}).bind("contextmenu", function(e) {
		                e.preventDefault();
		            });
					
					if($.fn.jWindow.shadow) $this.css({'box-shadow':'0 0 16px #000000','-webkit-box-shadow':'0 0 16px #000000','-moz-box-shadow':'0 0 16px #000000'});
					if($.fn.jWindow.skin != 'jwindow') $.fn.jWindow.SetTheme($.fn.jWindow.skin);			
					if(s.scrollBody) $this.find('div.container').css('overflow', 'auto');						
					
		  		}		  		
		  	});
		  
		  function Resizable(prm, own){
		  	  if (prm) {
				own.find('div.bottomr').css('display','none');
			  	own.find('span.maxbtn')
					.css('display', 'block')
					  .click(function(){
						 MinMaxWin(own);
					   }).end().find('div.jwinhandle').bind('dblclick', function(){
					MinMaxWin(own);
				});
			  	own.resizable({		
					handler: '.bottomrR',
					min: { width: 200, height: 40 },
					onStart: function(e){ 
						own.find('div.winmask')
							.clone().insertAfter(own)
							.css({'zIndex':own.css('z-index')+1,position:'absolute',
								  top: own.position().top, left: own.position().left,width: own.width() - 16,
									height: own.height() + 16}).attr('id','winmaskcloner');
						var _tempcurtain = document.createElement('div');
						$(_tempcurtain).attr('class', 'tempcurtain').css('z-index', $('#winmaskcloner').css('z-index') - 1);
						$(_tempcurtain).appendTo('#main');
					},
					onResize: function(e) {
						$('#winmaskcloner').css('display','block');
					},
					onStop: function(e) {
						if($('#winmaskcloner').is(':visible')){
							$('div.tempcurtain').remove();
							$('#winmaskcloner').css('backgroundColor','red').animate({opacity: 0});
							own.find('div.container')
							   .css('visibility','hidden').end()
							   .animate({width: $('#winmaskcloner').width() + 16, height: $('#winmaskcloner').height() - 16}, function(){
									if(typeof(s.onResizeEnd)==='function') s.onResizeEnd.call();
									own.find('div.container').css('visibility','visible');
									if(s.flexify) own.find('div.container').flexify();
									$('#winmaskcloner').remove();
								});			
						}
						else{
							$('#winmaskcloner, div.tempcurtain').remove();
						}						
					}
				});				
			  }
			  else {
			  	own.find('span.maxbtn, div.bottomrR').css('display', 'none');
			  }
		  };
		  
	    function MinMaxWin(win){
	    	win.find('div.container').css({'visibility': 'hidden'}); 
			if ( p.pS == 'min') 
			{ 	
				var wp = win.parent();			
				p.pY = win.position().top; p.pX = win.position().left; p.pW = win.width(); p.pH = win.height();			
				win.stop(true,true).animate({top: 35,left: -wp.position().left, width: (wp.width()-40 ), height: (win.is('.child') ? wp.height()-56 : wp.height() - 90) }, s.animationspeed,  
						function() { 
							if(typeof(s.onResizeEnd)==='function') s.onResizeEnd.call();
							win.find('div.container').css({'visibility': 'visible'});
							if (s.flexify) {
								win.flexify();
							}									 
				});
				p.pS = 'max'; win.find('div.bottomrR').css('display', 'none');
				win.find('div.jwinhandle').css('cursor','default');
				win.find('div.bottomr').css('display', 'block'); 
				win.find('div.winmask').css({width: win.width() - 16, height: win.height() + 16});
				if(win.position().left + win.width() > $('#main').width()) {
					$('#main').animate({
						left: -($('#main').width() - win.width())
					});			
				}				
			} 
			else { 
				win.stop(true,true).animate({top: p.pY,left: p.pX, width: p.pW, height: p.pH}, s.animationspeed, 
						  function() { 
						  	   p.pS = 'min'; 							   
							   p.pY = win.position().top; p.pX = win.position().left;  
							   p.pW = win.width(); p.pH = win.height();
							   win.find('div.container').css({'visibility': 'visible'});
							   if (s.flexify) win.flexify();							   							   		   							   
				});
				win.find('div.bottomrR').css('display', 'block');
				if(s.movable) win.find('div.jwinhandle').css('cursor','move');
				win.find('div.bottomr').css('display', 'none'); 			
			};
		};		
		
		function CloseWin(c){
			if(s.closeConfirm){
				if (c.find('div.confirmclose').length == 0) {
					var confirmWin = document.createElement('div');
					$(confirmWin).attr('class','confirmclose child').jWindow({
						width: 200,
						height: 40,
						movable: true,
						resizable: false					
					}).css({
						left: c.width() / 2 - 100,
						top: c.height() / 2 - 20,						
						textAlign: 'center',
						opacity: 0
					}).animate({scale:[0.2,0.2]}, 10).find('div.container').css('display','block');
					$(confirmWin).addClass('child').find('div.titletext').html('Tem Certeza ?').find('div.container').css('padding-top','10px');
					
					var confirmButton = document.createElement('button');  
					$(confirmButton).addClass('submit').html('<span><span>Sim</span></span>').css({
						'width':'70px', 'marginRight':'5px', 'marginTop':'8px', 'marginLeft':'27px'
					}).bind('click', function(e){
						$(confirmWin).animate({scale:[0.1,0.1], opacity: 0},200, function(){
							RemoveWin(c);
						});
					});
					
					var noButton = document.createElement('button');  
					$(noButton).addClass('cancel').html('<span><span>Não</span></span>').css({
						'width':'70px', 'marginTop':'8px'
					}).bind('click', function(e){
						$(confirmWin).animate({scale:[0.1,0.1], opacity: 0},200, function(){
							$(confirmWin).remove();
						});						
						c.find('div.winmask').css({
							display: 'none',
							cursor: 'move',
							opacity: 0.4
						});
					});
					$(confirmWin).find('span.winclose').unbind('click').bind('click', function(e){
						$(confirmWin).animate({scale:[0.1,0.1], opacity: 0},200, function(){
							$(confirmWin).remove();
						});
						c.find('div.winmask:first').css({
							display: 'none',
							cursor: 'move',
							opacity: 0.4
						});
					});
					
					c.find('div.winmask:first').css({
						display: 'block',
						width: c.width() - 16,
						height: c.height() + 16,
						cursor: 'default',
						opacity: 0
					}).bind('click', function(e){
						$(confirmWin).animate({rotate: 360}).find('div.container').pulse({duration: 1000, speed: 50, backgroundColors:['#ffd4d1','#ffaea8','#ff8b82','#fe6459']});
					});
			
					$(confirmButton).appendTo($(confirmWin).find('div.container'));
					$(noButton).appendTo($(confirmWin).find('div.container'));
					$(confirmWin).appendTo(c).animate({scale:[1,1], opacity:1},200);
					
					if($.fn.jWindow.skin != 'jwindow') $.fn.jWindow.SetTheme($.fn.jWindow.skin);
				}
			}
			else{				
				RemoveWin(c);				
			};
		};
		
		function RemoveWin(win){
			if(typeof(s.onBeforeClose)==='function') s.onBeforeClose.call();
			if(s.minimizable) $('#' + win.attr('id') + 'tbcont').empty().remove();
			win.animate({opacity: 0.1, scaleX: 0.1,scaleY:0.1},600, function(){
				win.empty().remove();	// remove window from DOM				
				if(typeof(s.onClose)==='function') s.onClose.call();	
			});		
		};
		
		
		function MinWin(win, wintb){
			if (wintb.length > 0) {
				
				$(wintb).css({
					'background-image':'url(css/images/jwindows/wintbinactive.gif)', 
					textShadow: '0 1px 1px #000',
					'box-shadow': '0px 0px 14px #000 inset',
				    '-moz-box-shadow': '0px 0px 14px #000 inset',
				    '-webkit-box-shadow': '0px 0px 14px #000 inset'
				}).unbind('mouseleave').unbind('mouseenter');
				$(wintb).hover(
				      function () { 
						var scale = 160 / (p.pWtb > p.pHtb ? p.pWtb : p.pHtb);
						if(scale > 0.7) scale = 0.3;
						var leftfix = $('#tcontainer').parent().position().left + wintb.parent().position().left + 40;									
						win.css({height: p.pHtb, width: p.pWtb, top: 0, left:leftfix - (p.pWtb / 2)})
						   .animate({scaleX:scale,scaleY:scale},1,function(){							
							  $(this).attr('z', $(this).css('z-index'))
									 .css({ display: 'block',top: -(p.pHtb - (p.pHtb * scale))/2,zIndex: 6999})
									 .find('div.container').show().end()
									 .animate({opacity: 1, top: '+=30'}, 200);

						});
				        $(this).css({
							background: 'url(css/images/jwindows/wintbhover.gif)',
							color: '#000',
							textShadow: '0 1px 1px #fff'
						});
				      }, 
				      function () {
						win.stop().css({display:'none', top: 0, left: $('#tcontainer').parent().position().left + wintb.parent().position().left,height: wintb.height() - 20,width: wintb.width() - 36, zIndex: win.attr('z')}).removeAttr('z');
				        $(this).css({
							background: 'url(css/images/jwindows/wintbinactive.gif)',
							color: '#fff',
							textShadow: '0 1px 1px #000'
						});
				      }
			    );
				
				win.addClass('_down_');
				win.find('div.container').css({
					display: 'none'
				});
				p.pYtb = win.position().top;
				p.pXtb = win.position().left;
				p.pWtb = win.width();
				p.pHtb = win.height();
				win.stop(true,true).animate({
					top: 0,
					left: $('#tcontainer').parent().position().left + wintb.parent().position().left,
					height: wintb.height() - 20,
					width: wintb.width() - 36,
					opacity: 0.2
				}, s.animationspeed, function(){
					win.css({
						display: 'none'
					});
				});
			}
			else {
				if(win.height() != 0)
				win.animate({
					height: 0,
					width: 120
				},s.animationspeed);
				else
				win.animate({
					height: p.pH,
					width: p.pW
				},s.animationspeed);
			}
		};	
		
		function RestoreWin(win, wintb){ 			
			win.stop(true,true);
			if (win.is('._down_')) {								
				$(wintb).unbind('mouseleave').unbind('mouseenter')						
						.css({'background-image':'url(css/images/jwindows/wintbactive.gif)', 
							  'color': '#fff',
							  'box-shadow': '0px 0px 14px #eee inset',
							   '-moz-box-shadow': '0px 0px 14px #eee inset',
							   '-webkit-box-shadow': '0px 0px 14px #eee inset'
							 });	
				$(wintb).hover(
				      function () {
						$(win).find('div.winmask').clone().appendTo('#main').addClass('highlighter')
							  .css({display: 'block', 'background-color': 'red', position: 'absolute', top: $(win).position().top, left: $(win).position().left, width: $(win).width() - 16, height: $(win).height() + 16, 'z-index': $.fn.jWindow.jWindowsZ})
							  .pulse({
								    speed: 600,
									opacityRange: [0.2,0.4]
									});
				      }, 
				      function () {
				        $('#main div.highlighter,div.miniclone').remove();
				      }
			    );										

				win.css({
					display: 'block',
					'z-index': $.fn.jWindow.jWindowsZ++
				}).animate({
					scaleX:1,
					scaleY:1,
					top: p.pYtb,
					left: p.pXtb,
					width: p.pWtb,
					height: p.pHtb,
					opacity: 1					
				}, s.animationspeed, function(){
					win.find('div.container').css({
						display: 'block'
					});
					win.find('div.content').css({
						'background-color': ''
					});
				});
				win.removeClass('_down_');
			}
			else{
				MinWin(win, wintb);				
			};
		};			
					
		return this;
	};	
	
	$.fn.jWindow.jWindowsZ = 100;
	$.fn.jWindow.skin = 'jwindow';
	$.fn.jWindow.shadow = false;
	$.fn.jWindow._window = "<div class='top skin'>" + 
	  "<div class='topc skin'>" + 
	  "<div class='topr skin'></div></div></div>" + 
	  "<div class='middle skin'><div class='content skin'>" + 
	  "<div class='mask'></div><div class='container'></div></div></div>" + 
	  "<div class='bottom skin'><div class='bottomc skin'>" + 
	  "<div class='bottomr skin'></div><div class='bottomrR skin'></div></div></div>" + 					   
	  "<div class='wintitle'>" + 
	  "<img alt='' title='' src='css/images/jwindows/jwindows.png' />" + 
	  "<div class='titleleft'></div><div class='titletext'></div><div class='titleright'></div></div>" +
	  "<div class='jwinhandle'></div>" +
	  "<span class='wincontrols'>" +  
	  "<span class='winmin' title='minimize'></span>" + 
	  "<span class='maxbtn' title='maximize'></span>" + 
	  "<span class='winclose' title='close'></span>" + 
	  "</span><div class='winmask'></div>";
	  
	$.fn.jWindow.defaults = {
	  	minimizable: false,
		theme: 'jwindow',       				   // always jwindow ... this is old ... should be removed
		movable: true,
		closable: true,
		closeConfirm: false,
		resizable: true,
		isChild: false,
		xPos: -1,
		yPos: -1, 
		width: 400,
		height: 300,
		scrollBody: false,
		animationspeed: 200,
		flexify: false,							   // works great with jquery 1.4.2
		onResizeStart: function() {return false;},
		onResizeEnd:   function() {return false;},
		onFocusGet: function(){return false;},	   // rebind keypress ... 
		onFocusLost: function(){return false;},	   // pause game or whatever you must do becouse this app has keypress unbinded (probably)
		onBeforeStart: function(){return false;},  // set up just before window pops up, maybe some splashscreen ?!
		onStart: function(){return false;},  	   // start app, remove splashscreen ?!
		onBeforeClose: function(){return false;},  // ummm, put something smart here too ... 
		onClose: function(){ return false; }	   // clean up after closing, delete global vars, stop processes
	};
	
	$.fn.jWindow.SetTheme = function(skinid) {
		var _oldimg; var _index; var _root = 'url(images/'; var _newimg;
		$('.jwindow div.skin').each(function(i){		
			_oldimg = $(this).css('background-image');
			_index = _oldimg.lastIndexOf('/');
			_newimg = _oldimg.slice(0, _index);
			_newimg = _newimg.slice(0, _newimg.lastIndexOf('/'));
			_oldimg = _oldimg.slice(_index, _oldimg.length);
			_oldimg = _newimg.concat("/", skinid, _oldimg);
			this.style.backgroundImage = _oldimg; 
		});
		$.fn.jWindow.skin = skinid;
	};	
	
	$.fn.jWindow.HighlightWin = function(win,wintb){
		$(win).pulse({duration: 1000, speed: 50, backgroundColors:['#ffd4d1','#ffaea8','#ff8b82','#fe6459']});
		$(wintb).pulse({duration: 1000, speed: 50,opacityRange:[0.5,0.7,1], textColors:['#ff0000','#ffaea8','#ff8b82','#fe6459']});
	};
	
	jDesktop = {

		ChangeSkin : function(skinid)
		{
			$.fn.jWindow.SetTheme(skinid);
		},

		ChkEl : function(e){
			var el = $('#' + e);
			if(el.children('div').length > 0) jDesktop._hlwin(el.attr('id'));
			return !el.children('div').length > 0;
		},

		_hlwin : function(win){
			if(!$('#' + win).is(':visible')) $('#' + win + 'tb').click();
			$.fn.jWindow.HighlightWin($('#' + win),$('#' + win + 'tbcont'));
		},

		ShowDesktop : function(){
			$('div.jwindow').each(function(){
				if ($(this).is(':visible')) {
					$('#' + $(this).attr('id') + 'tb').click();
				}
			});
		},

		LoadWallpaper : function(src, color, position, repeat)
		{	
			jDesktop.LoadingStart('Changing wallpaper ...<br />Please wait', 'Loading ...');
			var i = new Image();    
			i.onload = function(){
				$('#main').css({
					'background-image': 'url(' + src + ')'
				});
				i = null;	// ie7 fix ???
				jDesktop.LoadingEnd('Wallpaper loaded!', 'Content loaded');
				if(src) $('#main').css('backgroundColor', color);
				if(position) $('#main').css('backgroundPosition', position);
				if(repeat) $('#main').css('backgroundRepeat', repeat);
				else $('#main').css('backgroundRepeat','no-repeat');
				$('#bckgexperiments').empty();
			} ;
			i.src = src;
			return false;
		},
		
		GetResources : function(wID, wTitle, js, css, appPath, callback){
			ensure({
				js: js, css: css
			}, function() { 
				if(appPath != ''){
					$('#' + wID).find('div.container').load(appPath, function(){
						if(typeof(callback)==='function') callback.call();
						jDesktop.ShowElement(wID, wTitle + " carregado!", "Aplicativo Ativo"); 
					});
				}
				else {
					if(typeof(callback)==='function') callback.call(); 
					jDesktop.ShowElement(wID, wTitle + " carregado!", "Aplicativo Ativo"); 
				}
			});
		},
		
	    StartApp : function(wID, wTitle, js, css, appPath, wParams, callback){
			if(jDesktop.ChkEl(wID)){
				jDesktop.LoadingStart("Carregando " + wTitle + " ...<br />Por favor aguarde.","Carregando ...");
				jDesktop.CreateElement(wID, wTitle, wParams);
				jDesktop.GetResources(wID, wTitle, js, css, appPath, callback);
			}
		},
		
		LoadApp : function(startjs, callback){
			ensure({
				js: startjs
			}, function(){
				callback.call();
			});
		},
		
		LoadingStart : function(bmsg,tmsg){
			var _div = document.createElement("div");
			$(_div).jWindow({ movable: false, resizable: false, width: -1, height: -1 });
			$(_div).addClass("loading");		
			 $(_div).find('div.titletext').html(tmsg);
			 $(_div).find('.wintitle img').attr('src', 'css/images/loadingsmall.gif');
			 $(_div).find('div.container').css({ 'color': '#000' }).html(bmsg);
			 $(_div).css({ 'position': 'relative', 'display': 'block',top: 0, 'z-index': '6999', 'vertical-align': 'bottom', left: 0 });
			 $(_div).find('div.container').css({
				 'overflow': 'hidden',
				 'text-align': 'center',
				 'display': 'block'
			 });
			 $(_div).prependTo('#loadingcontainer');  
		},
		
		LoadingEnd : function(bsmsg,tsmsg,bfmsg,tfmsg){
			var $lc = $('#loadingcontainer .loading:first');
			$lc.find('.wintitle img').attr('src','css/images/ajaxok.png');
			$lc.find('div.container').css({color: '#1c820c'}).html(bsmsg);
			$lc.find('div.titletext').html(tsmsg);
			var timeout = setTimeout(function(){$lc.animate({marginBottom: '-85px'},{ queue:false }, 'slow');
													$lc.fadeOut('slow', function(){$lc.remove();}); timeout = null;}, 2000);
		},

		CreateElement : function(eid, t, params){
			if (!($('#' + eid).length > 0)) {
				var _div = document.createElement("div");
				$(_div).attr("id", eid).attr("title", t);
				$(_div).css('display','none');
				$(_div).appendTo('#main');
				$(_div).jWindow(params);	// make it jWindow
			}
		},

		ShowElement : function(id,bsmsg,tsmsg){
			var $elem = $('#' + id);
			$elem.animate({scale:[0.1,0.1]},10, function(){ 
				$elem.css({display:'block',opacity: 0.3});
				$elem.animate({opacity: 1,scale:[1.2,1.2]}, function(){
					$('#' + id + 'tbcont').css('display','block');			
					jDesktop.LoadingEnd(bsmsg,tsmsg);	
					$elem.animate({scale:[1,1]},function(){
						$elem.find('div.container').css('display','block');
					});
				});
			});
		}
	}
		
})(jQuery);

(function($) {
    $.extend($.fn, {
        getCss: function(key) {
            var v = parseInt(this.css(key));
            if (isNaN(v))
                return false;
            return v;
        }
    });
    $.fn.resizable = function(opts) {
        var ps = $.extend({
            handler: null,
            min: { width: 0, height: 0 },
            max: { width: $('#main').width() - 40, height: $('#main').height() - 90 },
            onResize: function() { },
            onStop: function() { },
			onStart: function() { }
        }, opts);
        var resize = {
            resize: function(e) {
                var resizeData = e.data.resizeData;

                var w = Math.min(Math.max(e.pageX - resizeData.offLeft + resizeData.width, resizeData.min.width), ps.max.width);
                var h = Math.min(Math.max(e.pageY - resizeData.offTop + resizeData.height, resizeData.min.height), ps.max.height);
                $('#winmaskcloner').css({ width: w - 16, height: h + 16 });
                resizeData.onResize(e);
            },
            stop: function(e) {
                e.data.resizeData.onStop(e);

                document.body.onselectstart = function() { return true; };
                e.data.resizeData.target.css('-moz-user-select', '');

                $('#main').unbind('mousemove', resize.resize).unbind('mouseup', resize.stop);
            }
        };
        return this.each(function() {
            var me = this;
            var handler = null;
            if (typeof ps.handler == 'undefined' || ps.handler == null)
                handler = $(me);
            else
                handler = (typeof ps.handler == 'string' ? $(ps.handler, this) : ps.handle);
            handler.bind('mousedown', { e: me }, function(s) {
                var target = $(s.data.e);
                var resizeData = {
                    width: target.width() || target.getCss('width'),
                    height: target.height() || target.getCss('height'),
                    offLeft: s.pageX,
                    offTop: s.pageY,
					onStart: ps.onStart,
                    onResize: ps.onResize,
                    onStop: ps.onStop,
                    target: target,
                    min: ps.min,
                    max: ps.max
                };

				if(typeof(resizeData.onStart)==='function') resizeData.onStart();
                document.body.onselectstart = function() { return false; };
                target.css('-moz-user-select', 'none');

                $('#main').bind('mousemove', { resizeData: resizeData }, resize.resize)
						  .bind('mouseup', { resizeData: resizeData }, resize.stop);
            });
        });
    }
})(jQuery); 