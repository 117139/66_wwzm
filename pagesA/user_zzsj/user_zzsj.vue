<template>
	<view style="min-height: 100vh;background: #FAFAFA;">
		<image class="zzsj_bg" :src="getimg('/static/images/user/znsj_02.jpg')" mode="aspectFill"></image>
		<view v-if="htmlReset==1" class="zanwu" @tap='getdata'>获取失败，请点击重试</view>
		<block v-if="htmlReset==0">
		<view class="zzsj_box">
			<picker @change="bindPickerChange" data-type="hx" value="" :range="hx_list" range-key="name">
				<view class="sj_li">
					<view class="sj_li_l">户型<text style="color: #F4691A;">*</text></view>
					<view class="sj_li_r">
						<text class="iconfont iconhuxing"></text>
						<view class="sj_int">{{hx_list[hx_idx].name}}</view>
						<text class="iconfont iconoff"></text>
					</view>
				</view>
			</picker>
			<!-- <view class="sj_li"> -->
			<picker @change="bindPickerChange" data-type="lx" value="" :range="lx_list" range-key="name">
				<view class="sj_li">
					<view class="sj_li_l">类型<text style="color: #F4691A;">*</text></view>
					<view class="sj_li_r">
						<text class="iconfont icontaocan"></text>
						<view class="sj_int">{{lx_list[lx_idx].name}}</view>
						<text class="iconfont iconoff"></text>
					</view>
				</view>
			</picker>
			<!-- </view> -->
			<view class="sj_li">
				<view class="sj_li_l">手机<text style="color: #F4691A;">*</text></view>
				<view class="sj_li_r">
					<text class="iconfont iconshouji"></text>
					<input class="sj_int" type="text" placeholder="您的电话号码将被严格保密" v-model="phone">
				</view>
			</view>
		</view>
		<view class="sub_btn" @tap="sub">立即咨询</view>
		</block>
		<view style="width: 100%;height: 10upx;"></view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that = this
	export default {
		data() {
			return {
				hx_list: [],
				hx_idx: 0,
				lx_list: [],
				lx_idx: 0,
				phone: '',
				htmlReset:-1
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that = this
			that.getdata()
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(e){
				return service.getimg(e)
			},
			bindPickerChange(e) {
				console.log(e)
				var datas = e.currentTarget.dataset
				if (datas.type == 'hx') {
					this.hx_idx = e.detail.value
				}
				if (datas.type == 'lx') {
					this.lx_idx = e.detail.value
				}
			},
			sub() {
				if (!this.phone) {
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
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
				var datas = {
					token:that.loginDatas.token,
					house_type:this.hx_list[this.hx_idx].id,
					goods_type:this.lx_list[this.lx_idx].id,
					phone: that.phone
				}
				
			
				console.log(datas)
				var jkurl = '/user/design'
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				uni.showLoading({
					mask:true,
					title:'正在提交'
				})
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.count
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						
						that.htmlReset=1
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
					
					that.htmlReset=1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
				
			},
			getdata() {
				var that =this
				var jkurl = '/user/form_type'
				var datas = {
					token: that.loginDatas.token||''
				}
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
			
						that.hx_list = datas.house_type_name
						that.lx_list = datas.type_name
			
					} else {
						
						that.htmlReset=1
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					
					that.htmlReset=1
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
	.zzsj_bg {
		width: 100%;
		height: 640upx;
	}

	.zzsj_box {
		width: 690upx;
		height: 540upx;
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 60upx 30upx;
		margin: -90upx auto 60upx;
		position: relative;
		z-index: 10;
	}

	.sj_li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30upx;
	}

	.sj_li_l {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
	}

	.sj_li_r {
		width: 503upx;
		height: 60upx;
		padding: 0 30upx;
		display: flex;
		align-items: center;
		border: 1px solid #DDDDDD;
		border-radius: 30upx;
	}

	.sj_int {
		flex: 1;
		padding-left: 45upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
	}

	.iconoff {
		font-size: 16upx;
	}

	.sub_btn {
		width: 690upx;
		height: 88upx;
		background: #11A078;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		font-family: PingFang;
		font-weight: bold;
		color: #FFFFFF;
		margin: 60upx auto;
	}
</style>
