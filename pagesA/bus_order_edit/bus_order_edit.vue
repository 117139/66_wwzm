<template>
	<view style="min-height: 100vh;background-color: #fafafa;">
		<view class="order_box">
			<view class="order_main">
				<view class="order_li">
					<view class="order_li_tit">工程名称</view>
					<view class="order_li_msg">
						<input v-model="gc_name" placeholder="请输入工程姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主名称</view>
					<view class="order_li_msg">
						<input v-model="yz_name" placeholder="请输入业主姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主联系电话</view>
					<view class="order_li_msg">
						<input v-model="yz_tel" placeholder="请输入业主联系电话" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主地址</view>
					<view class="order_li_msg">
						<input v-model="yz_address" placeholder="请输入业主地址" />
					</view>
				</view>
				<picker class="order_li" @change="bindPickerChange" :value="taocan_index" :range="taocan_list" range-key="name" data-type="1">
						<view class="order_li_tit">套内详单</view>
						<view class="order_li_msg">
							<input v-model="taocan_list[taocan_index].name" placeholder="请选择套餐" disabled="true" />
						</view>
				</picker>
				<view class="order_li">
					<view class="order_li_tit">负责人</view>
					<view class="order_li_msg">
						<input v-model="fzr_name" placeholder="请输入负责人姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">负责人联系方式</view>
					<view class="order_li_msg">
						<input v-model="fzr_tel" placeholder="请输入负责人联系方式" />
					</view>
				</view>
				 <picker  class="order_li" mode="date" :value="date" :start="startDate" :end="endDate"  data-type="2">
						<view class="order_li_tit">时间</view>
						<view class="order_li_msg">
							<input v-model="date" placeholder="请选择时间" disabled="true" />
						</view>
				</picker>
				<picker class="order_li" @change="bindPickerChange" :value="hetong_index" :range="hetong_list" range-key="name" data-type="3">
						<view class="order_li_tit">合同</view>
						<view class="order_li_msg">
							<input v-model="hetong_list[hetong_index].name" placeholder="请选择合同" disabled="true" />
						</view>
				</picker>
				<view class="order_li">
					<view class="order_li_tit">业主要求</view>
					<view class="order_li_msg">
						<input v-model="yz_yaoqiu" placeholder="请输入业主要求" />
					</view>
				</view>
			</view>
		</view>
		<view class="order_bottom"></view>
		<view class="order_bottom" style="position: fixed;">
			<view class="order_bottom_btn" @tap="sub">完成</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				gc_name:'',
				yz_name:'',
				yz_tel:'',
				yz_address:'',
				taocan_list:[
					{
						name:'套餐1',
						id:1
					},
					{
						name:'套餐2',
						id:2
					},
					{
						name:'套餐3',
						id:3
					},
					{
						name:'套餐4',
						id:4
					},
				],
				taocan_index:0,
				fzr_name:'',
				fzr_tel:'',
				date:currentDate,
				hetong_list:[
					{
						name:'合同1',
						id:1
					},
					{
						name:'合同2',
						id:2
					},
					{
						name:'合同3',
						id:3
					},
					{
						name:'合同4',
						id:4
					},
				],
				hetong_index:0,
				yz_yaoqiu:''
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			startDate() {
					return this.getDate('start');
			},
			endDate() {
					return this.getDate('end');
			}
		},
		onLoad(){
			that=this
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			sub(){
				if(!this.gc_name){
					uni.showToast({
						icon:'none',
						title:'请填写工程名称'
					})
					return
				}
				if(!this.yz_name){
					uni.showToast({
						icon:'none',
						title:'请填写业主姓名'
					})
					return
				}
				if(!this.yz_tel){
					uni.showToast({
						icon:'none',
						title:'请填写业主联系方式'
					})
					return
				}
				if(!this.yz_address){
					uni.showToast({
						icon:'none',
						title:'请填写业主地址'
					})
					return
				}
				if(!this.fzr_name){
					uni.showToast({
						icon:'none',
						title:'请填写负责人姓名'
					})
					return
				}
				if(!this.fzr_tel){
					uni.showToast({
						icon:'none',
						title:'请填写负责人联系方式'
					})
					return
				}
				if(!this.yz_yaoqiu){
					uni.showToast({
						icon:'none',
						title:'请填写业主要求'
					})
					return
				}
				var datas={
					yz_name:that.yz_name,
					yz_tel:that.yz_tel,
					yz_address:that.yz_address,
					taocan_list:that.taocan_list[that.taocan_index].id||0,
					fzr_name:that.fzr_name,
					fzr_tel:that.fzr_tel,
					date:that.date,
					hetong_list:that.hetong_list[that.hetong_index].id||0,
					yz_yaoqiu:that.yz_yaoqiu
				}
				console.log(datas)
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.currentTarget.dataset)
					console.log('picker发送选择改变，携带值为', e.target.value)
					var datas=e.currentTarget.dataset
					if(datas.type==1){ //套餐
						this.taocan_index = e.target.value
					}
					if(datas.type==2){ //时间
						this.date = e.target.value
					}
					if(datas.type==3){ //合同
						this.hetong_index = e.target.value
					}
					
			},
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();

					if (type === 'start') {
							year = year - 60;
					} else if (type === 'end') {
							year = year + 200;
					}
					month = month > 9 ? month : '0' + month;;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.order_box{
		width: 100%;
		padding:20upx 30upx 0;
	}
	.order_main{
		width: 100%;
		background: #fff;
		border-radius: 10upx;
		padding: 0 30upx;
	}
	.order_li{
		width: 100%;
		padding-top: 30upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.order_li_tit{
		font-size: 30upx;
		color: #222;
		line-height: 30upx;
	}
	.order_li_msg{
		height: 87upx;
	}
	.order_li_msg input{
		width: 100%;
		height: 87upx;
		font-size: 30upx;
	}
	
	.order_bottom {
		width: 100%;
		height: 180upx;
		padding-bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		bottom: 0;
		left: 0;
		z-index: 100;
	}

	.order_bottom_btn {
		width: 690upx;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #00A079;
		background: #FFFFFF;
		border-radius: 10px;
	}
</style>
