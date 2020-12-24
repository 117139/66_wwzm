<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view class="xx_list">
			<view class="xx_li" v-for="(item,index) in datas">
				<view class="xx_li_time">09-04 12:53</view>
				<view class="xx_box dis_flex aic ju_b" @tap='jump' :data-url="'/pagesA/user_order_xq/user_order_xq?id='+index">
					<view>
						<view class="xx_type" v-if="item.type==1">订单状态更新</view>
						<view class="xx_type" v-if="item.type==2">取消订单成功</view>
						<view class="xx_msg">{{item.msg}}</view>
					</view>
					<view class="iconfont iconnext-m"></view>
				</view>
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
				datas:[
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
					{type:1,msg:'您的订单已完成'},
					{type:2,msg:'09-04 12:52订单取消成功'},
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry(){
				uni.stopPullDownRefresh()
			},
			getdata(){
				
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
	.xx_list{
		width: 100%;
		padding: 0 30upx;
	}
	.xx_li{
		width: 100%;
	}
	.xx_li_time{
		width: 100%;
		height: 65upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.xx_box{
		width: 100%;
		min-height: 124upx;
		background: #FFFFFF;
		border-radius: 10upx;
		padding: 20upx;
	}
	.xx_type{
		font-size: 24upx;
		font-family: PingFang;
		font-weight: bold;
		color: #222222;
		line-height: 40upx;
	}
	.xx_msg{
		line-height: 40upx;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
</style>
