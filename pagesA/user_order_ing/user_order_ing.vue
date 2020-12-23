<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view class="order_list">
			<view class="order_li" v-for="(item,index) in 20">
				<view class="dis_flex aic ju_b order_name">
					<view class="flex_1">
						<view class="oh1">小区别墅装修项目</view>
					</view>
					<text v-if="index==1">施工中</text>
					<text v-else style="color: #52B0FF;">已结束</text>
				</view>
				<view class="dis_flex aic ju_b order_time">
					<view class="flex_1">
						<view class="oh1">2020-09-07</view>
					</view>
					<text>立即查看</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.order_list{
		width: 100%;
		padding: 30upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.order_li{
		width: 100%;
		background: #FFFFFF;
		border-radius: 2px;
		margin-bottom: 30upx;
		padding: 20upx;
	}
	.order_name{
		font-size: 32upx;
		color: #222;
		margin-bottom: 25upx;
		font-weight: bold;
	}
	.order_name text{
		flex: none;
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #F34826;
		margin-left: 10upx;
	}
	.order_time{
		font-size: 24upx;
		color: #666;
	}
	.order_time text{
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 135upx;
		height: 56upx;
		background: #11A078;
		border-radius: 28upx;
	}
</style>
