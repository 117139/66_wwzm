<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="xx_list">
				<view class="xx_li" v-for="(item,index) in datas">
					<view class="xx_li_time">{{item.created_at}}</view>
					<view class="xx_box dis_flex aic ju_b" @tap='jump' :data-url="'/pagesA/user_order_xq/user_order_xq?id='+item.id">
						<view>
							<view class="xx_type" >{{item.comments}}</view>
							<view class="xx_msg" v-if="item.order_status==2">您的订单状态已更新</view>
							<view class="xx_msg" v-else-if="item.order_status==3">您的订单已完成</view>
							<view class="xx_msg" v-else-if="item.order_status==4">您的订单订单取消成功</view>
							<view class="xx_msg" v-else>{{item.comments}}</view>
						</view>
						<view class="iconfont iconnext-m"></view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
			</view>
		</block>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
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
				],
				page:1,
				size:20,
				data_last:false,
				htmlReset:-1
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		onLoad() {
			that=this
			that.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
					
				this.getdata()
			},
			getdata() {
				var that = this
				
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/news'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
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
					
						if (page_that == 1) {
					
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas)
						}
						that.page++
					
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
						title: '获取数据失败，请检查您的网络连接'
					})
				})
					
			},
			jump(e) {
				var that = this
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
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
