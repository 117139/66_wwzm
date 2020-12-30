<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="swiper_box">
				<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,.3)" indicator-active-color="#11A078"
				 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true' @change="swiper_change">
					<swiper-item v-for="(item,idx) in getimgarr(datas.photo)">
						<!-- <image class="swi_img" src="/static/images/user/banner_01.jpg" mode="aspectFill"></image> -->
						<image class="swi_img" :src="item" mode="aspectFill"
								 @tap="pveimg" :data-src="item" ></image>
					</swiper-item>
				
				</swiper>
				<view class="swi_num">{{banner_type}}/{{getimgarr(datas.photo).length}}</view>
			</view>
			<view class="goods_msg">
				<view class="goods_name">{{datas.title}}</view>
				<view class="goods_jj">{{datas.description}}</view>
				<view class="dis_flex ju_b aic">
					<view class="goods_pri"><text>¥</text>{{datas.price}}</view>
					<view class="goods_num"><image src="../../static/images/user/gouwuche1.png" mode="aspectFit"></image>已售：{{datas.sold}}</view>
				</view>
			</view>
			<view class="goods_xq">
				<view class="goods_xq_tit">详情介绍</view>
				<view class="goods_fwb" v-html="get_fwb(datas.content)"></view>
				<!-- <view class="goods_fwb" >
					
					1、多控智能开关通过ZigBee无线网络连接到智能网关，与其它ZigBee设备组成网络，通过本地按键、场景联动。
					<br>2、APP控制智能开关各回路所接负载的开关状态,并在产品上指示当前负载状态。
					<br>3、智能单火开关无需重新布置零线，安装简单便捷。
					<image class="swi_img" :src="getimg('/static/images/user/goods_02.jpg')" mode="aspectFill" style="margin-top: 20upx;"></image> 
				</view> -->
			</view>
			<view class="pl_bbox">
				<view class="xq_cz dis_flex aic ju_b">
					<view class="gwc_btn" @tap="jump" data-url="/pagesA/user_shoucang/user_shoucang">
						<image src="../../static/images/user/gouwuche1.png" mode="aspectFit"></image>
						<text>收藏</text>
						<text v-if="car_num>0" class="gwc_num">{{car_num}}</text>
					</view>
					<view @tap="addcar" class="addsc">加入收藏</view>
				</view>
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
				indicatorDots: false,
				autoplay: false,
				interval: 3000,
				duration: 500,
				banner: ['/static/images/user/goods_02.jpg', '/static/images/user/goods_02.jpg', '/static/images/user/goods_02.jpg'],
				banner_type:1,
				datas:'',
				car_num:0,
				htmlReset:-1
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		
		onPullDownRefresh() {
			this.getdata()
		},
		onLoad(option) {
			that=this
			this.type=option.type
			this.id=option.id
			this.getdata()
			this.getcar()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry(){
				this.getdata()
			},
			getdata() {
				var that =this
				var jkurl = '/goods/list'
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
				}
				
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
			
						that.datas = datas
			
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
						title: '获取数据失败'
					})
				})
			},
			getcar() {
				var that =this
				var jkurl = '/user/collect_list'
				var datas = {
					token: that.loginDatas.token || '',
					load_mode:true
				}
				
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
			
						if(datas.goods.length>0){
							
							that.car_num=res.data.count
						}else{
							that.car_num=0
						}
			
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
						title: '获取数据失败'
					})
				})
			},
			getimg(img) {
				return service.getimg(img)
			},
			pveimg(e){
				service.pveimg(e)
			},
			getimgarr(img) {
				// console.log(service.getimgarr(img))
				return service.getimgarr(img)
			},
			getarr(str){
				if(!str){
					return
				}				
				console.log(str)
				str=str.split(',')
				console.log(str)
				return str
			},
			get_fwb(str){
				return service.get_fwb(str)
			},
			swiper_change(e){
				console.log(e.detail.current)
				this.banner_type=e.detail.current+1
			},
			addcar(item){
				var jkurl = '/user/collect'
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
				}
				
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
							
						uni.showToast({
							icon:'none',
							title:'收藏成功'
						})
							
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
						title: '获取数据失败'
					})
				})
				
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
	.swiper_box{
		position: relative;
		background: #fff;
	}
	.swiper {
		position: relative;
		z-index: 100;
		width: 100%;
		height: 640upx;
	}
	
	.swi_img {
		width: 100%;
		height: 640upx;
		position: relative;
		z-index: 100;
	}
	.swi_num{
		position: absolute;
		bottom: 30upx;
		right: 30upx;
		z-index: 200;
		width: 96upx;
		height: 46upx;
		background: #020E10;
		opacity: 0.6;
		border-radius: 23upx;
		
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goods_msg{
		width: 100%;
		background: #fff;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
	}
	.goods_name{
		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #111111;
		margin-bottom: 10upx;
	}
	.goods_jj{
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		margin-bottom: 20upx;
	}
	.goods_pri{
		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #F4691A;
	}
	.goods_pri text{
		font-size: 28upx;
	}
	.goods_num{
		font-size: 24upx;
		color: #666;
		display: flex;
		align-items: center;
	}
	.goods_num image{
		width: 28upx;
		height: 24upx;
		margin-right: 20upx;
	}
	
	.goods_xq{
		width: 100%;
		padding: 0 30upx 170upx;
		background: #fff;
	}
	.goods_xq_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EDEDED;
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #11A078;
	}
	.goods_fwb{
		width: 100%;
		padding-top: 20upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.goods_fwb image{
		max-width: 100%;
	}
	.pl_bbox{
		width: 100%;
		padding-bottom: 50upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 100;
	}
	.xq_cz{
		width: 100%;
		height: 96upx;
		
		box-shadow: 0px -3upx 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 14upx 70upx;
		display: flex;
		align-items: center;
	}
	.gwc_btn{
		display: flex;
		flex-direction: column;
		align-items: center;
		
		font-size: 22upx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #999999;
		position: relative;
	}
	.gwc_btn image{
		width: 44upx;
		height: 38upx;
	}
	.gwc_num{
		position: absolute;
		top: -10upx;
		right: -20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F34826;
		border-radius: 15upx;
		min-width: 40upx;
		padding:4upx 7upx;
		line-height: 22upx;
		font-size: 22upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.addsc{
		width: 224upx;
		height: 56upx;
		background: #11A078;
		border-radius: 28upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
