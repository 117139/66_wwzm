<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="/static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="sh_list">
				<view class="sh_li" v-for="(item,index) in datas">
					<view class="sh_li_tit">
						<view class="sh_li_tl">订单号：{{item.order_num}}</view>
						<view v-if="item.status==1" class="sh_li_tr">待处理</view>
						<view v-if="item.status==2" class="sh_li_tr">处理中</view>
						<view v-if="item.status==3" class="sh_li_tr" style="color: #000;">已完成</view>
					</view>
					<view class="sh_li_msg">
						<view class="sh_li_msg_d1">{{item.order_name}}</view>
						<view class="sh_li_msg_d2">业主：{{item.owner_name}}</view>
						<view class="sh_li_msg_d2">地址：{{item.owner_address}}</view>
						<view class="sh_li_msg_d2">下单时间：{{item.created_at}}</view>
					</view>
					<view class="sh_czli dis_flex aic">
						<view class="flex_1"></view>
						<view class="sh_btn" v-if="item.status!=3" @tap="call" :data-tel="item.owner_phone">联系业主</view>
						<view class="sh_btn sh_btn1" v-if="item.status!=3" @tap="sub(item)">已处理</view>
						<view v-if="item.status==3" class="sh_btn" @tap="del(item,index)">删除订单</view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
				datas: '',
				htmlReset: -1,
				page: 1,
				size: 20,
				data_last: false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that = this
			that.onRetry()
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			sub(item) {
				var datas = {
					token: that.loginDatas.token,
					order_num: item.order_num,
					type: 'done'
				}
				var jkurl = "/engineer/after_status"
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						Vue.set(item, 'status', 3)

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
			del(item, index) {
				uni.showModal({
					title: '提示',
					content: '是否删除该订单?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							var datas = {
								token: that.loginDatas.token,
								order_num: item.order_num,
								type: 'del'
							}
							var jkurl = "/engineer/after_status"
							service.P_post(jkurl, datas).then(res => {
								that.btn_kg = 0
								console.log(res)
								if (res.code == 1) {
									that.htmlReset = 0
									var datas = res.data
									console.log(typeof datas)

									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}
									console.log(res)
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
									that.datas.splice(index, 1)
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

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false

				this.getdata()
			},
			getdata(num) {
				var that = this

				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/engineer/after'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
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
						that.htmlReset = 1
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
					that.htmlReset = 1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})

			},
			call(e) {
				service.call(e)
			}
		}
	}
</script>

<style scoped>
	.sh_list {
		width: 100%;
		padding: 20upx 30upx;
	}

	.sh_li {
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px 10px 0px 0px;
		margin-bottom: 20upx;
	}

	.sh_li_tit {
		border-bottom: 1px solid #eee;
		height: 75upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}

	.sh_li_tl {

		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.sh_li_tr {

		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FE4537;
	}

	.sh_li_msg {
		width: 100%;
		padding: 20upx 30upx;
	}

	.sh_li_msg_d1 {

		font-size: 24upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		margin-bottom: 15upx;
	}

	.sh_li_msg_d2 {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 30upx;
		margin-top: 8upx;
	}

	.sh_btn {
		width: 160upx;
		height: 56upx;
		background: #fff;
		border: 1px solid #3778FE;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3778FE;
		margin-left: 15upx;
	}

	.sh_btn1 {
		color: #fff;
		background: #3778FE;
	}

	.sh_czli {
		width: 100%;
		padding: 0 30upx 30upx;
	}
</style>
