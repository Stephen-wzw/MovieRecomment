<template>
		<!-- 分类导航组件 -->
		<div class="container category-selector pt-1 pb-0">
		<!-- 分类1:类型 -->
			<div class="row" id="type-selector">
				<div class="col-1" id="selector-title">
					<span class="badge badge-success">类型</span>
				</div>
				<div class="col-11" id="selector-list">
					<ul>
						<!-- 默认选中tag"全部" -->
						<li>
							<div id="tag-box" class="onClick-div" @click="getType('all')">
								<a href="javascript:void(0);" class="text-decoration-none onClick-a">&nbsp;全部&nbsp;</a>
							</div>
						</li>
						<li v-for="(item,index) in typeTag" :key="index">
							<div id="tag-box" @click="getType(item.type)"><a href="javascript:void(0);" class="text-decoration-none ">&nbsp;{{item.type}}&nbsp;</a></div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 分类2:地区 -->
			<div class="row" id="area-selector">
				<div class="col-1" id="selector-title">
					<span class="badge badge-info">地区</span>
				</div>
				<div class="col-11" id="selector-list">
					<ul>
						<!-- 默认选中tag"全部" -->
						<li>
							<div id="tag-box" class="onClick-div" @click="getLocation('all')">
								<a href="javascript:void(0);" class="text-decoration-none onClick-a">&nbsp;全部&nbsp;</a>
							</div>
						</li>
						<li v-for="(item,index) in locationTag" :key="index">
							<div id="tag-box" @click="getLocation(item.location)"><a href="javascript:void(0);" class="text-decoration-none ">&nbsp;{{item.location}}&nbsp;</a></div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 分类3:时间 -->
			<div class="row" id="date-selector">
				<div class="col-1" id="selector-title">
					<span class="badge badge-secondary">时间</span>
				</div>
				<div class="col-11" id="selector-list">
					<ul style="border: none;">
						<!-- 默认选中tag"全部" -->
						<li>
							<div id="tag-box" class="onClick-div" @click="getTime('all')">
								<a href="javascript:void(0);" class="text-decoration-none onClick-a">&nbsp;全部&nbsp;</a>
							</div>
						</li>
						<li v-for="(item,index) in timeTag" :key="index">
							<div id="tag-box" @click="getTime(item.time)"><a href="javascript:void(0);" class="text-decoration-none ">&nbsp;{{item.time}}&nbsp;</a></div>
						</li>
					</ul>
				</div>
			</div>
		</div>		
</template>


<script>
import qs from 'qs'
import { EventBus } from "../../../event-bus";

export default {
	data(){
		return{
			typeTag:[
				{type:'剧情'},{type:'喜剧'},{type:'动作'},{type:'爱情'},
				{type:'科幻'},{type:'悬疑'},{type:'惊悚'},{type:'恐怖'},
				{type:'犯罪'},{type:'战争'},{type:'灾难'},{type:'传记'},
				{type:'历史'},{type:'武侠'},{type:'歌舞'}
			],
			locationTag:[
				{location:'大陆'},{location:'香港'},{location:'日本'},{location:'韩国'},
				{location:'美国'},{location:'法国'},{location:'英国'},{location:'德国'},
				{arlocationea:'意大利'},{location:'加拿大'},{location:'俄罗斯'},{location:'印度'},
				{location:'泰国'},{location:'台湾'},{location:'其他'}
			],
			timeTag:[
				{time:'2020'},{time:'2019'},{time:'2018'},{time:'2017'},
				{time:'2016'},{time:'2015'},{time:'2014'},{time:'2013'},
				{time:'2012'},{time:'2011'},{time:'2010'},{time:'00年代'},
				{time:'90年代'},{time:'更早'}
			],
			type:'all',
			location:'all',
			time:'all',
			page:1			//当前页码
		}
	},
	methods:{
		// 获取分类导航栏类型信息
		getType(name){
			this.type=name;
			EventBus.$emit("getMovie",this.type,this.location,this.time,this.page);
			EventBus.$emit("setPage",1);
		},
		// 获取分类导航栏地区信息
		getLocation(name){
			this.location=name;
			EventBus.$emit("getMovie",this.type,this.location,this.time,this.page);
			EventBus.$emit("setPage",1);
		},
		// 获取分类导航栏时间信息
		getTime(name){
			this.time=name;
			EventBus.$emit("getMovie",this.type,this.location,this.time,this.page);
			EventBus.$emit("setPage",1);
		}
  	}
}
</script>

<style lang="less" scoped>
.category-selector {
	padding: 0.625rem 0.625rem;
	border-radius: 0.625rem;
	border: 1px solid #a3a3a3;
	background-color: #f3f3f4;
}

#selector-title {
	margin: 0;
	padding: 0 1rem 0 1.5rem;
	font-size: 1.7rem;
}
#selector-title>.badge {
	margin-bottom: 0.5rem;
}

#selector-list>ul {
	margin: 0;
	padding: 0 0 0.6rem 0;
	border-bottom: 1px solid #a3a3a3;
}
#selector-list>ul>li {
	display: inline;
	list-style: none;
}
#selector-list>ul>li>div {
	display: inline-block;
	margin-right: 1rem;
	margin-left: 1.3rem;
	margin-top: 0.6rem;
	padding-bottom: 0.2rem;
}
#selector-list>ul>li>div>a {
	font-size: 1.1rem;
	color: black;
}
#selector-list>ul>li>div>a:hover {
	color: #007bff !important;
}

/* tag被选中的样式 */
#selector-list>ul>li>.onClick-div {
	border-radius: 7px;
	background-color: #fff;
}
#selector-list>ul>li>div>.onClick-a {
	color: #007bff;
}
body {
	/* height: 150rem; */
	padding-top: 5.875rem;
}
</style>
