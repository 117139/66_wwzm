<template>
	<view class="login_bg">
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" ><image class="login_tit" src="/static/images/tit.png" mode="aspectFit"></image></block>
		</cu-custom> -->
		<view class="login_box dis_flex_c ju_c aic">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
		</view>
		<view class="dis_flex aic ju_c login_tip">登录表示您同意<text @tap="jump" data-url="/pagesA/about/about?type=yszc">《法律声明和隐私政策》</text></view>
		<view class="dis_flex aic ju_c login_btn">
			<button class='bottom'  open-type="getUserInfo"
			lang="zh_CN" @getuserinfo="getUserInfo">
				<image class="wx_icon" src="/static/images/wx.png"></image>
				微信用户一键登录
			</button>
		</view>
		<view class="dis_flex aic ju_c goback_btn" @tap="goback()">返回</view>
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
				canIUse: uni.canIUse('button.open-type.getUserInfo')
			}
		},	
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			...mapMutations(['wxshouquan','login']),
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
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.oauth('weixin');
				} else {
					uni.showToast({
						icon:'none',
						title:'欧哦，登录失败～'
					})
				}
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						console.log(res)
						uni.getUserInfo({
							provider: value,
							success: (e) => {
							
								// #ifdef MP-WEIXIN
								console.log('小程序口', e)
								// this.wxshouquan(e.userInfo)
								service.wxlogin(1)
			
								// #endif
			
							},
							fail: (err) => {
								console.log('登录失败', err)
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			bindGetUserInfo: function(e) {
				var that =this
			  if (e.detail.userInfo) {
			    //用户按了允许授权按钮后需要处理的逻辑方法体
			    console.log(e.detail.userInfo)
					service.wxlogin(1)
					
			    uni.setStorageSync('userInfo', e.detail.userInfo)
			  } else {
			    //用户按了拒绝按钮
			    uni.showModal({
			      title: '警告',
			      content: '您点击了拒绝授权，将无法登录小程序，请点击返回授权!!!',
			      showCancel: false,
			      confirmText: '返回授权',
			      success: function(res) {
			        if (res.confirm) {
			          console.log('用户点击了“返回授权”')
			        }
			      }
			    })
			  }
			},
			goback(){
			  uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	
	page{
		background: #f4f8fb;
	}
	.login_bg{
		height: 100vh;
		background: #f4f8fb;
	}
	.login_box{
		width: 100%;
		height: 650upx;
		font-size: 36upx;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo{
		width: 200upx;
		height:200upx;
		margin-bottom: 25upx;
	}
	.login_tip{
		font-size: 26upx;
		color: #999;
	}
	.login_btn{
		width: 100%;
		margin-top: 40upx;
	}
	.login_btn button{
		width: 690upx;
		height: 88upx;
		background: #1AAC19;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
	}
	.wx_icon{
		width: 53upx;
		height: 43upx;
		margin-right: 30upx;
	}
	.goback_btn{
		width: 690upx;
		height: 95upx;
		margin: 30px auto;
		background: #fff;
		border-radius: 95upx;
		border: 1px solid #eee;
	}
</style>
