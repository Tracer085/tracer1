<template>
    <div id="main">
        <Header  title="Tracer 我的"/>

        <TabBar />
        <div id="content">
           <Login />
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header"
import TabBar from "@/components/TabBar"
import Login from "@/components/Login"
   export default {
       name:'Mine',
       components:{
           Header,
           TabBar,
           Login
       }
   } 
</script>

<style>

</style>