<template>
	<view class="wrap_box">
		<cu-custom :bgImage="getimg('/static/images/wwzm_01.jpg')">
			<block slot="content">万屋智能</block>
		</cu-custom>
		<view class="main_box">
			<view class="main_tit">欢迎使用万屋智能~</view>
			<view class="more_main" @tap="set_xcx_fuc(0)">
				<image :src="getimg('/static/images/wwzm_041.jpg')" mode="aspectFill"></image>
				<view class="more_main_text">商家</view>
			</view>
			<view class="more_main" @tap="set_xcx_fuc(1)">
				<image :src="getimg('/static/images/wwzm_071.jpg')" mode="aspectFill"></image>
				<view class="more_main_text">用户</view>
			</view>
			<view class="more_main" @tap="set_xcx_fuc(2)">
				<image :src="getimg('/static/images/wwzm_091.jpg')"  mode="aspectFill"></image>
				<view class="more_main_text">智能安装</view>
			</view>
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
				
			}
		},
		onLoad() {
			if(!this.hasLogin){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		},
		onShow() {
			if(!this.hasLogin){
				
			}else{
				uni.showLoading({
					mask:true,
					title:'正在检测权限'
				})
				service.wxlogin()
			}
			
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas','xcx_status']),
		},
		methods: {
			...mapMutations(['set_xcx']),
			set_xcx_fuc(num){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				this.set_xcx(num)
			},
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>


<style scoped>
	.wrap_box{
		width: 100%;
		min-height: 100vh;
		background: #fff;
	}
	.main_box{
		width: 100%;
		padding:0 30upx 30upx;
	}
	.main_tit{
		line-height: 220upx;
		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
	}
	.more_main{
		margin-bottom: 55upx;
		width: 690upx;
		height: 250upx;
		box-shadow: 0px 0px 16upx 0px rgba(173, 218, 219, 0.5);
		border-radius: 10upx;
		position: relative;
	}
	.more_main image{
		width: 690upx;
		height: 250upx;
	}
	.more_main_text{
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		color: #000;
		padding-left: 160upx;
	}
</style>
