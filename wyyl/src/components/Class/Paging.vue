<template>
		<!-- 分页组件 -->
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
</template>

<script>
import {mapState} from 'vuex'
import { EventBus } from "../../../event-bus";

export default {
	data(){
		return{
			page:1,
			pageTotal:10,
		}
	},
	created(){
		EventBus.$on("getPageTotal",(pages)=>{
			this.pageTotal=pages;
		}),
		EventBus.$on("setPage",(page)=>{
			this.page=page;
    	})
	},
	methods:{
		getpage(name){
			if(name!=this.page){
				this.page=name;
				EventBus.$emit("getPageMovie",this.page);
			}
		},
		pageClick(){
			EventBus.$emit("getPageMovie",this.page);
		}
	},
	computed:{
		// 根据总页数和当前页码计算分页属性
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
</script>


<style lang="less" scoped>

</style>
