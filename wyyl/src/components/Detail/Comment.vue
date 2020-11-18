<template>
	<!-- 用户评论组件 -->
	<!-- 隐藏式评论+评分容器 -->
		<div class="container mt-3">
			<!-- 头部 -->
			<div class="row recommend-header mb-3">
				<div class="col-12">
					<h3><i class="fa fa-commenting" aria-hidden="true"></i>&ensp;影评</h3>
				</div>
			</div>
			<nav id="Review-Navbar" class="navbar navbar-light bg-light">
				<div class="navbar-brand">
					<img :src="userMessage.userimg" class="rounded-circle img-fluid" style="width: 2.8rem; height: 2.8rem;">
					{{userMessage.username}}
					<!-- 注册用户则在此处显示Username并显示正确头像 -->
				</div>
				<button v-if="!comShow" class="btn btn-info" type="button" data-target="#Review-Collapse" data-toggle="collapse">
					写下我的感想
					<!-- 游客用户无法评论，则button需要添加disabled属性  data-target="#Review-Collapse"   -->
				</button>
				<button v-if="comShow" class="btn btn-info" type="button" @click="loginTis()">
					写下我的感想
				</button>
			</nav>
			<!-- 本体 -->
			<div class="collapse" id="Review-Collapse">
				<form class="mt-2 p-3">
					<!-- 评分部分 -->
					<div class="form-group">
						<label for="Review-Range" class="badge badge-info p-3" style="font-size: 1.2rem; font-weight: 700;">
							我的评分：<span>{{userComment.score}}</span>
						</label>
						<input type="range" class="form-control-range" v-model="userComment.score" id="Review-Range" step="0.1" min="0" max="10">
					</div>
					<!-- 评论输入框部分 -->
					<div class="row">
						<div class="col-10 col-md-11">
							<textarea class="form-control" rows="4" placeholder="" v-model="userComment.comment"></textarea>
						</div>
						<div class="col-2 col-md-1 pl-0">
							<button class="btn btn-info" type="submit" style="width: 100%; height: 100%;" @click="publish()">
								发表<br>影评
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
</template>

<script>
import Img from '../../assets/img/user.png'
import { EventBus } from "../../../event-bus"

export default {
    data(){
		return{
			userMessage:{
				userId:0,
				userimg:Img,
				username:"游客用户"
			},
			userComment:{
				score:9.1,
				comment:'很好吃，已经看了三天三夜'
			},
			movieId:this.$route.query.mId,
			comShow:true,
		}
	},
	created(){
		this.login();
		// 监听用户评论栏用户登录状态
		EventBus.$on("checkLogin",()=>{
			this.login();
		});
		// 退出登录改变评论栏状态
		EventBus.$on("quitLogin",()=>{
			this.userMessage.userId=null;
			this.userMessage.username='游客用户';
			this.userMessage.userimg=Img;
			this.comShow=true;
		})
	},
	methods:{
		// 登录状态验证
		login(){
			if (sessionStorage.getItem("user")) {
				this.userMessage.userId=JSON.parse(sessionStorage.getItem("user")).userId;
				this.userMessage.username=JSON.parse(sessionStorage.getItem("user")).username;
				this.userMessage.userimg=JSON.parse(sessionStorage.getItem("user")).userimg;
				this.comShow=false;
			}else{
				this.comShow=true;
			}
		},
		loginTis(){
			this.$message({
                message: '请先登录！',
             	type: 'error'
            });
		},
		// 评论信息获取
		publishComment(){
			this.$axios.post("/api/comment",qs.stringify({
				userId:this.userMessage.userId,
				mId:this.movieId,
				score:this.userComment.score,
				comment:this.userComment.comment
			}))
			.then((response) => {
				const {status,data: { code, success }} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.$message({
							message: '发表成功',
							type: 'success'
						});
						EventBus.$emit("updateComment");
					}else{
						this.$message({
						message: '发布失败',
						type: 'error'
					});
				}            
				}else {
					this.$message({
						message: '服务器错误！',
						type: 'error'
					});
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
/* 隐藏式评论+评分部分 */
#Review-Navbar {
	border-radius: 5px;
	border: 1px solid #e1e1e2;
}

#Review-Collapse form {
	background-color: #f8f9fa;
	border-radius: 5px;
	border: 1px solid #e1e1e2;
}
</style>
