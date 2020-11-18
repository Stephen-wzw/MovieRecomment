<template>
	<!-- 电影相关评论组件 -->
	<div>
    <!-- 评论列表容器 -->
		<!-- 分类 -->
		<div class="container review-type mt-3 pb-2">
			<nav class="nav nav-pills nav-justified">
				<a class="nav-link active" href="javasrctip:;" @click="hot=true,getHotComments()">最受欢迎的</a>
				<a class="nav-link" href="javasrctip:;" @click="hot=false,getNewComments()">最新发布的</a>
			</nav>
		</div>
		<!-- 列表 -->
		<div class="container">
			<ul class="list-unstyled">
				<!-- 评论1 -->
				<li class="media my-3" v-for="(item,index) in comments" :key="index">
					<!-- 用户头像 -->
					<img class="rounded-circle img-fluid mr-3" src="" style="width: 2.8rem; height: 2.8rem;">
					<div class="media-body">
						<!-- 用户名 -->
						<h5 class="mt-0 mb-1">{{item.username}}</h5>
						<!-- 评论内容 -->
						{{item.comment}}
						<p class="mb-2">
							<!-- 评论时间 -->
							<small class="text-muted">{{item.time}}</small>
							<!-- 点赞图标+点赞数 -->
							<a class="fa fa-thumbs-up mt-1 mr-2 float-right">&nbsp;{{item.good}}</a>
							<!-- 未点赞图标用类名fa-thumbs-o-up表示，已点赞图标用类名fa-thumbs-up表示 -->
						</p>
					</div>
				</li>
			</ul>
		</div>
		<!-- 分页导航按钮 -->
		<nav class="mt-1" aria-label="Page navigation">
			<ul class="pagination justify-content-center">
				<!-- 上一页按钮 若当前页为第一页则用类名disabled禁用该按钮 -->
				<li class="page-item" v-if="page>1" @click="page--,pageClick()">
					<a class="page-link" href="javasrcipt:;" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span class="sr-only">Previous</span>
					</a>
				</li>
				<li class="page-item" v-if="page==1">
					<a class="page-link" href="javasrcipt:;" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span class="sr-only">Previous</span>
					</a>
				</li>
				<!-- 具体页数 当前页用类名active表示 -->
				<li :class="index==page?'page-item active':'page-item'" v-for="index in indexs" :key="index" @click="getpage(index)">
					<a class="page-link" href="javasrcipt:;">{{index}}</a>
				</li>
				<!-- 下一页按钮 若当前页为最后一页则用类名disabled禁用该按钮 -->
				<li class="page-item" v-if="page!=pageTotal" @click="page++,pageClick()">
					<a class="page-link" href="javasrcipt:;" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span class="sr-only">Next</span>
					</a>
				</li>
				<li class="page-item" v-if="page==pageTotal">
					<a class="page-link" href="javasrcipt:;" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span class="sr-only">Next</span>
					</a>
				</li>
				<li class="page-item disabled" style="margin-left:40px">
					<a class="page-link" href="javasrcipt:;">
						共{{this.pageTotal}}页
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import $ from 'jquery'
import { EventBus } from "../../../event-bus"

export default {
	data(){
		return{
			comments:[
				{userId:1,username:'Username',userPicture:'',comment:'很好看，已经买了一车了',time:'2020-11-15 19:30',good:666},
				{userId:1,username:'Username',userPicture:'',comment:'很好看，已经买了一车了',time:'2020-11-15 19:30',good:666},
				{userId:1,username:'Username',userPicture:'',comment:'很好看，已经买了一车了',time:'2020-11-15 19:30',good:666},
			],
			page:1,
			pageTotal:10,
			movieId:this.$route.query.mId,
			hot:true,
		}
	},
	created(){
		EventBus.$on("updateComment",()=>{
			if(this.hot){
				this.getHotComments();
			}else{
				this.getNewComments();
			}
		});
	},
	methods:{
		// 获取热门评论
		getHotComments(){
			alert(this.hot);
			this.$axios.post("/api/hotComments",qs.stringify({
					mId: this.movieId,
					page: this.page,
			}))
			.then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.comments=data;
						this.pageTotal=data.pages;
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
		// 获取最新评论
		getNewComments(){
			alert(this.hot);
			this.$axios.post("/api/newComments",qs.stringify({
					mId: this.movieId,
					page: this.page,
			}))
			.then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.comments=data;
						this.pageTotal=data.pages;
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
		// 当前页码改变获取对应状态的评论信息
		getpage(name){
			if(name!=this.page){
				this.page=name;
				if(this.hot){
					this.getHotComments();
				}else{
					this.getNewComments();
				}
			}
		},
		// 分页点击获取对应评论信息
		pageClick(){
			if(this.hot){
				this.getHotComments();
			}else{
				this.getNewComments();
			}
		}
	},
	computed:{
		indexs:function(){
			var left = 1;
			var right = this.pageTotal;
			var ar = [];
			if(this.pageTotal>=5){
				if(this.page>3&&this.page<this.pageTotal-2){
					left = this.page-2;
					right = this.page+2;
				}else{
					if(this.page<=3){
						left=1;
						right=5;
					}else{
						right=this.pageTotal;
						left=this.pageTotal-4;
					}
				}
			}
			while(left<=right){
				ar.push(left);
				left++;
			}
			return ar;
		}
	}  
}

$(function() {
	// 实时返回评分条的值
	setInterval(function() {
		$("#Review-Collapse label span").text($("#Review-Range").val());
	}, 0.01);

	// 选中某个评论分类时，其样式改变，同时其他分类恢复原状
	$('.review-type>.nav>.nav-link').click(function() {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
})
</script>

<style lang="less" scoped>
.review-type {
	border-bottom: 1px solid #a3a3a3;
}

.review-type nav a {
	font-size: 1.2rem;
	font-weight: 700;
}

.media-body {
	border-bottom: 1px solid #A3A3A3;
}

.media-body p a {
	text-decoration: none;
	cursor: pointer;
}
</style>
