<template>
    <!-- 电影详情及评论页面 -->
    <div id="app">
        <Navigation></Navigation>
        <Login></Login>
        <Logon></Logon>
        <Movie></Movie>
        <Similar></Similar>
        <Comment></Comment>
        <CommentList></CommentList>
        <End></End>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'
import Movie from '../components/Detail/Movie'
import Similar from '../components/Detail/Similar'
import Comment from '../components/Detail/Comment'
import CommentList from '../components/Detail/CommentList'
import End from '../components/End'
import Login from '../components/Login'
import Logon from '../components/Logon'

export default {
    name:'app',
    components:{
        Navigation,
        Movie,
        Similar,
        Comment,
        CommentList,
        End,
        Login,
        Logon
    }
    
}
</script>

<style lang="less" scoped>

</style>
