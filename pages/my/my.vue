<template>
	<view>
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
				
			}
		},
		components:{business,user,intelligence},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName','loginDatas','xcx_status']),
		},
		methods: {
			...mapMutations(['set_xcx']),
			
		}
	}
</script>

<style>

</style>
