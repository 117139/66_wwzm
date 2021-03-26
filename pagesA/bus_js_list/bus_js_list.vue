<template>
	<view class="minh100">
		<view class="tx_list">
			<view class="tx_li" v-for="(item,index) in datas">
				<view class="tx_l">
					<view class="mx_name">+{{item.integral}}</view>
					<view class="mx_time">{{item.time}}</view>
				</view>
				<view class="tx_r">
					<view  class="mx_pri">{{item.order_name}}</view>
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
				btnkg:0,
				htmlReset:-1,
				data_last:false,
				datas:'',
				integral:0,
				page:1,
				size:20
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginDatas',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onLoad(option) {
			that=this
			if(option.type){
				this.type=option.type
			}
			that.datas=[]
			
			this.onRetry()
		},
		
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			this.getdatalist()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img){
				return service.getimg(img)
			},
			onRetry(){
				// uni.stopPullDownRefresh()
				// return
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
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
				var jkurl = '/order/done_engineer'
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
			
		}
	}
</script>

<style scoped>
	.minh100{
		background: #FAFAFA;
	}
	.tx_list{
		width: 100%;
		padding: 15upx 30upx;
	}
	.tx_li{
		width: 100%;
		padding: 15upx 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		border-bottom: 1px solid #EFEFEF;
	}
	.tx_li+.tx_li{
		margin-top: 12upx;
	}
	.tx_l{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.tx_r{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.mx_name{
		color: #292929;
		font-size: 40upx;
		font-weight: bold;
	}
	.mx_time{
		color: #999;
		font-size: 22upx;
		margin-top: 10upx;
	}
	.mx_pri{
		color: #57B6FF;
		font-size: 27upx;
		font-weight: bold;
	}
	.dhjf_btn{
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
