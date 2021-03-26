<template>
	<view class="content_wrap" :class="tk_show?'tk_class':''">
		<view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<image class="head_box_img" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>
			<view class="my_tit_box" :style="style1">
				<!-- 个人中心 -->
			</view>
		</view>
		<scroll-view class="scroll_H" style="top: 0px;" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
		 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
		 @refresherabort="onAbort" @scrolltolower="getdata" @scroll="scroll_fuc">
			<view v-if="hasLogin" class="my_box">
				<image class="my_box_bg" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>
				<view class="user_box dis_flex aic">
					<view class="user_tx">
						<image class="user_tx" :src="getimg(loginDatas.cover)" @tap="jump" data-url="/pagesA/user_edit/user_edit"></image>
						<!-- <avatar  stretch="short" selWidth="400upx" selHeight="400upx" @upload="myUpload"
						:avatarSrc="tximg?getimg(tximg):loginDatas.avatarurl"
						 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
						</avatar> -->
						<!-- <avatar  stretch="short" inner="true" selWidth="400upx" selHeight="400upx" @upload="myUpload"
						:avatarSrc="loginDatas.img_url?getimg(loginDatas.img_url):tximg"
						 avatarStyle="width: 140upx; height:140upx; border-radius: 50%;">
						</avatar>
						<view class="user_set">
							<text class="iconfont icon-xiugai"></text>
						</view> -->
					</view>
					<view class="flex_1">
						<view class="user_name dis_flex aic ju_b">
							<view>{{loginDatas.nickname}}</view>
							<view class="my_jf_btn" @tap="jump" data-url='/pagesA/bus_my_jf/bus_my_jf'>我的积分</view>
						</view>
						<view class="user_time">{{loginDatas.company}}</view>
						<image class="user_edit"  @tap="jump" data-url="/pagesA/user_edit/user_edit" :data-login='true' :data-haslogin='hasLogin' 
						 :src="getimg('/static/images/user/my_edit.png')" mode="aspectFill"></image>
					</view>
					<!-- <view class="iconfont icon-bianji user_edit" @tap="jump" data-url="/pages/my_msg/my_msg"></view> -->
				</view>
			</view>
			<view v-else class="my_box">
				<image class="my_box_bg" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image>
				
				<view class="user_box dis_flex aic ju_c">
					<!-- <image class="user_tx" src="/static/logo.png"></image> -->
					<view class="flex_1 dis_flex aic ju_c">
						<view class="user_name" @tap="jump" data-url="/pages/login/login" >登录/注册</view>
					</view>
				</view>
			</view>
			<view class="bus_my_list">
				<view class="bus_my_li">
					<view class="bus_my_li_tit dis_flex aic ju_b">
						<view class="dis_flex aic bus_my_li_tit_text"><image src="../../../static/images/business/my_icon1.png" mode=""></image>合同完成统计</view>
						<!-- <view v-if="datas.length>3" class="li_more dis_flex aic" @tap="jump" data-url="/pagesA/bus_tj_list/bus_tj_list">更多<text class="iconfont iconnext-m"></text></view> -->
						<!-- <view  class="li_more dis_flex aic" @tap="jump" data-url="/pagesA/bus_tj_list/bus_tj_list">更多<text class="iconfont iconnext-m"></text></view> -->
					</view>
					
					<view class="dis_flex my_table my_table_tit">
						<view class="my_td my_th">合同名称</view>
						<view class="my_td my_th">标的额</view>
						<view class="my_td my_th">套数/已完成</view>
						<view class="my_td my_th">积分值</view>
					</view>
					<view class="dis_flex my_table my_table_tit">
						<view class="my_td my_th">合计</view>
						<view class="my_td my_th">{{hj_data.cost?getpri(hj_data.cost):0}}</view>
						<view class="my_td my_th">{{hj_data.quantity?hj_data.quantity:0}}/{{hj_data.done_quantity?hj_data.done_quantity:0}}</view>
						<view class="my_td my_th">{{hj_data.integral_sum?hj_data.integral_sum:0}}</view>
					</view>
					<view style="width: 100%;height: 20upx;"></view>
					<view class="zanwu" v-if="datas.length==0">暂无数据</view>
					
					<!-- <view v-if="index<4" class="dis_flex my_table" v-for="(item,index) in datas"> -->
					<view class="dis_flex my_table" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/bus_gc_tj/bus_gc_tj?id='+item.id">
						<view class="my_td my_td1">
							<view class="oh2">{{item.title}}</view>
						</view>
						<view class="my_td my_td2">{{getpri(item.cost)}}</view>
						<view class="my_td my_td2">{{item.quantity}}/{{item.done_quantity}}</view>
						<view class="my_td my_td2">{{item.integral_sum}}</view>
					</view>
				</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				<!-- <view class="bus_my_li">
					<view class="bus_my_li_tit dis_flex aic ju_c">
						<view class="dis_flex aic bus_my_li_tit_text"><image src="../../../static/images/business/my_icon2.png" mode=""></image>工程完成统计</view>
						
					</view>
					<view class="dis_flex my_table my_table_tit">
						<view class="my_td my_th" style="width: 33%;">工程名称</view>
						<view class="my_td my_th" style="width: 33%;">工程金额</view>
						<view class="my_td my_th" style="width: 33%;">积分值</view>
					</view>
					<view style="width: 100%;height: 20upx;"></view>
					<view class="zanwu" v-if="datas_gc.length==0">暂无数据</view>
					<view class="dis_flex my_table" v-for="(item,index) in datas_gc">
						<view class="my_td my_td1" style="width: 33%;">
							<view class="oh2">{{item.order_name}}</view>
						</view>
						<view class="my_td my_td2" style="width: 33%;">{{getpri(item.total_money)}}</view>
						<view class="my_td my_td2" style="width: 33%;">{{item.integral}}</view>
					</view>
				</view> -->
				<view style="width: 100%;height: 10upx;"></view>
			</view>
			
		</scroll-view>
		
	</view>
</template>

<script>
	import service from '../../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		data() {
			return {
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btnkg: 0,
				time_zz:'你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: '',
				page:1,
				size:20,
				PageScroll:'',
				fk_show:false,
				tk_show:true,
				tximg:'/static/logo.png',
				datas_gc:'',
				hj_data:'',    //合计数据
				triggered: true, //设置当前下拉刷新状态
			};
		},
		onPageScroll(e){
			console.log(e)
			this.PageScroll=e.scrollTop
			
		},
		onReachBottom() {
			console.log('1111')
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas','fj_data']),
			
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;
				
				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},
			
			style1(){
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;
				
				return style
			},
			style2(){
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;
				
				return style
			}
		},
		mounted() {
			that = this
			this._freshing = false;
			if(that.hasLogin){
				that.onRetry()
			}
		},
		watch: {
			hasLogin(newval, oldval) {
				console.log(newval)
				if (newval == true) {
					that.btn_kg = 0
					that.onRetry()
				}
			}
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this.btn_kg == 1) {
					that.triggered=false
					that._freshing =false
					return
				}
				if (that._freshing) return;
				that._freshing = true;
				this.onRetry()
				setTimeout(()=>{
					that.triggered=false
					that._freshing =false
				},500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			getimg(img){
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			getpri(mon){
				if(!mon){
					return
				}
				mon=mon*1
				if(mon>=10000){
					mon=mon/10000
					mon=mon.toFixed(2)
					mon=mon-1+1
					return mon+'万'
				}
				return mon
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
			
				this.getdata()
				// this.getdata_gc()
			},
			getdata(num) {
				var that = this
			
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size,
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/order/done_contract'
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
						
							that.hj_data=datas.statistics
						if (page_that == 1) {
							that.datas = datas.contract
						} else {
							if (datas.contract.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							
							that.datas = that.datas.concat(datas.contract)
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
			getdata_gc(){
				var that = this
			
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: '50',
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
			
							that.datas_gc = datas
						} else {
							// if (datas.length == 0) {
							// 	that.data_last = true
							// 	return
							// }
							// that.data_last = false
							that.datas_gc = that.datas_gc.concat(datas)
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
			fabu_status(){
				var that =this
				if(that.loginDatas.dy_status==3){
					var now = Date.parse(new Date())
					console.log(now)
					console.log(that.loginDatas.dy_start_status*1000)
					console.log(that.loginDatas.dy_end_status*1000)
					console.log(1667567600000<now)
					console.log(that.loginDatas.dy_end_status*1000>now)
					console.log(1667567600000<now&&that.loginDatas.dy_end_status*1000>now)
					if(that.loginDatas.dy_start_status*1000<now&&that.loginDatas.dy_end_status*1000>now){
						return true
					}
				}
				return false
			},
			gettime(time){
				var time = new Date(time*1000);
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
				return  year+'-'+month+'-'+date
			},
			call(e){
				console.log(e)
				service.call(e)
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
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
	
	.my_tit_box{
		width: calc(100% - 440rpx);
		position: absolute;
		text-align: center;
		/* width: calc(100% - 340rpx); */
		left: 0;
		
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	
	
	
	
	
	
	.content_wrap{
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EDEDED;
	}
	.cu_custom_box{
		z-index: 99999;
	}
	.index_bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 355upx;
		z-index: 0;
	}
	.head_box{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		/* text-align: center; */
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;
		
		
		padding-right: 220rpx;
		-webkit-box-shadow: 0rpx 0rpx 0rpx;
		box-shadow: 0rpx 0rpx 0rpx;
		z-index: 9999;
		overflow: hidden;
	}
	.head_box_img{
		position: absolute;
		top: 0;
		width: 100%;
		height: 498upx;
		left: 0;
		right: 0;
	}
	.cur_H{
		background: #fff;
		color: #333;
	}
	
	
	.my_box{
		width: 100%;
		height: 498upx;
		position: relative;
	}
	.my_box_bg{
		position: absolute;
		top: 0;
		width: 100%;
		height: 498upx;
		z-index: 0;
	}
	.user_box{
		position: absolute;
		top: 210upx;
		left: 30upx;
		width: 690upx;
		/* height: 195upx; */
		/* background: #FFFFFF;
		box-shadow: 0px 2px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 10upx; */
		box-sizing: border-box;
		/* padding: 40upx; */
	}
	.user_tx{
		width: 138upx;
		height: 138upx;
		background: #FFFFFF;
		border-radius: 50%;
		
	}
	view.user_tx{
		margin-right: 20upx;
		position: relative;
	}
	.user_set{
		position: absolute;
		width: 35upx;
		height: 35upx;
		bottom: 0;
		right: 0;
		background: #3775F6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user_set text{
		font-size: 16upx;
		color: #fff;
	}
	.user_name{
		font-size: 40upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 70upx;
	}
	.user_time{
		font-size: 26upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 30px;
		opacity: 0.8;
	}
	.user_edit {
		width: 150upx;
		height: 44upx;
		border-radius: 22upx;
	}
	.bus_my_list{
		position: relative;
		z-index: 10;
		margin-top: -40upx;
		padding: 0 30upx;
	}
	.bus_my_li{
		width: 100%;
		
		background: #FFFFFF;
		box-shadow: 0px 0px 16upx 0px rgba(173, 218, 219, 0.22);
		border-radius: 10upx;
		margin-bottom: 20upx;
	}
	.bus_my_li_tit{
		width: 100%;
		padding: 0 30upx 0;
		border-bottom: 1px solid #EDEDED;
		height: 75upx;
	}
	.bus_my_li_tit image{
		width: 30upx;
		height: 33upx;
		margin-right: 20upx;
	}
	.bus_my_li_tit_text{
		line-height: 32upx;
		font-size: 32upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #000000;
	}
	.li_more{
		
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.li_more text{
		color: #999;
		font-size: 14upx;
		margin-left: 20upx;
	}
	.my_table{
		width: 100%;
	}
	.my_table_tit{
		border-bottom: 1px solid #EDEDED;
	}
	.my_td{
		width: 25%;
		flex: none;
		height: 57upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #727272;
		position: relative;
		padding: 0 3upx;
	} 
	.my_th+.my_th::before{
		position: absolute;
		content: '';
		width: 1px;
		height: 30upx;
		background: #EDEDED;
		top: 15upx;
		left: 0;
	}
	.my_td1{
		height: 88upx;
		font-size: 28upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #727272;
	}
	.my_td2{
		height: 88upx;
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #11A078;
	}
	.td_user_tx{
		width: 52upx;
		height: 52upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.td_user_msg{
		height: 62upx;
	}
	.td_uname{
		color: #3a3a3a;
		font-size: 26upx;
	}
	.td_utb{
		font-size: 14upx;
		color: #a8a8a8;
	}
	.td_ximg{
		width: 18upx;
		height: 16upx;
		margin-right: 20upx;
	}
	.my_jf_btn{
		padding: 10upx 20upx;
		border: 1px solid #fff;
		font-size: 34upx;
		line-height: 40upx;
		border-radius: 50upx;
	}
</style>
