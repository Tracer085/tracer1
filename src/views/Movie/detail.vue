<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToback"></i>
        </Header>
	<div id="content" class="contentDetail" >
			 <div class="detail_list"> 
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.name}}</h2>
						<p>A Cool Fish</p>
						<p>评分：{{detailMovie.grade}}</p>
						<p>{{detailMovie.catgory}}</p>
						<p>{{detailMovie.nation}} / {{detailMovie.runtime}}分钟</p>
						<p>2018-11-16大陆上映</p>
					</div>
				</div>
			</div> 
			<div class="detail_intro" :class="['txt',{'over-hidden':!unfold}]" ref="textBox">
				<p ref="spanBox">{{detailMovie.synopsis}}</p>
			
				
			</div>
			<button class="btn" v-if="ifOver" @click="unfold = !unfold">{{unfold ? '收起' : '展开'}}</button>
			<div class="detail_player swiper-container" ref="detail_player" > 
				<p class="actors">演职人员</p>
				<ul class="swiper-wrapper">
					
					<li class="swiper-slide swiper-actors" v-for="(item,index) in detailMovie.actors" :key="index">
						
						<div>
							<img :src="item.avatarAddress" alt="">
						</div>
						<p>{{item.name}}</p>
						<p>{{item.role}}</p>
					</li>
					
				</ul>
			</div>
			<div class="detail_player swiper-container photo" ref="player" > 
				<p class="actors">剧照</p>
				<ul class="swiper-wrapper ">
					
					<li class="swiper-slide actors-photo" v-for="(item,index) in detailMovie.photos" :key="index">
						
						<div>
							<img :src="item" alt="">
						</div>
						
					</li>
					
				</ul>
			</div>
	</div>
	<div id="footer">
		<span>立即购票</span>
	</div>
    </div>
</template>
<script>
import Header from "@/components/Header"
import Vue from "vue"


export default {
	name : 'Detail',
	data(){
		return {
			detailMovie:{},
			ifOver:true,
			unfold:false
		}
	},
	components :{
		Header
		
	},
	props:{
		content:{
			type:String,
			default:''
		}
	},
	props:   ['movieId'],
	methods :{
		handleToback(){
			this.$router.back();
		}
	},
	mounted (){
		// console.log( this.movieId );
		// console.log(this.movieId);
		console.log('要id获取详情信息', )
		// this.ifOver=this.$refs.spanBox.offsetHeight>this.$refs.textBox.offsetHeight
		this.axios({
			url:'https://m.maizuo.com/gateway?filmId='+this.$route.params.movieId+'&k=9613356',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1611736763401648161652737","bc":"110100"}',
				'X-Host': 'mall.film-ticket.film.info'
			}
		}).then(res=>{
			console.log(res.data)
			var msg=res.data.msg;
			if(msg==='ok'){
				this.detailMovie=res.data.data.film;
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player,{
						slidesPerView:'auto',
						freeMode:true,
						freeModeSticky:true
					})
					new Swiper(this.$refs.player,{
						slidesPerView:'auto',
						freeMode:true,
						freeModeSticky:true
					})
				})
			}
		});
	}
}
</script>
<style lang="scss" scoped>


#detailContrainer{position: absolute;left: 0;top: 0;z-index: 100;width: 100%;min-height: 100%;background: white;}
#detailContrainer.slide-enter-active{animation: 0.5s slideMove;}
@keyframes slideMove{
	0%{transform: translateX(100%);}
	100%{transform: translateX(0%);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 25px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ margin-bottom: 5px;}
.detail_player  .swiper-actors img{width: 80px;height: 80px; object-fit: cover;}
.detail_player .actors-photo:not(:first-child){margin-left: 50px;}
.detail_player .actors-photo img{width: 140px;height: 90px;object-fit: cover;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
.txt{font-size: 14px;color: #333;margin-bottom: 5px;}
.over-hidden{display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.btn{font-size:14px;color: black;background: white;outline: none;border: red 1px solid;position: absolute;right: 20px;border-radius: 20%;}
.actors{font-size: 16px;font-weight: 600;}
.photo{top: 10px;position: relative;}
#footer{position: absolute;bottom: 0;width: 100%;height: 60px;background: #e54847;text-align: center;line-height: 60px;color: white;}
</style>