<template>
	<view>
		<view v-if="xcx_status!=2" class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<!-- <image class="head_box_img" src="/static/images/business/my_bg_01.jpg" mode="aspectFill"></image> -->
			<view class="my_tit_box" :style="style1">
				<!-- 个人中心 -->
				万屋智能
			</view>
		</view>
		<business v-if="xcx_status==0"></business>
		<user v-if="xcx_status==1"></user>
		<intelligence v-if="xcx_status==2"></intelligence>
	</view>
</template>

<script>
	import business from './components/business.vue'
	import user from './components/user.vue'
	import intelligence from './components/intelligence.vue'
	
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				PageScroll: '',
			}
		},
		components:{business,user,intelligence},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas','xcx_status']),
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
			
			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;
			
				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;
			
				return style
			}
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		onLoad() {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShareAppMessage(res) {
			
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			return {
			  title: '万屋智能',
			  path: '/pages/share/share?type=fwcz&id='+res.target.dataset.id,
			  success: function (res) {
			    console.log('成功', res)
			  }
			}
		},
		methods: {
			...mapMutations(['set_xcx']),
			
		}
	}
</script>

<style scoped>
	.head_box {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		/* text-align: center; */
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		
		color: rgba(0,0,0,0);
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
		height: 417upx;
		left: 0;
		right: 0;
	}
	.my_tit_box {
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
	.cur_H {
		background: #fff;
		color: #333;
	}
</style>
