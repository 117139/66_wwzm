<script>
	import Vue from 'vue'
	import service from './service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg:0,
				uuid1:'',
			};
		},
		onLaunch: function() {
			var that =this
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			service.wxlogin()
			// #endif
			uni.getSystemInfo({
				success: function(e) {
					console.log(e);
					console.log(e.platform);
					that.setplatform(e.platform)
					// #ifndef MP
					console.log(e.statusBarHeight)
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas', 'uuid']),
			
		},
		methods: {
				...mapMutations(['login','logindata','logout','setplatform','setuuid']),
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/css/iconfont.css";
	.hidden{
		display: none;
	}
	.zanwu{
		width: 100%;
		line-height: 240rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
	view{
		box-sizing: border-box;
	}
	.dis_flex{
		display: flex;
	}
	.dis_flex_c{
		display: flex;
		flex-direction: column;
	}
	.aic{
		align-items: center;
	}
	.ais{
		align-items: stretch;
	}
	.aift{
		align-items: flex-start;
	}
	.aife{
		align-items: flex-end;
	}
	.ju_a{
		justify-content: space-around;
	}
	.ju_b{
		justify-content: space-between;
	}
	.ju_c{
		justify-content: center;
	}
	.flex_1{
		flex: 1;
	}
	.flex_0{
		flex: none;
	}
	.oh1 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	
	.oh2 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
			 
	}
	view{
		word-break:break-all;
		
		word-wrap:break-word;   
	}
	.oh3 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;
	}
	
	.oh4 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;
	    -webkit-box-orient: vertical;
	}
	.data_last{
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		font-size: 24rpx;
		color: #666;
	}
	.data_null{
		width: 480upx;
		height: 480upx;
		margin-top: 260upx;
	}
	
	
	
	.xmfwb_box image,.xmfwb_box img,.xmfwb_box table,
	rich-text p,rich-text img,rich-text table{
		max-width: 100%!important;
	}
	.xcx_fwb_img{
		max-width: 100%!important;
	}
	.loading_def{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
	.loading_def_img{
		width: 200rpx!important;
		height: 200rpx!important
	}
	.minh100{
		width: 100%;
		min-height: 100vh;
		/* #ifdef H5 */
		
		min-height: calc(100vh - 44px);
		/* #endif */
		background: #fff;
		box-sizing: border-box;
	}
</style>
