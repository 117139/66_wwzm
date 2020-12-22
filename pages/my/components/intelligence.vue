<template>
	<view class="content_wrap" >
		<view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<image class="head_box_img" src="/static/images/intell/my_bg_01.png" mode="aspectFill"></image>
			<view class="my_tit_box" :style="style1">
				个人中心
			</view>
		</view>

		<view v-if="hasLogin" class="my_box">
			<image class="my_box_bg" src="/static/images/intell/my_bg_01.png" mode="aspectFill"></image>
			<view class="user_box dis_flex aic">
				<view class="user_tx">
					<image class="user_tx" :src="getimg(loginDatas.avatarurl)"></image>
				</view>
				<view class="flex_1">
					<view class="user_name">{{loginDatas.nickname}}</view>
					<image class="user_edit"  @tap="jump" data-url="../my_pwd/my_pwd" :data-login='true' :data-haslogin='hasLogin' src="../../../static/images/user/my_edit.png" mode="aspectFill"></image>
				</view>
				<!-- <view class="iconfont icon-bianji user_edit" @tap="jump" data-url="/pages/my_msg/my_msg"></view> -->
			</view>
		</view>
		<view v-else class="my_box">
			<image class="my_box_bg" src="/static/images/intell/my_bg_01.png" mode="aspectFill"></image>

			<view class="user_box dis_flex aic ju_c">
				<view class="flex_1 dis_flex aic ju_c">
					<view class="user_name" @tap="jump" data-url="../login/login">登录/注册</view>
				</view>
			</view>
		</view>
		<view class="bus_my_list">
			<view class="user_list">
				<view class="user_li"  @tap="jump" data-url="/pagesA/intell_ing/intell_ing" :data-login='true' :data-haslogin='hasLogin'>
					<view class="user_li_l">
						<image src="../../../static/images/intell/my_icon1.png" mode="aspectFit"></image>
					</view>
					<view class="user_li_r">
						<view>施工中</view>
						<view class="iconfont iconnext-m"></view>
					</view>
				</view>
				<view class="user_li" @tap="jump" data-url="/pagesA/intell_end/intell_end" :data-login='true' :data-haslogin='hasLogin'>
					<view class="user_li_l">
						<image src="../../../static/images/intell/my_icon2.png" mode="aspectFit"></image>
					</view>
					<view class="user_li_r">
						<view>已完成</view>
						<view class="iconfont iconnext-m"></view>
					</view>
				</view>
				<view class="user_li" @tap="jump" data-url="/pagesA/intell_shouhou/intell_shouhou" :data-login='true' :data-haslogin='hasLogin'>
					<view class="user_li_l">
						<image src="../../../static/images/intell/my_icon3.png" mode="aspectFit"></image>
					</view>
					<view class="user_li_r">
						<view>售后处理</view>
						<view class="iconfont iconnext-m"></view>
					</view>
				</view>
				<view class="user_li" @tap="jump" data-url="/pagesA/intell_renzheng/intell_renzheng" :data-login='true' :data-haslogin='hasLogin'>
					<view class="user_li_l">
						<image src="../../../static/images/intell/my_icon4.png" mode="aspectFit"></image>
					</view>
					<view class="user_li_r">
						<view>我的认证</view>
						<view class="iconfont iconnext-m"></view>
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

	.user_edit {
		width: 150upx;
		height: 44upx;
		border-radius: 22upx;
	}

	.bus_my_list {
		width: 100%;
		padding:30upx;
	}

	.user_my1 {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-bottom: 20upx;
	}

	.user_order {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.user_order+.user_order::before{
		position: absolute;
		content: '';
		left: 0;
		top: 35upx;
		width: 1px;
		height: 50upx;
		background: #EEEEEE;
	}
	.user_order image {
		width: 40upx;
		height: 50upx;
		margin-right: 30upx;
	}
	
	
	.user_list{
		width: 100%;
		/* padding: 0 30upx; */
		
		background: #FFFFFF;
		border-radius: 10upx;
	}
	.user_li{
		width: 100%;
		height: 93upx;
		display: flex;
		align-items: stretch;
	}
	.user_li_l{
		width: 88upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user_li_l image{
		width: 38upx;
		height: 38upx;
	}
	.user_li_r {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
		padding-right: 30upx;
		
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #222222;
	}
	.user_li_r .iconnext-m{
		font-size: 22upx;
		color: #222;
	}
	
</style>
