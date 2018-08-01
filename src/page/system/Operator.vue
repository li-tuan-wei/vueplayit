<template>
  <div style="margin-top: 10px" v-loading="fullloading">
    <div style="margin-bottom: 10px;display: flex;justify-content: center;align-items: center">
      <el-input
        placeholder="默认展示部分用户，可以通过用户名搜索更多用户..."
        prefix-icon="el-icon-search"
        size="small"
        style="width: 400px;margin-right: 10px"
        v-model="keywords">
      </el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left">
      <el-card style="width: 350px;margin-bottom: 20px" v-for="(item,index) in operators" :key="item.id"
               v-loading="cardLoading[index]">
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
          <el-button type="text"
                     style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                     icon="el-icon-delete" @click="deleteOperator(item.id)"></el-button>
        </div>
        <div>
          <div style="width: 100%;display: flex;justify-content: center">
            <img :src="item.userface" alt="item.name" style="width: 70px;height: 70px;border-radius: 70px">
          </div>
          <div style="margin-top: 20px">
            <div><span class="user-info">用户名:{{item.name}}</span></div>
            <div><span class="user-info">手机号码:{{item.phone}}</span></div>
            <div><span class="user-info">电话号码:{{item.telephone}}</span></div>
            <div><span class="user-info">地址:{{item.address}}</span></div>
            <div class="user-info" style="display: flex;align-items: center;margin-bottom: 3px">
              用户状态:
              <el-switch
                style="display: inline;margin-left: 5px"
                v-model="item.enabled"
                active-color="#13ce66"
                inactive-color="#aaaaaa"
                active-text="启用"
                :key="item.id"
                @change="switchChange(item.enabled,item.id,index)"
                inactive-text="禁用">
              </el-switch>
            </div>
            <div class="user-info">
              用户角色:
              <el-tag
                v-for="role in item.roles"
                :key="role.id"
                type="success"
                size="mini"
                style="margin-right: 5px"
                :disable-transitions="false">{{role.nameZh}}
              </el-tag>
              <el-popover
                v-loading="eploading[index]"
                placement="right"
                title="角色列表"
                width="200"
                @hide="updateOperatorRoles(item.id,index)"
                :key="item.id"
                trigger="click">
                <el-select v-model="selRoles" multiple placeholder="请选择角色">
                  <el-option
                    v-for="ar in allRoles"
                    :key="ar.id"
                    :label="ar.nameZh"
                    :value="ar.id">
                  </el-option>
                </el-select>
                <el-button type="text" icon="el-icon-more" style="color: #09c0f6;padding-top: 0px" slot="reference"
                           @click="loadSelRoles(item.roles,index)" :disabled="moreBtnState"></el-button>
<!--                <i class="el-icon-more" style="color: #09c0f6;cursor: pointer" slot="reference"
                   @click="loadSelRoles(item.roles,index)" disabled="true"></i>-->
              </el-popover>
            </div>
            <div><span class="user-info">备注:{{item.remark}}</span></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        keywords: '',
        fullloading: false,
        operators: [],
        cardLoading: [],
        eploading: [],
        allRoles: [],
        moreBtnState:false,
        selRoles: [],
        selRolesBak: []
      }
    },
    mounted: function () {
      this.initCards();
      this.loadAllRoles();
    },
    methods: {
      searchClick(){
        this.initCards();
        this.loadAllRoles();
      },
      updateOperatorRoles(operatorId, index){
        this.moreBtnState = false;
        var _this = this;
        if (this.selRolesBak.length == this.selRoles.length) {
          for (var i = 0; i < this.selRoles.length; i++) {
            for (var j = 0; j < this.selRolesBak.length; j++) {
              if (this.selRoles[i] == this.selRolesBak[j]) {
                this.selRolesBak.splice(j, 1); //删除数组j位置处的值
                break;
              }
            }
          }
          if (this.selRolesBak.length == 0) {
            return;
          }
        }
        this.eploading.splice(index, 1, true);  //将数组第index位的值设置为true
        var responseData = {"msg":"更新成功!","status":"success"};
        _this.eploading.splice(index, 1, false);
        _this.$message({type: responseData.status, message: responseData.msg});
        if (responseData.status == 'success') {
          _this.refreshOperator(operatorId, index);
        }
      },
      refreshOperator(operatorId, index){
        var _this = this;
        _this.cardLoading.splice(index, 1, true);
        var responseData = {"id":5,"name":"李白","phone":"18568123489","telephone":"029-82123434","address":"海口美兰","enabled":false,"username":"libai","remark":null,"roles":[{"id":1,"name":"ROLE_manager","nameZh":"部门经理"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"}],"userface":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514093920321&di=913e88c23f382933ef430024afd9128a&imgtype=0&src=http%3A%2F%2Fp.3761.com%2Fpic%2F9771429316733.jpg"};
        _this.cardLoading.splice(index, 1, false)
        _this.operators.splice(index, 1, responseData);
      },

      loadSelRoles(operatorRoles, index){
        this.moreBtnState = true;
        this.selRoles = [];
        this.selRolesBak = [];
        operatorRoles.forEach(role=> {
          this.selRoles.push(role.id)
          this.selRolesBak.push(role.id)
        });
      },
      loadAllRoles(){
        var _this = this;
        var responseData = [{"id":1,"name":"ROLE_manager","nameZh":"部门经理"},{"id":2,"name":"ROLE_personnel","nameZh":"人事专员"},{"id":3,"name":"ROLE_recruiter","nameZh":"招聘主管"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"},{"id":5,"name":"ROLE_performance","nameZh":"薪酬绩效主管"},{"id":13,"name":"ROLE_test2","nameZh":"测试角色2"},{"id":14,"name":"ROLE_test1","nameZh":"测试角色1"}];
        _this.allRoles = responseData;
        _this.fullloading = false;
      },
      switchChange(newValue, operatorId, index){
        var _this = this;
        _this.cardLoading.splice(index, 1, true);

        var responseData = {"msg":"更新成功!","status":"success"};

        _this.cardLoading.splice(index, 1, false);

        _this.$message({type: responseData.status, message: responseData.msg});

        _this.refreshOperator(operatorId, index);

      },
      initCards(){
        this.fullloading = true;
        var _this = this;
        var searchWords;
        if (this.keywords === '') {
          searchWords = 'all';
        } else {
          searchWords = this.keywords;
        }
        var responseData = [{"id":5,"name":"李白","phone":"18568123489","telephone":"029-82123434","address":"海口美兰","enabled":true,"username":"libai","remark":null,"roles":[{"id":1,"name":"ROLE_manager","nameZh":"部门经理"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"},{"id":13,"name":"ROLE_test2","nameZh":"测试角色2"}],"userface":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514093920321&di=913e88c23f382933ef430024afd9128a&imgtype=0&src=http%3A%2F%2Fp.3761.com%2Fpic%2F9771429316733.jpg"},{"id":10,"name":"韩愈","phone":"18568123666","telephone":"029-82111555","address":"广州番禺","enabled":true,"username":"hanyu","remark":null,"roles":[{"id":3,"name":"ROLE_recruiter","nameZh":"招聘主管"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"}],"userface":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1406745149,1563524794&fm=27&gp=0.jpg"},{"id":11,"name":"柳宗元","phone":"18568123377","telephone":"029-82111333","address":"广州天河","enabled":true,"username":"liuzongyuan","remark":null,"roles":[{"id":3,"name":"ROLE_recruiter","nameZh":"招聘主管"},{"id":2,"name":"ROLE_personnel","nameZh":"人事专员"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"},{"id":5,"name":"ROLE_performance","nameZh":"薪酬绩效主管"}],"userface":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515233756&di=0856d923a0a37a87fd26604a2c871370&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-27%2F041716704.jpg"},{"id":12,"name":"曾巩","phone":"18568128888","telephone":"029-82111222","address":"广州越秀","enabled":true,"username":"zenggong","remark":null,"roles":[{"id":4,"name":"ROLE_train","nameZh":"培训主管"}],"userface":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517070040185&di=be0375e0c3db6c311b837b28c208f318&imgtype=0&src=http%3A%2F%2Fimg2.soyoung.com%2Fpost%2F20150213%2F6%2F20150213141918532.jpg"},{"id":13,"name":"刘德华","phone":"1899999888","telephone":"029-86666222","address":"香港","enabled":true,"username":"liudehua","remark":"天王","roles":[{"id":4,"name":"ROLE_train","nameZh":"培训主管"}],"userface":"https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=58b114ba8b0a19d8df0e8c575293e9ee/a08b87d6277f9e2f930650031430e924b899f38e.jpg"},{"id":14,"name":"郭富城","phone":"1899999888","telephone":"029-86666222","address":"香港","enabled":true,"username":"liudehua","remark":"天王","roles":[{"id":4,"name":"ROLE_train","nameZh":"培训主管"}],"userface":"https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ca45c3f18e94a4c21e2eef796f9d70b0/4e4a20a4462309f78c9f8fec7b0e0cf3d6cad65f.jpg"}];

        _this.operators = responseData;
        var length = responseData.length;
        _this.cardLoading = Array.apply(null, Array(length)).map(function (item, i) {
          return false;
        });
        _this.eploading = Array.apply(null, Array(length)).map(function (item, i) {
          return false;
        });

      },
      deleteOperator(operatorId){
        var _this = this;
        this.fullloading = true;
        var responseData = {"msg":"删除成功!","status":"success"};
        _this.fullloading = false;
        _this.$message({type: responseData.status, message: responseData.msg});
        if (responseData.status == 'success') {
          _this.initCards();
          _this.loadAllRoles();
        }
      }
    }
  }
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>
