<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入用户昵称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入用户的id"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="位置" prop="place">
        <el-cascader
          :options="options"
          :props="{ checkStrictly: true }"
          clearable
          popper-class="popper"
          v-model="queryParams.place"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="userList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="用户id" align="center" prop="id"/>
      <el-table-column label="昵称" align="center" prop="nickname"></el-table-column>
      <el-table-column label="openId" align="center" prop="openId"></el-table-column>
      <el-table-column label="位置" align="center" prop="place" :formatter="placeFormatter"></el-table-column>
      <el-table-column label="头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        v-show="total>0"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {userList} from "@/api/setting/setting";
import {areaData} from "@/utils/area"

export default {
  name: 'plateSetting',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nickname: '',
        id: '',
        place: []
      },
      // 总条数
      total: 0,
      options: []
    }
  },
  created() {
    this.options = areaData
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      this.queryParams = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        nickname: this.queryParams.nickname,
        id: this.queryParams.id,
        place: this.queryParams.place.toString()
      }
      userList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.userList = response.rows
            this.total = response.total
            this.loading = false
          }
        }
      )
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 表单重置
    reset() {
      this.form = {
        nickname: '',
        id: '',
      }
    },
    // 页码发生变化
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },
    // 当前页码发生变化
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    placeFormatter(row) {
      if(row.place===',') {
        return ''
      }
      return row.place
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;

  .list-img {
    width: 100px;
    height: 100px;
  }

  .footer {
    text-align: right;
    margin: 20px;
  }
}
</style>
<style scoped lang="scss">
.common-dialog {

  .el-form {
    margin-right: 20px;
  }

  .list-img {
    width: 100px;
    height: 100px;
  }
}
</style>
