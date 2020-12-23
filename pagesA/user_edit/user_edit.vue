<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view class="user_box">
			<view class="user_tx">
			<!-- 	<avatar stretch="short" inner="true" selWidth="400upx" selHeight="400upx" @upload="myUpload" :avatarSrc="loginDatas.avatarurl?getimg(loginDatas.avatarurl):tximg"
				 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
				</avatar> -->
				<avatar stretch="short" inner="true" selWidth="400upx" selHeight="400upx" 
				@upload="myUpload" :avatarSrc="getimg(loginDatas_data.avatarurl)"
				 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
				</avatar>

				<view class="user_set">
					<text class="iconfont iconxiangji"></text>
				</view>
			</view>
			<view class="user_li">
				<view>昵称</view>
				<input type="text" placeholder="请输入昵称" v-model="nickname">
			</view>
			<view class="user_li">
				<view>性别</view>

				<view class="dis_flex aic ">
					<view class="sex_li" @tap="sex=1">
						<image v-if="sex==1" src="/static/images/select_2.png" mode=""></image>
						<image v-else src="/static/images/select_1.png" mode=""></image>
						男
					</view>
					<view class="sex_li" @tap="sex=2">
						<image v-if="sex==2" src="/static/images/select_2.png" mode=""></image>
						<image v-else src="/static/images/select_1.png" mode=""></image>
						女
					</view>
				</view>
			</view>
			<view class="user_li">
				<view>手机号*</view>
				<input type="number" placeholder="请输入手机号" v-model="phone">
			</view>
			<view class="user_li">
				<view>地址</view>
				<input type="text" placeholder="请输入地址" v-model="address">
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				nickname: '',
				sex: 1,
				phone: '',
				address: '',
				loginDatas_data:{}
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
			this.loginDatas_data=JSON.parse(JSON.stringify(that.loginDatas))
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			sub() {
				if (that.nickname.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入昵称'
					})
					return
				}
				if (that.phone.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return
				}
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.address.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入地址'
					})
					return
				}
				uni.showToast({
					icon: 'none',
					title: '保存成功'
				})
				var datas = {
					nickname: that.nickname,
					sex: that.sex,
					phone: that.phone,
					address: that.address
				}
				console.log(datas)
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			},
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			myUpload(rsp) {
				var that = this
				var tximg = rsp.path; //更新头像方式一
				Vue.set(that.loginDatas_data,'avatarurl',tximg)
				return
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
	}

	.user_li+.user_li {
		border-top: 1px solid #eee;
	}

	.user_li input {
		height: 95upx;
		font-size: 30upx;
		text-align: right;
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
