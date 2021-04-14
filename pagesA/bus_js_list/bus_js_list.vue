<template>
	<view class="minh100">
		<view class='dis_flex ju_a  tab_box'>
			<block v-for="(item,idx) in data_list">
				<view :class="type==item.id?'active':''" :data-type="item.id" @tap='bindcur'>{{item.name}}</view>
			</block>

		</view>
		<view class="tx_list">
			<view class="tx_li" v-for="(item,index) in datas">
				<view class="tx_l">
					<view class="mx_name">+{{item.integral}}</view>
					<view v-if="type==1" class="mx_time">{{item.time}}</view>
					<view v-if="type==2" class="mx_time">{{item.created_at}}</view>
				</view>
				<view class="tx_r">
					<view v-if="type==1" class="mx_pri">{{item.order_name}}</view>
					<view v-if="type==2" class="mx_pri">{{item.source}}</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		</view>
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
				btnkg: 0,
				htmlReset: -1,
				data_last: false,
				datas: '',
				integral: 0,
				page: 1,
				size: 20,
				data_list:[
					{
						name:'订单积分',
						id:1
					},
					{
						name:'赠送积分',
						id:2
					},
				],
				type:1,
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
				// 'order_ls_data'
			]),

		},
		onLoad(option) {
			that = this
			if (option.type) {
				this.type = option.type
			}
			that.datas = []

			this.onRetry()
		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {

			this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getdatalist()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img) {
				return service.getimg(img)
			},
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
				// if(that.type== e.currentTarget.dataset.type){
				// 	return
				// }
			  that.type= e.currentTarget.dataset.type
				
				// that.getOrderList()
				this.onRetry()
			},
			onRetry() {
				// uni.stopPullDownRefresh()
				// return
				this.datas = []
				this.page = 1
				this.btnkg = 0
				this.data_last = false
				this.getdatalist()
			},
			getdatalist() {
				var that = this

				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size,
				}
				if(that.type==2){
					datas = {
						token: that.loginDatas.token || '',
						page: that.page,
						size: that.size,
						type:1
					}
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/order/done_engineer'
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

		}
	}
</script>

<style scoped>
	.minh100 {
		background: #FAFAFA;
		padding-top: 75upx;
	}

	.tab_box {
		/* border-top: 8upx solid #f5f5f5; */
		width: 100%;
		height: 75upx;
		background: #fff;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 90;
		font-size: 30rpx;
		padding: 0 30upx;
		border-bottom: 1px solid #F5F5F5;
	}

	.tab_box view {
		height: 72upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #999999;
	}

	.tab_box view.active {
		color: #00A079;
		position: relative;
	}

	.tab_box view.active::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 53upx;
		height: 4upx;
		margin-left: -26upx;
		background: #11A078;
	}

	.tx_list {
		width: 100%;
		padding: 15upx 30upx;
	}

	.tx_li {
		width: 100%;
		padding: 15upx 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		border-bottom: 1px solid #EFEFEF;
	}

	.tx_li+.tx_li {
		margin-top: 12upx;
	}

	.tx_l {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.tx_r {
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.mx_name {
		color: #292929;
		font-size: 40upx;
		font-weight: bold;
	}

	.mx_time {
		color: #999;
		font-size: 22upx;
		margin-top: 10upx;
	}

	.mx_pri {
		color: #57B6FF;
		font-size: 27upx;
		font-weight: bold;
	}

	.dhjf_btn {
		position: absolute;
		bottom: 30upx;
		right: 30upx;
		font-size: 24upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 158upx;
		height: 61upx;
		background: linear-gradient(121deg, #48CEB7, #48D39A);
		border: 1px solid #FFFFFF;
		border-radius: 31upx;
	}
</style>
