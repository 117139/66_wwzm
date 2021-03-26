<template>
	<view class="minh100">
		<view class="jf_box">
			<view class="dis_flex aic ju_b jb_tit">
				<view class="jb_tit_l"><image :src="getimg('/static/images/business/gs_icon.png')" mode=""></image>{{loginDatas.nickname}}</view>
				<view>{{now_time}}</view>
			</view>
			<view class="jf_lb">兑换积分</view>
			<input class="jf_int" type="number" placeholder="请输入积分" v-model="jf_num">
			<view class="jf_znum">可兑换积分：<text>{{integral?integral:0}}</text></view>
			<view class="sub_btn" @tap="sub_fuc">提交</view>
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
				now_time:'',
				integral:'',
				jf_num:'',
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
		onLoad() {
			
			that=this
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
			that.getdata()
		},
		methods: {
			getimg(img){
				return service.getimg(img)
				that.sub_fuc()
			},
			sub_fuc(){
				if(that.jf_num<=0){
					uni.showToast({
						icon: 'none',
						title: '请输入金额'
					})
					return
				}
				if(that.jf_num>that.integral){
					uni.showToast({
						icon: 'none',
						title: '提现金额不足'
					})
					return
				}
				var jkurl='/integral/exchanges'
				var datas={
					token: that.$store.state.loginDatas.token||'',
					integral:that.jf_num
				}
				if(that.data_last) return
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				var page_that = that.page
				service.P_post(jkurl, datas).then(res => {
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
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
				
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
						title: '操作失败，请检查您的网络连接'
					})
				})
			},
			/**
			 * 获取积分记录
			 */
			
			getdata(){
				
				let that =this
				var jkurl='/integral/record'
				var datas={
					token: that.$store.state.loginDatas.token||'',
					page:1,
					size:20,
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
			
		}
	}
</script>

<style scoped>
	.minh100{
		background: #FAFAFA;
	}
	.jf_box{
		width: 100%;
		padding: 30upx;
	}
	.jb_tit{
		height: 80upx;
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
	.jf_lb{
		font-size: 36upx;
		color: #000;
		position: relative;
		padding-left: 15upx;
		height: 60upx;
		display: flex;
		align-items: center;
	}
	.jf_lb::before{
		position: absolute;
		top: 16upx;
		left: 0;
		content: '';
		width: 6upx;
		height: 33upx;
		background: #11A078;
		border-radius: 3upx;
	}
	.jf_int{
		margin-top: 25upx;
		width: 100%;
		height: 88upx;
		background: #FFFFFF;
		border: 1px solid #DDDDDD;
		border-radius: 4px;
		padding: 0 25upx;
	}
	.jf_znum{
		margin-top: 20upx;
		font-size: 26upx;
		color: #000;
	}
	.jf_znum text{
		color: #11A078;
	}
	.sub_btn{
		font-size: 36upx;
		color: #fff;
		margin-top: 400upx;
		width: 100%;
		height: 88upx;
		background: #11A078;
		border: 1px solid #DDDDDD;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
