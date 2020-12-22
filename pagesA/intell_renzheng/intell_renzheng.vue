<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view class="rz_li dis_flex aic ju_b">
			<view>真实姓名</view>
			<input type="text" placeholder="请输入" v-model="name">
		</view>
		<view class="rz_li dis_flex aic ju_b">
			<view>身份证号码</view>
			<input type="text" placeholder="请输入" v-model="id_cord">
		</view>
		<view class="rz_li dis_flex aic ju_b">
			<view>手机号</view>
			<input type="number" placeholder="请输入" v-model="phone">
		</view>
		<view class="rz_li dis_flex aic ju_b" style="margin-top: 20upx;"  @tap="upimg" data-type="1">
			<view class="flex_1">身份证正面</view>
			<image :src="img1?img1:'/static/images/intell/renzheng_03.jpg'" mode="aspectFill"></image>
			<text class="iconfont iconnext-m"></text>
		</view>
		<view class="rz_li dis_flex aic ju_b" @tap="upimg" data-type="2">
			<view class="flex_1">身份证反面</view>
			<image :src="img2?img2:'/static/images/intell/renzheng_07.jpg'" mode="aspectFill"></image>
			<text class="iconfont iconnext-m"></text>
		</view>
		<view class="rz_li dis_flex aic ju_b" @tap="upimg" data-type="3">
			<view class="flex_1">手持证件照</view>
			<image :src="img3?img3:'/static/images/intell/renzheng_09.jpg'" mode="aspectFill"></image>
			<text class="iconfont iconnext-m"></text>
		</view>
		<view class="sub_btn" @tap="sub">提交</view>
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
				name:'',
				id_cord:'',
				phone:'',
				img1:'',
				img2:'',
				img3:'',
			}
		},
		onLoad() {
			that=this
		},
		methods: {
			sub(){
				if(!this.name){
					uni.showToast({
						icon:'none',
						title:'请输入姓名'
					})
					return
				}
				if(!this.id_cord){
					uni.showToast({
						icon:'none',
						title:'请输入身份证号码'
					})
					return
				}
				if(!this.phone){
					uni.showToast({
						icon:'none',
						title:'请输入手机号'
					})
					return
				}
				
				if(!this.img1){
					uni.showToast({
						icon:'none',
						title:'请上传身份证正面'
					})
					return
				}
				if(!this.img2){
					uni.showToast({
						icon:'none',
						title:'请上传身份证反面'
					})
					return
				}
				if(!this.img3){
					uni.showToast({
						icon:'none',
						title:'请上传手持证件照'
					})
					return
				}
				var datas={
					name:that.name,
					id_cord:that.id_cord,
					phone:that.phone,
					img1:that.img1,
					img2:that.img2,
					img3:that.img3,
				}
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				console.log(datas)
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			upimg(e) {
				var that = this
				// 从相册选择1张图
				var datas=e.currentTarget.dataset
				uni.showActionSheet({
						itemList: ['拍照', '相册'],
						success: function (res) {
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								var sourceType=['camera', 'album']
								if(res.tapIndex==0){
									 sourceType=['camera']
								}else{
									sourceType=['album']
								}
								uni.chooseImage({
									count: 1,
									sizeType: ['original', 'compressed'],
									sourceType:sourceType,
									success: function(res) {
										console.log(res)
										const tempFilePaths = res.tempFilePaths
								
										if(datas.type==1){
											that.img1=tempFilePaths[0]
										}
										if(datas.type==2){
											that.img2=tempFilePaths[0]
										}
										if(datas.type==3){
											that.img3=tempFilePaths[0]
										}
										return
										
										that.upimg1(tempFilePaths,0, datas.type)
								
									}
								});
						},
						fail: function (res) {
								console.log(res.errMsg);
						}
				});
				
			},
			upimg1(imgs, i,type) {
				var that = this
				
				uni.uploadFile({
					url: service.IPurl+'user/upload_img', //仅为示例，非真实的接口地址
					filePath: imgs[i],
					name: 'img',
					formData: {
						token: that.loginDatas.token
					},
					success(res) {
						// console.log(res.data)
						var ndata = JSON.parse(res.data)
						if (ndata.code == 1) {
							console.log(imgs[i], i, ndata.img_url)
							// var newdata = that.sj_img
							console.log(i)
							if(type==1){
								that.img1=ndata.img_url
							}
							if(type==2){
								that.img2=ndata.img_url
							}
							if(type==3){
								that.img3=ndata.img_url
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				})
			},
			
		}
	}
</script>

<style scoped>
	.rz_li{
		width: 100%;
		padding: 10upx 30upx;
		min-height: 87upx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.rz_li{
		font-size: 30upx;
		color: #222;
	}
	.rz_li image{
		width: 152upx;
		height: 100upx;
		border-radius: 8px;
		margin-right: 20upx;
	}
	.rz_li text{
		font-size: 30upx;
		color: #989CA9;
	}
	.sub_btn{
		margin: 60upx auto;
		width: 690upx;
		height: 88upx;
		background: #3778FE;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
