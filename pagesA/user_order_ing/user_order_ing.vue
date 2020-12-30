<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="order_list">
				<view class="order_li" v-for="(item,index) in datas">
					<view class="dis_flex aic ju_b order_name">
						<view class="flex_1">
							<view class="oh1">{{item.order_name}}</view>
						</view>
						<!-- <text v-if="index==1">施工中</text>
						<text v-else style="color: #52B0FF;">已结束</text> -->
						<text v-if="item.status==1" >
							待处理
						</text>
						<text v-else-if="item.status==2"  style="color: #0B8EE1;">
							施工中
						</text>
						<text v-else  style="color:#52B0FF;">已结束</text>
					</view>
					<view class="dis_flex aic ju_b order_time">
						<view class="flex_1">
							<view class="oh1">{{item.created_at}}</view>
						</view>
						<text   @tap='jump' :data-url="'/pagesA/user_order_xq/user_order_xq?id='+item.id">立即查看</text>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
			</view>
		</block>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				datas:[],
				pages:1,
				size:20,
				data_last: false,
				htmlReset:-1
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			
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
					size: that.size,
					status: '',
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/rate'
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
			call(e){
				service.call(e)
			},
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
