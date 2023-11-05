<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入昵称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="withdrawalList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="昵称" align="center" prop="nickname"/>
      <el-table-column label="用户的id" align="center" prop="userId"/>
      <el-table-column label="交易状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="支付宝名字" align="center" prop="name"></el-table-column>
      <el-table-column label="支付宝账号" align="center" prop="phone"></el-table-column>
      <el-table-column label="头像" align="center" width="200">
        <template slot-scope="scope">
          <img v-if="scope.row.photo"
               class="list-img"
               :src="scope.row.photo"
          >
        </template>
      </el-table-column>
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
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog class="common-dialog" :title="diaTitle" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="交易状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { withdrawalList, withdrawalStatus } from '@/api/feedback'

export default {
  name: 'withdrawal',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      withdrawalList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nickname: '',
        userId: '',
        status: ''
      },
      // 总条数
      total: 0,
      imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
      diaTitle: '',
      // 是否显示弹出层
      open: false,
      rules: {},
      form: {},
      statusOptions: [
        {
          value: 0,
          label: '待提现'
        },
        {
          value: 1,
          label: '已提现'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改交易状态'
      this.noticeId = row.id
      this.$set(this.form, 'status', row.status)
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          status: this.form.status
        }
        withdrawalStatus(params).then(response => {
          if (response.code === 200) {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.noticeId = ''
            this.getList()
            this.reset()
          }
        })
      }
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        status: ''
      }
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true
      withdrawalList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.withdrawalList = response.rows
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
    formatterStatus(row) {
      switch (row.status) {
        case 0:
          return '待提现'
        case 1:
          return '已提现'
        default:
          return
      }
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

  ::v-deep .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>


