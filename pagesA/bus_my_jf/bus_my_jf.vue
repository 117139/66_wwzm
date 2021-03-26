<template>
	<view class="minh100">
		<htmlLoading ref="htmlLoading" @Retry='onRetry' :bj_show="false">
			<view class="main_box">
				<view class="top_box">
					<image class="top_box_img" :src="getimg('/static/images/business/bus_jfbg_03.png')" mode="aspectFill"></image>
					<view class="top_box_box">
						
						<view class="top_d2">
							{{integral?integral:'0.00'}}
							<view style="font-size: 30upx;font-weight: normal;margin-left: 4upx;">积分</view>
							<view class="top_box_btn" @tap="jump" data-url="/pagesA/bus_js_list/bus_js_list?type=1">
								<text class="iconfont iconnext-m"></text>
							</view>
						</view>
						<view class="dhjf_btn" @tap="jump" data-url="/pagesA/bus_js_set/bus_js_set">兑换积分</view>
					</view>
				</view>
				<view class="tixian_tit">兑换记录</view>
				<view class="tx_list">
					<view class="tx_li" v-for="(item,index) in datas">
						<view class="tx_l">
							<view class="mx_name">-{{item.integral}}</view>
							<view class="mx_time">{{item.updated_at}}</view>
						</view>
						<view v-if="item.status==2" class="go_pz" @tap="pveimg" :data-src="getimg(item.voucher)">查看凭证<text class="iconfont iconnext-m"></text></view>
						<view class="tx_r">
							<view v-if="item.status==1" class="mx_pri">待审批</view>
							<view v-if="item.status==2" class="mx_pri1">已审批</view>
						</view>
					</view>
					<view v-if="datas.length==0" class="zanwu">暂无数据</view>
					<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				</view>
			</view>
		</htmlLoading>
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
				size:20,
				show_num:0
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
		onShow(){
			if(this.show_num>0){
				this.page=1
				this.onRetry()
			}
			
			// this.getOrderList('onshow')
		},
		onHide() {
			this.show_num++
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
			pveimg(e){
				service.pveimg(e)
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
				
				let that =this
				var jkurl='/integral/record'
				var datas={
					token: that.$store.state.loginDatas.token||'',
					page:that.page,
					size:that.size,
				}
				if(that.data_last) return
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(0)
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						that.integral=res.integral
						if (page_that == 1) {
				
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++
				
					} else {
						that.htmlReset = 1
					// that.$refs.htmlLoading.htmlReset_fuc(1)
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
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
			jump(e) {
				var that = this
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
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
	.main_box{
		width: 100%;
		padding: 30upx;
	}
	.top_box{
		width: 100%;
		position: relative;
		border-radius: 27upx;
	}
	.top_box_img{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		border-radius: 27upx;
	}
	.top_box_box{
		width: 100%;
		position: relative;
		z-index: 10;
		min-height: 347upx;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.top_box_btn{
		
		width: 30upx;
		height: 30upx;
		background: #FFFFFF;
		border-radius: 20upx;
		font-size: 24upx;
		color: #FC6956;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 8upx;
	}
	.top_box_btn text{
		color: #00BFA5;
		font-size: 20upx;
	}
	.top_d2{
		font-size: 90upx;
		color: #fff;
		/* font-weight: bold; */
		line-height: 95upx;
		display: flex;
		align-items: center;
	}
	.tixian_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		color: #000;
		font-size: 36upx;
		margin-top: 20upx;
	}
	.tixian_tit image{
		width: 30upx;
		height: 24upx;
		margin-right: 15upx;
	}
	.tx_list{
		width: 100%;
		/* padding: 15upx 0; */
	}
	.tx_li{
		width: 100%;
		padding: 15upx 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
	}
	.tx_li+.tx_li{
		margin-top: 12upx;
	}
	.tx_l{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
	}
	.tx_r{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.mx_name{
		color: #111;
		font-size: 40upx;
	}
	.mx_time{
		color: #999;
		font-size: 22upx;
		margin-top: 10upx;
	}
	.mx_pri{
		color: #FF5757;
		font-size: 30upx;
		font-weight: bold;
	}
	.mx_pri1{
		color: #57B6FF;
		font-size: 30upx;
		font-weight: bold;
	}
	.go_pz{
		font-size: 24upx;
		color: #999;
		display: flex;
		align-items: center;
		margin-right: 10upx;
	}
	.go_pz text{
		
		font-size: 24upx;
		color: #999;
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
