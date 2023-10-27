<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="42px">
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入内容关键字"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="findList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="用户的id" align="center" prop="userId"/>
      <el-table-column label="昵称" align="center" prop="nickname"/>
      <el-table-column label="用户头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="地点" align="center" prop="place"/>
      <el-table-column label="内容" align="center" prop="content"></el-table-column>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.picture">
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="phone"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
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
import {findList, deleteFind} from '@/api/module/lookForPeople'
import {getToken} from '@/utils/auth'

export default {
  name: 'LookForPeople',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      findList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        content: ''
      },
      // 总条数
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      findList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.findList = response.rows
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
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除这条寻人寻物').then(function () {
        return deleteFind({id: row.id})
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
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
    handleUploadSuccess(file) {
      this.$set(this.form, 'picture', file.data.url)
    },
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

  ::v-deep .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .list-img {
    width: 100px;
    height: 100px;
  }
}
</style>
