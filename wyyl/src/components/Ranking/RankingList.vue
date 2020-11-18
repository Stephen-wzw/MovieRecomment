<template>
	<!-- 电影排行榜组件 -->
	<div>
        <!-- 排行榜分类 -->
		<div class="container ranking-type pb-2">
			<nav class="nav nav-pills nav-justified">
				<a class="nav-link active" href="javascript:;" @click="getScoreRankingMessage()">评分TOP10</a>
				<a class="nav-link" href="javascript:;" @click="getBoxOfferRankingMessage()">票房TOP10</a>
				<a class="nav-link" href="javascript:;" @click="getPopularityRankingMessageMonth()">人气TOP10</a>
			</nav>
		</div>

		<!-- 排行榜列表 -->
		<div class="container">
			<!-- 第一名 -->
			<div class="row" v-for="(item,index) in rankingMessage" :key="index">
				<div class="col-12 col-lg-1 ranking-box mt-3"  style="min-height: 3rem;">
					<div id="ranking">
						<strong>{{index+1}}</strong>st
					</div>
				</div>
				<a class="col-4 col-lg-2 img-box pb-2 mt-3" href="javasrcipt:;" @click="detailJump(item.mId)">
					<img :src="item.pictureName" class="img-fluid" style="width: 100%;">
				</a>
				<div class="col-8 col-lg-9 content-box mt-3">
					<h4 style="font-size: 1.6rem;">
						{{item.mName}}
						<div class="float-right mt-2 mr-1" id="movie-score">评分: {{item.score}}</div>
						<div class="float-right mt-2 mr-3" id="movie-box">票房: {{item.boxOffice}}万元</div>
						<div class="float-right mt-2 mr-3" id="movie-pop">人气: {{item.popularity}}</div>

						<div class="float-right mt-2 mr-1" id="movie-score">评分：{{item.score}}</div>
					</h4>
					<div class="row">
						<div class="col-4"><strong>类型：</strong>{{item.types}}</div>
						<div class="col-4"><strong>地区：</strong>{{item.location}}</div>
						<div class="col-4"><strong>年份：</strong>{{item.time}}</div>
					</div>
					<h5 class="mt-3">剧情简介：</h5>
					<p style="text-indent: 2rem;">
						{{item.introduction}}
					</p>
				</div>
			</div>					
		</div>
	</div>   
</template>

<script>
import Img from "../../assets/img/normal_poster3.webp"
import $ from 'jquery'

export default {
    data(){
        return{
			// 电影排行榜信息
            rankingMessage:[
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
                {pictureName:Img,mId:1,mName:'Joker',popularity:1024,boxOffice:2048,score:10,types:'',location:'',time:'',introduction:''},
            ]
        }
	},
	created(){
		this.getScoreRankingMessage();
	},
	methods:{
		// 获取评分排行榜电影信息
		getScoreRankingMessage(){
			this.$axios.get("/api/scoreTop").then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.rankingMessage=data;
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
		// 获取票房排行榜电影信息
		getBoxOfferRankingMessage(){
			this.$axios.get("/api/boxOfferTop").then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.rankingMessage=data;
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
		// 获取人气排行榜电影信息
		getPopularityRankingMessageMonth(){
			this.$axios.get("/api/popularityTop").then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.rankingMessage=data;
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
		// 电影详情跳转
		detailJump(movieId){
			this.$router.push({
				path: "/detail",
				query: {         //参数携带方式
				mId: movieId
				}
			});
		}
	}
};
$(function () {
	$('.ranking-type>.nav>.nav-link').click(function() {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
})
</script>


<style lang="less" scoped>
.ranking-type {
	border-bottom: 1px solid #a3a3a3;
}
.nav>a {
	font-weight: 700;
}
.ranking-box {
	position: relative;
	border-radius: 10px;
	background-color: #d0ebef;
}
#ranking {
	position: absolute;
	left: 50%;
	margin-left: -1.5rem;
	top: 50%;
	margin-top: -1.3125rem;
	font-size: 2rem;
	
}

.img-box {
	border-bottom: 1px solid #C5C5C5;
}

.content-box {
	border-bottom: 1px solid #C5C5C5;
}
.content-box>h5 {
	font-size: 1rem;
	font-weight: 700;
}

#movie-score {
	font-size: 1.05rem;
	font-weight: 700;
	color: #28a745;
}

#movie-box {
	font-size: 1.05rem;
	font-weight: 700;
	color: #17a2b8;
}

#movie-pop {
	font-size: 1.05rem;
	font-weight: 700;
	color: #dc3545;
}

</style>

