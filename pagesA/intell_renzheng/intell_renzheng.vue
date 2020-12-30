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
			<image :src="img1? getimg(img1):'/static/images/intell/renzheng_03.jpg'" mode="aspectFill"></image>
			<text class="iconfont iconnext-m"></text>
		</view>
		<view class="rz_li dis_flex aic ju_b" @tap="upimg" data-type="2">
			<view class="flex_1">身份证反面</view>
			<image :src="img2?getimg(img2):'/static/images/intell/renzheng_07.jpg'" mode="aspectFill"></image>
			<text class="iconfont iconnext-m"></text>
		</view>
		<view class="rz_li dis_flex aic ju_b" @tap="upimg" data-type="3">
			<view class="flex_1">手持证件照</view>
			<image :src="img3?getimg(img3):'/static/images/intell/renzheng_09.jpg'" mode="aspectFill"></image>
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
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
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
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
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
					token:that.loginDatas.token,
					truename:that.name,
					id_number:that.id_cord,
					phone:that.phone,
					id_front:that.img1,
					id_the_back:that.img2,
					id_in_hand:that.img3,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				var jkurl="/user/truename"
				service.P_post(jkurl, datas).then(res => {
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
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						service.wxlogin()
						console.log(datas)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
							
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
						title: '操作失败'
					})
				})
				
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
								
										/*if(datas.type==1){
											that.img1=tempFilePaths[0]
										}
										if(datas.type==2){
											that.img2=tempFilePaths[0]
										}
										if(datas.type==3){
											that.img3=tempFilePaths[0]
										}
										return*/
										
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
				service.wx_upload(imgs[i]).then(res => {
				
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						if(type==1){
							that.img1=datas
						}
						if(type==2){
							that.img2=datas
						}
						if(type==3){
							that.img3=datas
						}
						
						// var news1 = that.sj_img.length
						// if (news1 < 9 && i < imgs.length - 1) {
						// 	i++
						// 	that.upimg1(imgs, i)
						// }
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
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
			getimg(img) {
				return service.getimg(img)
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
	.rz_li input{
		text-align: right;
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
