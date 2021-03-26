<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view class="dis_flex aic ju_b jb_tit">
			<view class="jb_tit_l"><image :src="getimg('/static/images/business/gs_icon.png')" mode=""></image>{{loginDatas.nickname}}</view>
			<view>{{now_time}}</view>
		</view>
		<view v-if="htmlReset==0" class="bus_my_list">
			<view class="bus_my_li">

				<view class="dis_flex my_table my_table_tit">
					<view class="my_td my_th">工程名称</view>
					<view class="my_td my_th">工程金额</view>
					<view class="my_td my_th">积分值</view>
				</view>
				<view style="width: 100%;height: 20upx;"></view>
				<view class="zanwu" v-if="datas.length==0">暂无数据</view>
				<view class="dis_flex my_table" v-for="(item,index) in datas">
					<view class="my_td my_td1">
						<view class="oh2" style="font-size: 32upx;color: #000;">{{item.order_name}}</view>
					</view>
					<view class="my_td my_td2">{{item.order_name}}</view>
					<view class="my_td my_td2">{{getpri(item.total_money)}}</view>
					<view class="my_td my_td2">{{item.integral}}</view>
				</view>

				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
			</view>
			<!--<view class="bus_my_li">
				<view class="bus_my_li_tit dis_flex aic ju_c">
					<view class="dis_flex aic bus_my_li_tit_text"><image src="../../../static/images/business/my_icon2.png" mode=""></image>工程完成统计</view>
					
				</view>
				<view style="width: 100%;height: 20upx;"></view>
				<view class="dis_flex my_table" v-for="(item,index) in 3">
					<view class="my_td my_td1">
						<image class="td_user_tx" :src="getimg(loginDatas.avatarurl)"></image>
						<view class="td_user_msg dis_flex_c ju_b">
							<view class="td_uname">宋少康</view>
							<view class="td_utb">L-6B</view>
						</view>
					</view>
					<view class="my_td my_td1" style="color: #000;"><image class="td_ximg" src="../../../static/images/business/my_ximg_03.jpg" mode=""></image>999+</view>
					<view class="my_td my_td1" style="color: #000;"><image class="td_ximg" src="../../../static/images/business/my_ximg_05.jpg" mode=""></image>500</view>
					<view class="my_td my_td1" style="color: #000;"><image class="td_ximg" src="../../../static/images/business/my_ximg_07.jpg" mode=""></image>500</view>
				</view>
			</view>-->
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
				datas: '',
				page: 1,
				size: 20,
				data_last: false,
				htmlReset: -1,
				now_time:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad(option) {
			that=this
			that.id=option.id
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			month = month < 10 ? "0" + month : month;
			date = date < 10 ? "0" + date : date;
			hour = hour < 10 ? "0" + hour : hour;
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			that.now_time=  year+'-'+month+'-'+date
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
			getimg(img){
				return service.getimg(img)
				that.sub_fuc()
			},
			getpri(mon) {
				if (!mon) {
					return
				}
				mon = mon * 1
				if (mon >= 10000) {
					mon = mon / 10000
					mon = mon.toFixed(2)
					mon = mon - 1 + 1
					return mon + '万'
				}
				return mon
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
					contract_id:that.id||'',
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
	.minh100{
		background: #FAFAFA;
	}
	.jb_tit{
		width: 100%;
		height: 140upx;
		padding: 0 30upx;
		background: #fff;
	}
	.jb_tit_l{
		font-size: 34upx;
		color: #000;
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	.jb_tit_l image{
		width: 40upx;
		height: 40upx;
		margin-right: 8upx;
	}
	.bus_my_list {
		position: relative;
		z-index: 10;
		/* margin-top: -40upx; */
		/* padding: 20upx 30upx; */
	}

	.bus_my_li {
		width: 100%;

		/* background: #FFFFFF; */
		/* box-shadow: 0px 0px 16upx 0px rgba(173, 218, 219, 0.22); */
		border-radius: 10upx;
		margin-bottom: 20upx;
	}

	.bus_my_li_tit {
		width: 100%;
		padding: 0 30upx 0;
		border-bottom: 1px solid #E4E8E9;
		height: 75upx;
	}

	.bus_my_li_tit image {
		width: 30upx;
		height: 33upx;
		margin-right: 20upx;
	}

	.bus_my_li_tit_text {
		line-height: 32upx;
		font-size: 32upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #000000;
	}

	.li_more {

		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.li_more text {
		color: #999;
		font-size: 14upx;
		margin-left: 20upx;
	}

	.my_table {
		width: 100%;
	}

	.my_table_tit {
		border-bottom: 1px solid #EDEDED;
	}

	.my_td {
		width: 33%;
		flex: none;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #727272;
		position: relative;
	}
	.my_th{
		font-size: 32upx;
		color: #000;
	}
	.my_th+.my_th::before {
		position: absolute;
		content: '';
		width: 1px;
		height: 60upx;
		background: #E4E8E9;
		top: 0upx;
		left: 0;
	}

	.my_td1 {
		height: 88upx;
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #000;
	}

	.my_td2 {
		height: 88upx;
		font-size: 32upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #11A078;
	}

	.td_user_tx {
		width: 52upx;
		height: 52upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	.td_user_msg {
		height: 62upx;
	}

	.td_uname {
		color: #3a3a3a;
		font-size: 26upx;
	}

	.td_utb {
		font-size: 14upx;
		color: #a8a8a8;
	}

	.td_ximg {
		width: 18upx;
		height: 16upx;
		margin-right: 20upx;
	}
</style>
