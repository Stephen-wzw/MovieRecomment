<template>
<!-- 相似电影推荐容器 -->
		<div class="container mt-4">
			<!-- 顶部 -->
			<div class="row recommend-header mb-3">
				<div class="col-12">
					<h3><i class="fa fa-clone" aria-hidden="true"></i>&ensp;相似推荐</h3>
				</div>
			</div>
			<!-- 主体 -->
			<!-- 电影推荐栏 -->
			<div class="row">
				<div class="col-6 col-md-4 col-lg-3 mb-3" v-for="(item,index) in movieSimilar" :key="index">
					<div class="card mx-auto" style="width: 80%; height: 95%;">
						<div class="p-0" style="height: 85%;">
							<a href="javasrcipt:;" @click="detailJump(item.mId)"><img class="card-img-top img-fluid" :src="item.picture" style="height: 100%;"></a>
						</div>
						<div class="card-body p-2">
							<h4 class="card-title text-center mb-1">{{item.mName}}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import Img from "../../assets/img/normal_poster3.webp"

export default {
	data(){
		return{
			movieSimilar:[
				{mId:1,mName:'何以为家',picture:Img},
				{mId:1,mName:'绿皮书',picture:Img},
				{mId:1,mName:'Joker',picture:Img},
				{mId:1,mName:'调音师',picture:Img},
			],
			movieId:this.$route.query.mId,
		}
	},
	methods:{
		// 获取相似电影推荐信息
		getMovieSimilar(){
			this.$axios.post("/api/moviesSimilar",qs.stringify({
					mId: this.movieId
			}))
			.then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.movieSimilar=data;
					}else{
						this.$message({
						message: '信息错误,获取图片失败！',
						type: 'error'
					});
				}            
				}else {
					this.$message({
						message: '服务器错误,获取图片失败！',
						type: 'error'
					});
				}
			})
		},
		// 点击电影海报设置路由电影id并跳转到电影详情页面
		detailJump(movieId){
			this.$router.push({
				path: "/detail",
				query: {         //参数携带方式
				mId: movieId
				}
			});
		}
	}
    
}
</script>


<style lang="less" scoped>
.recommend-header {
	border-bottom: 2px solid #ccc;
}

.card-body>.card-title {
	font-size: 1.3rem;
}
.card-body>.card-text {
	font-size: 1rem;
	color: #00A4FF;
}
</style>
