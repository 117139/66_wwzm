<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view v-for="(item,index) in datas">
			<view class="order_li_tit">{{item.name}}</view>
			<view class="order_li_msg">

				<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">

					<view v-for="(item,index) in taocan_list" class="taocan_li" @tap="jump" :data-url="'/pagesA/user_goods_xq/user_goods_xq?id='+index">
						<image class="taocan_li_img" :src="getimg('/static/images/business/tc_img_03.png')" mode="aspectFit"></image>
						<view class="taocan_li_msg oh2">{{item.name}}</view>
						<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>998</view>
					</view>
				</scroll-view>
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
					{
						name:'智能套餐A'
					},
					{
						name:'智能套餐B'
					},
					{
						name:'智能套餐C'
					},
				],
				taocan_list: [{
						name: 'Mini 主机',
						id: 1
					},
					{
						name: '门窗传感器',
						id: 2
					},
					{
						name: '智能可燃气体报警器多功能更安全快速防',
						id: 3
					},
					{
						name: '智能门锁 T1C',
						id: 4
					},
					{
						name: 'Mini 主机',
						id: 1
					},
					{
						name: '门窗传感器',
						id: 2
					},
					{
						name: '智能可燃气体报警器多功能更安全快速防',
						id: 3
					},
					{
						name: '智能门锁 T1C',
						id: 4
					},
				],
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
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
	.order_li_tit{
		line-height: 90upx;
		font-size: 34upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		padding: 0 30upx;
		background: #fff;
		
	}
	.weixin_dblist {
		width: 100%;
		height: 300upx;
		white-space: nowrap;
		padding-top:0;
		background: #fff;margin-bottom: 20upx;
	}

	.taocan_li {
		width: 162upx;
		height: 281upx;
		background: #FAFAFA;
		margin-right: 14upx;
		padding: 5upx;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.taocan_li_img {
		width: 152upx;
		height: 152upx;
		margin-bottom: 15upx;
	}

	.taocan_li_msg {
		width: 95%;
		text-align: center;
		line-height: 30upx;
		height: 60upx;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #222222;
		margin-bottom: 10upx;
		white-space: pre-wrap;
	}

	.taocan_li_pri {
		color: #F4691A;
		font-size: 22upx;
	}
</style>
