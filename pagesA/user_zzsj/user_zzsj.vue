<template>
	<view style="min-height: 100vh;background: #FAFAFA;">
		<image class="zzsj_bg" :src="getimg('/static/images/user/znsj_02.jpg')" mode="aspectFill"></image>
		<view class="zzsj_box">
			<picker @change="bindPickerChange" data-type="hx" value="" :range="hx_list" range-key="name">
				<view class="sj_li">
					<view class="sj_li_l">户型<text style="color: #F4691A;">*</text></view>
					<view class="sj_li_r">
						<text class="iconfont iconhuxing"></text>
						<view class="sj_int">一室一厅一卫</view>
						<text class="iconfont iconoff"></text>
					</view>
				</view>
			</picker>
			<!-- <view class="sj_li"> -->
			<picker @change="bindPickerChange" data-type="lx" value="" :range="lx_list" range-key="name">
				<view class="sj_li">
					<view class="sj_li_l">类型<text style="color: #F4691A;">*</text></view>
					<view class="sj_li_r">
						<text class="iconfont iconhuxing"></text>
						<view class="sj_int">智能安防</view>
						<text class="iconfont iconoff"></text>
					</view>
				</view>
			</picker>
			<!-- </view> -->
			<view class="sj_li">
				<view class="sj_li_l">手机<text style="color: #F4691A;">*</text></view>
				<view class="sj_li_r">
					<text class="iconfont iconhuxing"></text>
					<input class="sj_int" type="text" placeholder="您的电话号码将被严格保密" v-model="phone">
				</view>
			</view>
		</view>
		<view class="sub_btn" @tap="sub">立即咨询</view>
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
				hx_list: [{
						name: '三室一厅两卫',
						id: 1
					},
					{
						name: '三室一厅一卫',
						id: 2
					},
					{
						name: '两室一厅一卫',
						id: 3
					},
					{
						name: '一室一厅一卫',
						id: 4
					},
				],
				hx_idx: 0,
				lx_list: [{
						name: '智能安防1',
						id: 1
					},
					{
						name: '智能安防2',
						id: 2
					},
					{
						name: '智能安防3',
						id: 3
					},
					{
						name: '智能安防4',
						id: 4
					},
				],
				lx_idx: 0,
				phone: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that = this
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
					hx:this.hx_list[this.hx_idx].id,
					lx:this.lx_list[this.lx_idx].id,
					phone: that.phone
				}
				uni.showToast({
					icon: 'none',
					title: '提交成功'
				})
				var datas = {
					hx: this.hx,
					lx: that.lx,
					phone: that.phone
				}
				console.log(datas)
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
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
