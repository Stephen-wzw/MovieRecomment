<template>
<!-- 电影详情组件 -->
    <div>
		<div class="container">
			<div class="row">
				<div class="col-4" style="border-right: 2px dashed #c3c3c3;">
					<!-- 电影海报 -->
					<div id="img-box" class="mx-auto" style="width: 80%;">
						<img :src="detailMessage.pictureName" class="img-thumbnail">
					</div>
					<!-- 显示评分 -->
					<div class="card text-center w-75 mx-auto mt-3">
						<div class="card-body p-1">
							<h5 class="card-title m-0" style="font-size: 2.5rem;">{{detailMessage.score}}</h5>
						</div>
						<div class="card-footer p-1 text-muted">
							{{detailMessage.scorePeople}}人评分
						</div>
					</div>
				</div>
				<!-- 电影详细信息 -->
				<div class="col-8">
					<p><strong>片名：</strong>{{detailMessage.mName}}</p>
					<p><strong>类型：</strong>{{detailMessage.types}}</p>
					<p><strong>地区：</strong>{{detailMessage.location}}</p>
					<p><strong>年份：</strong>{{detailMessage.time}}</p>
					<p><strong>导演：</strong>{{detailMessage.director}}</p>
					<p><strong>编剧：</strong>{{detailMessage.screenWriter}}</p>
					
					<!-- 一般主演这部分的信息都比较长，可以做一个“更多”按钮，参考豆瓣https://movie.douban.com/subject/27119724/ -->
					<p><strong>主演：</strong>{{detailMessage.actor}}</p>
					
					<h5 id="Synopsis">剧情简介：</h5>
					<p style="text-indent: 2rem;">
						{{detailMessage.introduction}}
					</p>
				</div>
			</div>
		</div>
		
		<!-- 电影相关标签 -->
		<div class="container mt-4 py-2" id="Tags-box">
			<i class="fa fa-tags" aria-hidden="true">Tags</i>
			<span class="badge-pill alert-primary pb-1 ml-2" v-for="(item,index) in movieTags" :key="index">{{item.tag}}</span>
		</div>
    </div>
</template>

<script>
import $ from "jquery";
import Img from "../../assets/img/normal_poster3.webp"
import qs from 'qs'

export default {
    data(){
		return{
			// 电影详情信息
			detailMessage:{
				mId:1,
				pictureName:Img,
				mName:'Joker / 小丑',
				score:9.2,
				scorePeople:1024,
				types:'剧情 / 惊悚 / 犯罪',
				location:'美国 / 加拿大',
				time:'2019',
				director:'托德·菲利普斯',
				screenWriter:'托德·菲利普斯 / 斯科特·西尔弗 / 鲍勃·凯恩 / 比尔·芬格 / 杰瑞·罗宾逊',
				actor:'华金·菲尼克斯 / 罗伯特·德尼罗 / 马克·马龙 / 莎姬·贝兹 / 谢伊·惠格姆 / 弗兰西丝·康罗伊 / 布莱恩·考伦 / 布莱恩·泰里·亨利 / 布莱特·卡伦 / 道格拉斯·霍奇斯 / 格伦·弗莱施勒 / 比尔·坎普 / 乔什·帕斯 / 但丁·佩雷拉-奥尔森 / 玛丽·凯特·马拉特 / 迈克尔·本茨 / 莎珑·华盛顿 / 桑德拉·詹姆斯 / 托尼·赫德 / 曼德拉·贝拉米 / 乔·奥克曼 / 卡尔·伦德施泰特 / 米克·奥罗克 / 大卫·吉布森 / 伊万·罗萨多 / 安妮·比萨比亚 / 布莱斯·科里根 / 乔恩·道格拉斯·雷尼 / 艾恩斯利·丹恩 / 杰森·约翰·奇卡莱塞',
				introduction:'湿冷无望的哥谭市，卑微的亚瑟·弗兰克（华金·菲尼克斯 Joaquin Phoenix 饰）依靠扮演小丑赚取营生。与之相依为命的母亲患有精神疾病，而亚瑟深记母亲的教诲，无论遭受怎样的挫折都笑对人生，却因此让自己背负着莫大的压力，濒临崩溃。他梦想成为一名脱口秀演员，怎奈生活一次次将失望狠狠地砸在他的头上。不仅如此，他因意外丢掉了工作，偶然瞥见母亲的秘密，又使他心中燃起对那个与之地位悬殊却从未谋面的父亲的殷切渴望。命运习惯了事与愿违，空荡荡的地铁内，悲伤的小丑在无法自已的癫狂笑声中大开杀戒……'
			},
			movieTags:[
				{tag:'Joker'},
				{tag:'小丑'},
				{tag:'剧情'},
				{tag:'惊悚'},
				{tag:'犯罪'},
			],
			movieId:this.$route.query.mId,
		}
	},
	created(){
		
	},
	methods:{
		// 获取电影详情信息
		getMovieDetailMessage(){
			this.$axios.post("/api/movie",qs.stringify({
					mId: this.movieId
			}))
			.then((response) => {
				const {status,data: { code, success ,data}} = response;
				if (status === 200 && code === 1) {
					if (success) {
						this.detailMessage=data;
						this.movieTags=data.tags;
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
		}
	}
}
</script>


<style lang="less" scoped>
/* 电影详情部分 */
#Synopsis {
	padding: 5px;
	font-size: 1.2rem;
	font-weight: 700;
	border-radius: 5px;
	border: 1px solid #e1e1e2;
	background-color: #eeeeee;
}

/* 电影相关标签部分 */
#Tags-box {
	border-radius: 5px;
	border: 2px dotted #abd3f1;
}
#Tags-box span {
	cursor: pointer;
}
</style>
