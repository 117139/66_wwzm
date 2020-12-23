<template>
	<view class="content_wrap" >
		<!-- <view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<image class="head_box_img" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>
			<view class="my_tit_box" :style="style1">
			</view>
		</view> -->

		<view v-if="hasLogin" class="my_box">
			<image class="my_box_bg" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>
			<view class="user_box dis_flex aic">
				<view class="user_tx">
					<image class="user_tx" :src="getimg(loginDatas.avatarurl)"></image>
				</view>
				<view class="flex_1">
					<view class="user_name">{{loginDatas.nickname}}</view>
					<view class="user_time">智慧家物联网科技有限公司</view>
				</view>
				<!-- <view class="iconfont icon-bianji user_edit" @tap="jump" data-url="/pages/my_msg/my_msg"></view> -->
			</view>
		</view>
		<view v-else class="my_box">
			<image class="my_box_bg" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>

			<view class="user_box dis_flex aic ju_c">
				<view class="flex_1 dis_flex aic ju_c">
					<view class="user_name" @tap="jump" data-url="../login/login">登录/注册</view>
				</view>
			</view>
		</view>
		<view class="bus_my_list">
			
			<view class="more_main" @tap="jump" data-url="/pagesA/bus_hetong/bus_hetong">
				<image src="/static/images/business/index_03.jpg" mode="aspectFill"></image>
			</view>
			<view class="more_main" @tap="jump" data-url="/pagesA/bus_order/bus_order">
				<image src="/static/images/business/index_06.jpg" mode="aspectFill"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btnkg: 0,
				time_zz: '你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: '',

				PageScroll: '',
				fk_show: false,
				tk_show: true,
				tximg: '/static/logo.png'
			};
		},
		onLoad() {},
		onShow() {
			// service.wxlogin()
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			if(e.scrollTop>10){
				uni.showToast({
					title:e.scrollTop
				})
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),

			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;

				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},

			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;

				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;

				return style
			}
		},

		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			gettime(time) {
				var time = new Date(time * 1000);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var date = time.getDate();
				var hour = time.getHours();
				var minute = time.getMinutes();
				var second = time.getSeconds();
				month = month < 10 ? "0" + month : month;
				date = date < 10 ? "0" + date : date;
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				return year + '-' + month + '-' + date
			},
			call(e) {
				console.log(e)
				service.call(e)
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},

		}
	}
</script>

<style scoped>
	
	.my_tit_box {
		width: calc(100% - 440rpx);
		position: absolute;
		text-align: center;
		/* width: calc(100% - 340rpx); */
		left: 0;

		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}





.content_wrap {
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;
		background: #fafafa;
	}



	.cu_custom_box {
		z-index: 99999;
	}

	.index_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 355upx;
		z-index: 0;
	}

	.head_box {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		/* text-align: center; */
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;


		padding-right: 220rpx;
		-webkit-box-shadow: 0rpx 0rpx 0rpx;
		box-shadow: 0rpx 0rpx 0rpx;
		z-index: 9999;
		overflow: hidden;
	}
	.head_box_img{
		position: absolute;
		top: 0;
		width: 100%;
		height: 417upx;
		left: 0;
		right: 0;
	}
	.cur_H {
		background: #fff;
		color: #333;
	}


	.my_box {
		width: 100%;
		height: 417upx;
		position: relative;
	}

	.my_box_bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 417upx;
		z-index: 0;
	}

	.user_box {
		position: absolute;
		top: 200upx;
		left: 30upx;
		width: 690upx;
		/* height: 195upx; */
		/* background: #FFFFFF;
		box-shadow: 0px 2px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 10upx; */
		box-sizing: border-box;
		/* padding: 40upx; */
	}

	.user_tx {
		width: 110upx;
		height: 110upx;
		background: #BFBFBF;
		border-radius: 50%;

	}

	view.user_tx {
		margin-right: 20upx;
		position: relative;
	}

	.user_set {
		position: absolute;
		width: 35upx;
		height: 35upx;
		bottom: 0;
		right: 0;
		background: #3775F6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user_set text {
		font-size: 16upx;
		color: #fff;
	}

	.user_name {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 57upx;
	}

	
	.user_time{
		font-size: 26upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 30px;
		opacity: 0.8;
	}

	.bus_my_list {
		width: 100%;
		padding:30upx;
	}

	.more_main{
		margin-bottom: 30upx;
		width: 690upx;
		height: 250upx;
		box-shadow: 0px 0px 16upx 0px rgba(173, 218, 219, 0.5);
		border-radius: 10upx;
	}
	.more_main image{
		width: 690upx;
		height: 250upx;
	}
	
</style>
