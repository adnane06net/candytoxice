var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : adnanepro (adnanenet6@gmail.com)
	@date: 07/04/2023 13:19:00
	@version: 8.0.0
	copyright @2023
*/
	
	intervalAds    : 1,     //Ads each interval for example each 3 times
	
	developer : 'Adnanepro',


	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;
		
		case 'btn_story_mode': //Button play story mode
			gradle.showInter();
			break;
		case 'btn_time_attack': //Button play time attack
			gradle.showInter();
			break;
		case 'btn_choose_mode': //Button choose mode
			//gradle.showInter();
			break;
		case 'btn_exit_mode': //Button exit mode
			//gradle.showInter();
			break;
		case 'btn_next_level':
			gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
			break;
		case 'btn_retry':
			//gradle.checkInterval() && gradle.showInter();
			break;
		case 'moreGames':
			gradle.event('btn_more');
			break;			
		case 'button_share': //event on button share
			gradle.event('btn_share');
			break;
		case 'showReward':
			gradle.showReward();
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },



	

    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		$(document).ready(function () {
        var oMain = new CMain({
          scores_for_single: 30, //Points for single cell destroyed
          scores_for_bomb: 100, //Points for bomb destroyed
          scores_for_star: 300, //Points for star destroyed
          extra_item_multiplier: 1.5, //Multiplier applied for extra symbol destroyed

          //TIME ATTACK MODE PARAMS
          starting_time: 60000, //STARTING DURATION OF TIME ATTACK MODE(IN MS)
          hint_timer: 4000, //TIMER (IN MS) TO GET A HINT
          hourglass_add_time: 15000, //TIME (IN MS) ADDED BY HOURGLASS
          quad_combo_time: 3000, //TIME (IN MS) ADDED BY A COMBO OF 4 IDENTICAL FRUITS
          quint_combo_time: 5000, //TIME (IN MS) ADDED BY A COMBO OF 5 IDENTICAL FRUITS

          increase_to_4_fruits_goal_score: 12000, //SCORE TO INCREASE THE NUMBER OF FRUITS TO 4 IN THE GAME
          increase_to_5_fruits_goal_score: 22000, //SCORE TO INCREASE THE NUMBER OF FRUITS TO 5 IN THE GAME
          increase_to_6_fruits_goal_score: 31000, //SCORE TO INCREASE THE NUMBER OF FRUITS TO 6 IN THE GAME
          increase_to_7_fruits_goal_score: 39000, //SCORE TO INCREASE THE NUMBER OF FRUITS TO 7 IN THE GAME

          audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS
          check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
          fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
        });

        $(oMain).on("start_session", function (evt) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeStartSession();
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("end_session", function (evt) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeEndSession();
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("restart_level", function (evt, iLevel) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeRestartLevel({ level: iLevel });
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("save_score", function (evt, iScore, szMode) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeSaveScore({ score: iScore, mode: szMode });
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("start_level", function (evt, iLevel) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeStartLevel({ level: iLevel });
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("end_level", function (evt, iLevel) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeEndLevel({ level: iLevel });
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("show_interlevel_ad", function (evt) {
          if (getParamValue("ctl-arcade") === "true") {
            parent.__ctlArcadeShowInterlevelAD();
          }
          //...ADD YOUR CODE HERE EVENTUALLY
        });

        $(oMain).on("share_event", function (evt, iScore) {
          //gradle.event('btn_share');
        });

        if (isIOS()) {
          setTimeout(function () {
            sizeHandler();
          }, 200);
        } else {
          sizeHandler();
        }

        setTimeout(function () {
          sizeHandler();
        }, 200);
      });
		setTimeout(function(){gradle.event_ext('hide_splash');},3000);
    },
	
	pause: function(){
		console.log('gradle pause ...');
    },
	resume: function(){
		console.log('gradle resume ...');
    },
	
	
	loadJS: function(compressed) {
		/*if(compressed){
			GameLevels.splice(0,1);
			return;
		}*/
		var element = document.createElement("script");
		var src_file = 'levels/'+file_num.zeroFill(3)+'.js';
		element.src = src_file;
		element.onload = function(){
			if(file_num<MAX_LEVELS){
				file_num++;
				gradle.loadJS();
			}
			else{
				GameLevels.splice(0,1);
			}
		};
		document.body.appendChild(element);
	},

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        if(ev=='state_game_create'){
			null != game && (game.sound.mute = !1, game.paused = !1);
		}
		switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },
    showReward: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_reward');
    },

    is_reward:false,
    reward_callback: function(){
        gradle.log('reward callback.... org');
    },
	reward: function(state){
        gradle.log('>>>>>>>>>>>>>>>>>>> reward granted : '+ state);
        is_reward = (state=='yes');
        gradle.reward_callback();
		document.dispatchEvent(new CustomEvent('awesome', { bubbles: true, detail: { text: () => 'rewarded' } }))
    },

	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},
	
	trackStats: function(a, b){
		gradle.event(a, b);
	},
	
	trackScreen: function(a,b){
		gradle.event(a,b);
	},
	
	trackEvent: function(a,b){
		gradle.event(a,b);
	},
	
	showAd: function(){
		gradle.event('showAd');
	},
	
	__: function(t){
		return null;//t;
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};


gradle.run();
