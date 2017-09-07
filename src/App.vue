<template>
  <div id="app">
    <mu-appbar class="appbar" v-bind:zDepth="0">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button label="我的" class="demo-flat-button" to="/me"></mu-flat-button>
      <mu-flat-button label="发现" class="demo-flat-button" to="/"></mu-flat-button>
      <mu-flat-button label="动态" class="demo-flat-button" to="/dynamic"></mu-flat-button>
      <mu-icon-button icon="search" slot="right"/>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data:function () {
    return {
      curBtn:'recents',
      activeTab:'tab1',
    };
  },
  methods:{
    handleTabChange:function (val) {
      this.activeTab=val;
    }
  }
}
</script>
<style>
.clearfix:{zoom:1;}
.clearfix:after{content:".";display:block;height:0;clear:both;}
.center{
  position:fixed;
  top:50%;left:50%;
  -webkit-transform:translate(-50%,-50%);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
/*  margin-top: 60px;*/
  padding:56px 0 56px 0;
}
.appbar{
  position:fixed;
  top:0;
  display:flex;
  z-index:5;  
}
</style>
