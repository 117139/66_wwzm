<template>
	<view class="content_wrap">
	
		<view v-if="about_content" class="xieyi_main" v-html="get_fwb(about_content)"></view>
		<view v-else-if="type=='about'" class="xieyi_main" v-html="get_fwb(about_content)">
			<image src="../../static/images/about_03.jpg" style="width: 690upx; height: 1130upx;" mode="aspectFill"></image>
		</view>
		<view v-else-if="type=='yszc'" class="xieyi_main">
		
		</view>
		<view v-else-if="type=='sm'" class="xieyi_main"  >
			
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
				title:'隐私协议',
				type:0,
				datas:''
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
			
			
			if(Option.type=='yszc'){
				that.type=Option.type
				that.title='隐私政策'
				uni.setNavigationBarTitle({
					title:'隐私政策'
				})
				this.getdata('ysxy')
			}
			if(Option.type=='about'){
				that.type=Option.type
				that.title='关于我们'
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
				console.log(that.about_content)
			}
			if(Option.type=='sm'){
				that.type=Option.type
				that.title='使用说明'
				uni.setNavigationBarTitle({
					title:'使用说明'
				})
				// this.getdata('sysm')
			}
			if(Option.type==3){
				that.type=Option.type
				that.title='用户协议'
				// this.getdata('yhxy')
			}
			if(Option.type==4){
				that.type=Option.type
				that.title='自动续费服务规则'
			}
			// this.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','about_content']),
		},
		
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data = {
					keyword:keyword
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/getClause'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						that.datas = datas[0].content
						console.log(datas)
							
							
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
			}
		}
	}
</script>

<style scoped>
	.cu-custom{
		border-bottom: 1px solid #DBDBDB;
	}
	.content_wrap{
		width: 100%;
		min-height: 100%;
		background: #fff;
	}
	 .xieyi_main{
		 width: 100%;
		 padding: 30upx;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
		 font-size: 28upx;
		 color: #333;
	 }
	 
</style>
