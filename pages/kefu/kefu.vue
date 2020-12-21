<template>
	<view class="dis_flex aic ju_c wrap_box">
		
			<view class="kf_btn" style="position: relative;">
				<button type="default" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;opacity: 0;z-index: 10;" open-type="contact"></button>
				联系客服
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.wrap_box{
		width: 100%;
		min-height: 100vh;
	}
	.kf_btn{
		width: 690upx;
		height: 89upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
		background: #11A078;
	}
</style>
