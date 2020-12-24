<template>
	<view class="content_wrap" style="min-height: 100vh;background: #fafafa;">
	<view class="index_list">
			<view class="index_li" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/user_xq/user_xq?id='+index">
				<view class="li_d1">
					<view class="li_user ">
						<image class="flex_0" :src="getimg('/static/images/tx_m.jpg')" mode="aspectFill"></image>
						<text class="oh1">智能小管家</text>
					</view>
					<view class="li_msg">客户的实际装修美图</view>
				</view>
				<view class="li_img">
					<image :src="getimg('/static/images/user/banner_01.jpg')" mode="aspectFill"></image>
				</view>
				<view class="li_cz">
					<view class="cz_li">
						<button type="default" open-type="share" :data-id="index"></button>
						<text class="iconfont iconfenxiang1"></text>
					</view>
					<view class="dis_flex aic">
						<view class="cz_li">
							<text class="iconfont iconpinlun"></text>
						</view>
						<!-- <view class="cz_li">
							<text class="iconfont iconshoucang"></text>
							<text class="cz_num">33</text>
						</view> -->
						<view class="cz_li">
							<text class="iconfont iconzan2"></text>
							<text class="cz_num">33</text>
						</view>

					</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
			<view  class="data_last">我可是有底线的哟~~~</view>
			<image class="user_add" src="../../static/images/user_add.png" mode="aspectFill"  @tap="jump" data-url="/pagesA/user_img_add/user_img_add"></image>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,

				banner: ['/static/images/user/banner_01.jpg', '/static/images/user/banner_01.jpg', '/static/images/user/banner_01.jpg'],
				datas: [1,1,1,1,1,1,1,1,1,1,1],

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
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},

		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img) {
				return service.getimg(img)
			},
			fabu_status() {
				var that = this
				if (that.loginDatas.dy_status == 3) {
					var now = Date.parse(new Date())
					console.log(now)
					console.log(that.loginDatas.dy_start_status * 1000)
					console.log(that.loginDatas.dy_end_status * 1000)
					console.log(1667567600000 < now)
					console.log(that.loginDatas.dy_end_status * 1000 > now)
					console.log(1667567600000 < now && that.loginDatas.dy_end_status * 1000 > now)
					if (that.loginDatas.dy_start_status * 1000 < now && that.loginDatas.dy_end_status * 1000 > now) {
						return true
					}
				}
				return false
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
	

	.index_list {
		width: 100%;
		padding: 20upx 30upx;
	}

	.index_li {
		width: 100%;
		background: #FFFFFF;
		border-radius: 10upx;
	}

	.index_li+.index_li {
		margin-top: 20upx;
	}

	.li_d1 {
		width: 100%;
		padding: 30upx 20upx;
	}

	.li_user {
		font-size: 24upx;
		color: #666;
		display: flex;
		align-items: center;
		margin-bottom: 15upx;
	}

	.li_user image {
		width: 40upx;
		height: 40upx;
		border-radius: 20upx;
		margin-right: 10upx;
	}

	.li_msg {
		width: 100%;
		font-size: 28upx;
		color: #222;
	}

	.li_img {
		width: 100%;
		height: 345upx;
	}

	.li_img image{
		width: 100%;
		height: 100%;
	}

	.li_cz {
		width: 100%;
		height: 92upx;
		padding: 0 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cz_li {
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-left: 20upx;
		margin-right: 30upx;
		position: relative;
	}
	.cz_li button{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10;
		opacity: 0;
	}
	
	.cz_li .iconfont {
		font-size: 32upx;
	}
	.cz_num{
		font-size: 20upx;
		color: #F4691A;
		position: absolute;
		top: -10upx;
		right: -18upx;
	}
	.user_add{
		width: 153upx;
		height: 153upx;
		position: fixed;
		bottom: 50upx;
		right: 30upx;
		z-index: 999;
	}
</style>
