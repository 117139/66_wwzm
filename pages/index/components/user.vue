<template>
	<view class="content_wrap" style="min-height: 100vh;background: #fafafa;">
		<!-- <view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<image class="head_box_img" src="/static/images/intell/my_bg_01.png" mode="aspectFill"></image>
			<view class="my_tit_box" :style="style1">
				个人中心
			</view>
		</view> -->

		<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,.3)" indicator-active-color="#11A078"
		 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true'>
			<swiper-item v-for="(item,idx) in banner">

				<!-- <image v-if="item.url" class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" :data-url="'../Turl/Turl?url='+item.url"></image> -->
				<!-- /'../webview/webview?url='+datas.url -->
				<image class="swi_img" src="../../../static/images/user/banner_01.jpg" mode="aspectFill"></image>
				<!-- <image class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" data-url=""></image> -->
			</swiper-item>

		</swiper>
		<view class="index_icons">
			<view class="index_icon">
				<image src="../../../static/images/user/index_icon1.png" mode="aspectFit"></image>
				<text>智能设计</text>
			</view>
			<view class="index_icon">
				<image src="../../../static/images/user/index_icon2.png" mode="aspectFit"></image>
				<text>安装进度</text>
			</view>
			<view class="index_icon">
				<image src="../../../static/images/user/index_icon3.png" mode="aspectFit"></image>
				<text>服务案例</text>
			</view>
			<view class="index_icon">
				<image src="../../../static/images/user/index_icon4.png" mode="aspectFit"></image>
				<text>资讯</text>
			</view>
		</view>
		<view class="tc_box">
			<view class="tc_tit">主推套餐</view>
			<view class="dis_flex ju_b">
				<image class="index_url" src="../../../static/images/user/inde_url_04.png" mode="aspectFill"></image>
				<view class="index_url dis_flex_c ju_b" style="width: 357upx;">
					<image class="index_url1" src="../../../static/images/user/inde_url_06.png" mode="aspectFill"></image>
					<image class="index_url1" src="../../../static/images/user/inde_url_09.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="index_list">
			<view class="tc_tit">客户美图</view>
			<view class="index_li" v-for="(item,index) in 20">
				<view class="li_d1">
					<view class="li_user">
						<image src="../../../static/images/tx_m.jpg" mode="aspectFill"></image>
						<text>智能小管家</text>
					</view>
					<view class="li_msg">客户的实际装修美图</view>
				</view>
				<view class="li_img">
					<image src="/static/images/user/banner_01.jpg" mode="aspectFill"></image>
				</view>
				<view class="li_cz">
					<view class="cz_li">
						<button type="default" open-type="share"></button>
						<text class="iconfont iconfenxiang1"></text>
					</view>
					<view class="dis_flex aic">
						<view class="cz_li">
							<text class="iconfont iconpinlun"></text>
						</view>
						<view class="cz_li">
							<text class="iconfont iconshoucang"></text>
							<text class="cz_num">33</text>
						</view>
						<view class="cz_li">
							<text class="iconfont iconzan2"></text>
							<text class="cz_num">33</text>
						</view>

					</view>
				</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,

				banner: [1, 1, 1],
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
			if (e.scrollTop > 10) {
				uni.showToast({
					title: e.scrollTop
				})
			}
		},
		onShareAppMessage() {
			
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
			onShareAppMessage() {
				
			},
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			myUpload(rsp) {
				var that = this
				var tximg = rsp.path; //更新头像方式一
				this.tximg = tximg
				console.log(this.tximg)
				uni.uploadFile({
					url: service.IPurl + 'user/upload_img', //仅为示例，非真实的接口地址
					filePath: tximg,
					name: 'img',
					formData: {
						token: that.loginDatas.token
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						var ndata = JSON.parse(uploadFileRes.data)
						if (ndata.code == 1 || ndata.code == 201) {
							that.tximg = ndata.img_url
							var datas = {
								token: that.loginDatas.token,
								img_url: ndata.img_url
							}
							that.set_tximg(datas)
						}
					}
				});
				//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			set_tximg(datas) {
				var that = this
				var jkurl = '/user/update_head'

				service.P_post(jkurl, datas).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						service.tel_login()

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
					this.triggered = false
					this._freshing = false
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			onGetPhoneNumber: function(e) {
				var that = this
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
				console.log(e.detail.encryptedData)
				// return
				if (e.detail.iv) {
					//用户按了允许授权按钮后需要处理的逻辑方法体
					wx.login({
						success: (res) => {
							if (res.code) { //微信登录成功 已拿到code  
								console.log(e.detail.iv)
								var token = that.loginDatas.token
								var datas = {
									encryptedData: e.detail.encryptedData,
									iv: e.detail.iv,
									code: res.code,
									token: token
								}
								//selectSaraylDetailByUserCard
								var jkurl = '/data/wechat'

								uni.showLoading({
									title: '正在绑定手机号',
									mask: true
								})
								console.log(datas)
								// return
								service.P_post(jkurl, datas).then(res => {

									that.btn_kg = 0
									console.log(res)
									if (res.code == 1) {
										var datas = res.data
										console.log(typeof datas)
										console.log(datas)

										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
										uni.setStorageSync('account', datas.account)
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										setTimeout(function() {
											var account = uni.getStorageSync('account')
											var password = uni.getStorageSync('password')
											if (account) {
												var datas = {
													account: account,
													password: password
												}
												service.tel_login(datas)
											}
										}, 500)
									} else {
										that.btnkg = 0
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

									uni.showToast({
										icon: 'none',
										title: '操作失败'
									})

								})

							} else {
								console.log('登录失败！' + res.errMsg)
							}
						}
					})


				} else {
					//用户按了拒绝按钮
					// uni.showModal({
					// 	title: '警告',
					// 	content: '您点击了拒绝授权，将无法登录小程序，请点击返回授权!!!',
					// 	showCancel: false,
					// 	confirmText: '返回授权',
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			console.log('用户点击了“返回授权”')
					// 		}
					// 	}
					// })
				}
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
		margin-left: 10upx;
		margin-right: 40upx;
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
		right: -15upx;
	}
</style>
