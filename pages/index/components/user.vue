<template>
	<view class="content_wrap" style="min-height: 100vh;background: #fafafa;">
		<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,.3)" indicator-active-color="#11A078"
		 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true'>
			<swiper-item v-for="(item,idx) in banner">
				<!-- <image class="swi_img" src="/static/images/user/banner_01.jpg" mode="aspectFill"></image> -->
				<image class="swi_img" :src="getimg(item.img_url)" mode="aspectFill"
						 @tap="jump" data-url=""></image>
			</swiper-item>

		</swiper>
		<view class="index_icons">
			<view class="index_icon" @tap='jump' data-url="/pagesA/user_zzsj/user_zzsj">
				<image :src="getimg('/static/images/user/index_icon1.png')" mode="aspectFit"></image>
				<text>智能设计</text>
			</view>
			<view class="index_icon" @tap='jump' data-url="/pagesA/user_order_ing/user_order_ing">
				<image :src="getimg('/static/images/user/index_icon2.png')"  mode="aspectFit"></image>
				<text>安装进度</text>
			</view>
			<view class="index_icon" @tap='jump' data-url="/pagesA/user_list/user_list?type=2">
				<image :src="getimg('/static/images/user/index_icon3.png')"  mode="aspectFit"></image>
				<text>服务案例</text>
			</view>
			<view class="index_icon" @tap='jump' data-url="/pagesA/user_list/user_list?type=3">
				<image :src="getimg('/static/images/user/index_icon4.png')"  mode="aspectFit"></image>
				<text>资讯</text>
			</view>
		</view>
		<view class="tc_box">
			<view class="tc_tit">主推套餐</view>
			<view class="dis_flex ju_b">
				<image class="index_url" :src="getimg('/static/images/user/inde_url_04.png')"  mode="aspectFill"></image>
				<view class="index_url dis_flex_c ju_b" style="width: 357upx;">
					<image class="index_url1" :src="getimg('/static/images/user/inde_url_06.png')" mode="aspectFill"></image>
					<image class="index_url1" :src="getimg('/static/images/user/inde_url_09.png')" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="index_list">
			<view class="tc_tit">客户美图</view>
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
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
var that =this
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
		onLoad() {
			that=this
			this.getdata()
		},
		onShow() {
			// service.wxlogin()
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
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data = {}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/homepage/banner'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						that.banner = datas
						console.log(datas)
							
							
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getimg(img) {
				console.log(service.getimg(img))
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
	.swiper {

		width: 100%;
		height: 500upx;
	}

	.swi_img {
		width: 100%;
		height: 500upx;
	}

	.index_icons {
		width: 100%;
		height: 240upx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}

	.index_icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.index_icon image {
		width: 55upx;
		height: 55upx;
		margin-bottom: 25upx;
	}

	.index_icon text {
		width: 4em;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		text-align: center;
	}

	.tc_box {
		margin-top: 20upx;
		width: 100%;
		background: #fff;
		padding: 0 30upx 60upx;
	}

	.tc_tit {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
	}

	.index_url {
		width: 317upx;
		height: 320upx;
		border-radius: 10upx;
	}

	.index_url1 {
		width: 357upx;
		height: 152upx;
		border-radius: 10upx;
	}

	.index_list {
		width: 100%;
		padding: 0 30upx;
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
</style>
