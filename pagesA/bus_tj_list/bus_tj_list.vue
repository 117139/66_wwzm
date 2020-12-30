<template>
	<view>
		<view class="bus_my_list">
			<view class="bus_my_li">
			
				<view class="dis_flex my_table my_table_tit">
					<view class="my_td my_th">合同</view>
					<view class="my_td my_th">套数</view>
					<view class="my_td my_th">已完成</view>
					<view class="my_td my_th">价值</view>
				</view>
				<view style="width: 100%;height: 20upx;"></view>
				<view class="dis_flex my_table">
					<view class="my_td my_td1">合同2020-2</view>
					<view class="my_td my_td2">6</view>
					<view class="my_td my_td2">2</view>
					<view class="my_td my_td2">50万</view>
				</view>
				<view class="dis_flex my_table">
					<view class="my_td my_td1">合同2020-2</view>
					<view class="my_td my_td2">12</view>
					<view class="my_td my_td2">12</view>
					<view class="my_td my_td2">50万</view>
				</view>
				<view class="dis_flex my_table">
					<view class="my_td my_td1">合同2020-2</view>
					<view class="my_td my_td2">12</view>
					<view class="my_td my_td2">12</view>
					<view class="my_td my_td2">50万</view>
				</view>
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
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas','fj_data']),
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			
		}
	}
</script>

<style scoped>
.bus_my_list{
		position: relative;
		z-index: 10;
		/* margin-top: -40upx; */
		padding: 20upx 30upx;
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
</style>
