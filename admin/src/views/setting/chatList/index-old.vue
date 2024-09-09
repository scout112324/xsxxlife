<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="120px">
      <el-form-item label="聊天内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入聊天内容关键字"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送方用户的id" prop="sendId">
        <el-input
          v-model="queryParams.sendId"
          placeholder="请输入发送方用户的id"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接收方用户的id" prop="acceptId">
        <el-input
          v-model="queryParams.acceptId"
          placeholder="请输入接收方用户的id"
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
    <el-table v-loading="loading" :data="chatMsgList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="发送方用户昵称" align="center" prop="sendNickname"/>
      <el-table-column label="发送方用户头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.sendPhoto">
        </template>
      </el-table-column>
      <el-table-column label="发布的用户id" align="center" prop="sendUserId"/>
      <el-table-column label="接收方用户昵称" align="center" prop="acceptNickname"/>
      <el-table-column label="接收方用户头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.acceptPhoto">
        </template>
      </el-table-column>
      <el-table-column label="接收方用户的id" align="center" prop="acceptUserId"/>
      <el-table-column label="聊天类型" align="center" prop="type" :formatter="formatterType"/>
      <el-table-column show-overflow-tooltip label="消息" align="center" prop="msg"/>
      <el-table-column label="消息是否已读" align="center" prop="signFlag" :formatter="formatterSignFlag"/>
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
import {chatMsgList, deleteChatMsg} from '@/api/setting/setting'

export default {
  name: 'chatList',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      chatMsgList: [],
      // 弹出层标题
      diaTitle: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        content: '',
        sendId: '',
        acceptId: ''
      },
      // 总条数
      total: 0,
      // 表单校验
      rules: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      chatMsgList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.chatMsgList = response.rows
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
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        examineStatus: '',
        isShow: 0,
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除这条聊天').then(function () {
        return deleteChatMsg({id: row.id})
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
    formatterSignFlag(row) {
      switch (row.signFlag) {
        case 0:
          return "已读";
        case 1:
          return "未读";
        default:
          return
      }
    },
    formatterType(row) {
      switch (row.type) {
        case 0:
          return "文本";
        case 1:
          return "图片";
        default:
          return
      }
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
