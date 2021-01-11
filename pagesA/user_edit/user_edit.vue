<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view class="user_box">
			<view class="user_tx">
				<!-- 	<avatar stretch="short" inner="true" selWidth="400upx" selHeight="400upx" @upload="myUpload" :avatarSrc="loginDatas.avatarurl?getimg(loginDatas.avatarurl):tximg"
				 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
				</avatar> -->
				<avatar stretch="short" inner="true" selWidth="400upx" selHeight="400upx" @upload="myUpload" :avatarSrc="getimg(loginDatas_data.cover)"
				 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
				</avatar>

				<view class="user_set">
					<text class="iconfont iconxiangji"></text>
				</view>
			</view>
			<view class="user_li">
				<view>昵称</view>
				<input type="text" placeholder="请输入昵称" v-model="loginDatas_data.nickname">
			</view>
			<view class="user_li">
				<view>性别</view>

				<view class="dis_flex aic ">
					<view class="sex_li" @tap="loginDatas_data.sex=1">
						<image v-if="loginDatas_data.sex==1" src="/static/images/select_2.png" mode=""></image>
						<image v-else src="/static/images/select_1.png" mode=""></image>
						男
					</view>
					<view class="sex_li" @tap="loginDatas_data.sex=0">
						<image v-if="loginDatas_data.sex!=1" src="/static/images/select_2.png" mode=""></image>
						<image v-else src="/static/images/select_1.png" mode=""></image>
						女
					</view>
				</view>
			</view>
			<view class="user_li">
				<view>手机号*</view>
				<input type="number" placeholder="请输入手机号" v-model="loginDatas_data.phone">
			</view>
			<view class="user_li">
				<view style="flex: none;">地址</view>
				<!-- <input type="text" placeholder="请输入地址" v-model="loginDatas_data.address"> -->
				<view @tap="moveToLocation" class="order_li_msg">
					<text v-if="!loginDatas_data.address" style="color: #666;">请选择地址</text>
					<text v-else>{{loginDatas_data.address}}</text>
				</view>
				<button v-if="!ldata" class="" open-type="openSetting" @opensetting='handler'>点击授权</button>
			</view>
		</view>
		<view class="user_tip">注：严格为业主保密，仅供安装和保修服务使用</view>
		<view class="sub_btn" @tap="sub">保存</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import service from '../../service.js';
	import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var qqmapsdk
	var that
	export default {
		data() {
			return {
				nickname: '',
				sex: 1,
				phone: '',
				address: '',
				loginDatas_data: {},
				ldata: false
			}
		},
		components: {
			avatar
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that = this
			this.loginDatas_data = JSON.parse(JSON.stringify(that.loginDatas))

			wx.getSetting({
				success: (res) => {
					console.log(res.authSetting['scope.userLocation'])
					if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
						that.ldata = false
					} else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
						// that.getLocation(that);
						that.ldata = false
					} else { //授权后默认加载
						console.log('授权后默认加载')
						// that.getLocation(that);
						that.ldata = true
					}
				}
			})
			qqmapsdk = new QQMapWX({
				//此key需要用户自己申请
				// key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
				key:service.map_key
			});
			// 调用接口
			qqmapsdk.reverseGeocoder({
				success: function(res) {
					console.log(res);
				},
				fail: function(res) {
					//console.log(res);

				},
				complete: function(res) {
					console.log(res);
				}
			});
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			handler: function(e) {
				var that = this;
				if (!e.detail.authSetting['scope.userLocation']) {
					that.ldata = false
				} else {
					that.ldata = true
					qqmapsdk = new QQMapWX({
						//此key需要用户自己申请
						// key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
						key:service.map_key
					});
					// 调用接口
					qqmapsdk.reverseGeocoder({
						success: function(res) {
							console.log(res);
						},
						fail: function(res) {
							//console.log(res);
					
						},
						complete: function(res) {
							console.log(res);
						}
					});

				}
			},
			//移动选点
			moveToLocation: function() {
				var that = this;
				wx.chooseLocation({
					success: function(res) {
						console.log(res);
						console.log(res.name);
						var add_data = {
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude,
							name: res.name,
						}
						that.yz_address = add_data
						// that.set_add(res.name)
						Vue.set(that.loginDatas_data,'address',res.address)
						Vue.set(that.loginDatas_data,'lat',res.latitude)
						Vue.set(that.loginDatas_data,'long',res.longitude)

					},
					fail: function(err) {
						console.log(err)
					}
				});
			},

			sub() {
				if (that.loginDatas_data.nickname.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入昵称'
					})
					return
				}
				if (that.loginDatas_data.phone.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return
				}
				if (that.loginDatas_data.phone == '' || !(/^1\d{10}$/.test(that.loginDatas_data.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.loginDatas_data.address.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入地址'
					})
					return
				}

				var datas = {
					token: that.loginDatas.token,
					cover: that.loginDatas_data.cover,
					nickname: that.loginDatas_data.nickname,
					sex: that.loginDatas_data.sex == 1 ? 1 : 0,
					phone: that.loginDatas_data.phone,
					address: that.loginDatas_data.address,
					long: that.loginDatas_data.long,
					lat: that.loginDatas_data.lat
				}
				console.log(datas)
				var jkurl = '/user/edit'

				service.P_post(jkurl, datas).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						})
						service.wxlogin()
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
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
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			myUpload(rsp) {
				var that = this
				var tximg = rsp.path; //更新头像方式一
				// Vue.set(that.loginDatas_data, 'cover', tximg)
				service.wx_upload(tximg).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						Vue.set(that.loginDatas_data, 'cover', datas)

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
						title: '操作失败'
					})
				})

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

		}
	}
</script>

<style scoped>
	.user_box {
		width: 100%;
		background: #fff;
		padding: 40upx 30upx 0;
	}

	.user_tx {
		width: 140upx;
		height: 140upx;
		margin: 0 auto 30upx;
		position: relative;
	}

	.user_set {
		width: 40upx;
		height: 40upx;
		background: #11A078;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.iconxiangji {
		font-size: 24upx;
		color: #fff;
	}

	.user_li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 95upx;
		position: relative;
	}

	.user_li+.user_li {
		border-top: 1px solid #eee;
	}

	.user_li input {
		height: 95upx;
		font-size: 30upx;
		text-align: right;
	}

	.user_li button {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10;
		opacity: 0;
	}
	.order_li_msg{
		min-height: 95upx;
		display: flex;
		text-align: center;
		flex-wrap: wrap;
		align-items: center;
		padding: 15upx 0;
		margin-left: 10px;
	}
	.sex_li {
		display: flex;
		align-items: center;
		margin-left: 50upx;
		font-size: 30upx;
		color: #4a4a4a;
	}

	.sex_li image {
		width: 30upx;
		height: 30upx;
		margin-right: 20upx;
	}

	.user_tip {
		width: 100%;
		padding: 50upx 30upx;
		font-size: 26upx;
		color: #999;
	}

	.sub_btn {
		width: 690upx;
		height: 88upx;
		background: #11A078;
		border-radius: 44upx;
		margin: 200upx auto 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		color: #fff;
	}
</style>
