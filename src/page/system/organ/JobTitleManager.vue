<template>
  <div>
    <div style="text-align: left">
      <el-input
        placeholder="添加职称..."
        size="mini"
        @keyup.enter.native="addJobTitle"
        style="width: 300px;"
        prefix-icon="el-icon-plus"
        v-model="jobTitle">
      </el-input>
      <el-select v-model="titleLevel" size="mini" placeholder="职称等级">
        <el-option
          v-for="tl in titleLevels"
          :key="tl"
          :label="tl"
          :value="tl">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addJobTitle">添加</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
        v-loading="loading"
        :data="posData"
        size="mini"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 80%">
        <el-table-column
          type="selection"
          width="55"
          align="left">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职称名称"
          width="180"
          align="left">
        </el-table-column>
        <el-table-column
          prop="titleLevel"
          label="职称级别"
          width="180"
          align="left">
        </el-table-column>
        <el-table-column
          width="180"
          label="创建时间"
          align="left">
          <template slot-scope="scope">{{ scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: left;margin-top: 10px">
      <el-button type="danger" size="mini" v-if="posData.length>0" :disabled="multipleSelection.length==0"
                 @click="deleteMany">批量删除
      </el-button>
    </div>
    <div style="text-align: left">
      <el-dialog
        title="编辑职称"
        :visible.sync="dialogVisible"
        width="25%">
        <el-input v-model="updateJobTitle" size="mini" placeholder="请输入新的职称..."></el-input>
        <el-select v-model="updateTitleLevel" style="margin-top: 10px" size="mini"
                   placeholder="职称等级">
          <el-option
            v-for="tl in titleLevels"
            :key="tl"
            :label="tl"
            :value="tl">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" size="mini" @click="updateJobTitleExec">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    mounted: function () {
      this.loadTableData();
    },
    methods: {
      updateJobTitleExec(){
        if (!this.isNotNullORBlank(this.updateJobTitle)) {
          this.$message.warning('职称名称不能为空!');
          return;
        }
        this.loading = true;
        var _this = this;

        var _data = {"status":"success","msg":"修改成功!"};
        this.dialogVisible = false;
        var data = _data;
        _this.$message({type: data.status, message: data.msg});
        _this.loadTableData();

      },
      deleteMany(){
        var _this = this;
        this.$confirm('删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var multipleSelection = _this.multipleSelection;
          var ids = '';
          multipleSelection.forEach(row=> {
            ids = ids + row.id + ',';
          })
          _this.doDelete(ids);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addJobTitle(){
        if (!this.isNotNullORBlank(this.jobTitle)) {
          this.$message.warning('职称名称不能为空!');
          return;
        }

        if (!this.isNotNullORBlank(this.titleLevel)) {
          this.$message.warning('请选择职称级别!');
          return;
        }

        var _this = this;
        this.loading = true;
        var _data = {"status":"success","msg":"添加成功!"};
        _this.$message({type: _data.status, message: _data.msg});
        _this.loadTableData();
        _this.jobTitle = '';
        _this.titleLevel = '';
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row){
        this.updateJobTitle = row.name;
        this.updateJobTitleId = row.id;
        this.updateTitleLevel=row.titleLevel;
        this.dialogVisible = true;
      },
      handleDelete(index, row){
        var _this = this;
        this.$confirm('删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.doDelete(row.id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doDelete(ids){
        var _this = this;
        _this.loading = true;
        _this.loading = false;
        _this.loadTableData();
      },
      loadTableData(){
        var _this = this;
        this.loading = true;

        var _data = [{"id":9,"name":"教授","titleLevel":"正高级","createDate":1515676754000},{"id":10,"name":"副教授","titleLevel":"副高级","createDate":1515676760000},{"id":12,"name":"助教","titleLevel":"初级","createDate":1515677739000},{"id":13,"name":"讲师","titleLevel":"中级","createDate":1515681732000},{"id":14,"name":"初级工程师","titleLevel":"初级","createDate":1515917930000},{"id":15,"name":"中级工程师","titleLevel":"中级","createDate":1515917940000},{"id":16,"name":"高级工程师","titleLevel":"副高级","createDate":1515917954000},{"id":17,"name":"骨灰级工程师","titleLevel":"正高级","createDate":1515917964000}];

        _this.posData = _data;
        _this.loading = false;

      }
    },
    data(){
      return {
        jobTitle: '',
        updateJobTitle: '',
        updateTitleLevel: '',
        titleLevel: '',
        updateJobTitleId: -1,
        loading: false,
        dialogVisible: false,
        multipleSelection: [],
        type: [],
        titleLevels: ['正高级', '副高级', '中级', '初级', '员级'],
        nameLabelName: '职称名称',
        posData: []
      }
    }

  }
</script>
