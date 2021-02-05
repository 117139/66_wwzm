<template>
	<view class="minh100">
	
		<view v-if="datas" class="xieyi_main" v-html="datas"></view>
		<!-- /*<view v-if="about_content" class="xieyi_main" v-html="get_fwb(about_content)"></view>
		<view v-else-if="type=='about'" class="xieyi_main" v-html="get_fwb(about_content)">
		</view>
		<view v-else-if="type=='yszc'" class="xieyi_main">
		</view>
		<view v-else-if="type=='sm'" class="xieyi_main"  >
		</view>*/ -->
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
			
			console.log(Option.type)
			
			
			if(Option.type=='yszc'){
				
				uni.setNavigationBarTitle({
					title:'隐私政策'
				})
				that.getdata('protocol')
			}
			if(Option.type=='zn'){
				uni.setNavigationBarTitle({
					title:'智能家居'
				})
				that.getdata('zn')
			}
			if(Option.type=='qs'){
				console.log(Option)
				uni.setNavigationBarTitle({
					title:'轻奢智能'
				})
				that.getdata('qs')
			}
			if(Option.type=='qw'){
				console.log(Option)
				uni.setNavigationBarTitle({
					title:'全屋智能'
				})
				that.getdata('qw')
			}
			
			
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
				console.log(keyword)
				var data = {
					type:keyword
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/homepage/menu'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						
						that.datas = datas
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
