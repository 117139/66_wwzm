<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view class="sh_list">
			<view class="sh_li">
				<view class="sh_li_tit">
					<view class="sh_li_tl">订单号：268945461320</view>
					<view class="sh_li_tr">待处理</view>
				</view>
				<view class="sh_li_msg">
					<view class="sh_li_msg_d1">智能门锁损失</view>
					<view class="sh_li_msg_d2">业主：张大大</view>
					<view class="sh_li_msg_d2">地址：重庆市渝中区菜园坝中山大厦23-2</view>
					<view class="sh_li_msg_d2">下单时间：2020-10-23</view>
				</view>
				<view class="sh_czli dis_flex aic">
					<view class="flex_1"></view>
					<view class="sh_btn" @tap="call" data-tel="18300000000">联系业主</view>
					<view class="sh_btn sh_btn1" @tap="sub">已处理</view>
				</view>
			</view>
			<view class="sh_li">
				<view class="sh_li_tit">
					<view class="sh_li_tl">订单号：268945461320</view>
					<view class="sh_li_tr" style="color: #000;">已完成</view>
				</view>
				<view class="sh_li_msg">
					<view class="sh_li_msg_d1">智能门锁损失</view>
					<view class="sh_li_msg_d2">业主：张大大</view>
					<view class="sh_li_msg_d2">地址：重庆市渝中区菜园坝中山大厦23-2</view>
					<view class="sh_li_msg_d2">下单时间：2020-10-23</view>
				</view>
				<view class="sh_czli dis_flex aic">
					<view class="flex_1"></view>
					<view class="sh_btn" @tap="del">删除订单</view>
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
			sub(){
				uni.showToast({
					icon:'none',
					title:'已处理'
				})
			},
			del(){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该订单?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										uni.showToast({
											icon:'none',
											title:'操作成功'
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
				this.datas = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				return
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.userToken || '',
					page: that.page,
					size: that.size,
					type: this.type,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/productOrder/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
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
						title: '获取数据失败，请检查您的网络连接'
					})
				})

			},
			call(e){
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
	.sh_li_tit{
		border-bottom: 1px solid #eee;
		height: 75upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.sh_li_tl{
		
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}
	.sh_li_tr{
		
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FE4537;
	}
	.sh_li_msg{
		width: 100%;
		padding: 20upx 30upx;
	}
	.sh_li_msg_d1{
		
		font-size: 24upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		margin-bottom: 15upx;
	}
	.sh_li_msg_d2{
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 30upx;
		margin-top: 8upx;
	}
	.sh_btn{
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
	.sh_btn1{
		color: #fff;
		background: #3778FE;
	}
	.sh_czli{
		width: 100%;
		padding:0 30upx 30upx;
	}
</style>
