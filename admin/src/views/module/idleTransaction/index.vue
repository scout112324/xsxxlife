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
    <el-table v-loading="loading" :data="unusedList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="用户昵称" align="center" prop="nickname"/>
      <el-table-column label="用户头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column label="发布的用户id" align="center" prop="userId"/>
      <el-table-column label="地点" align="center" prop="place"/>
      <el-table-column label="价格" align="center" prop="realPrice"/>
      <el-table-column show-overflow-tooltip label="内容" align="center" prop="content"/>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <div class="img-container" v-for="(pic,index) in scope.row.picture.split(',')" :key="index">
            <img v-if="imgType.includes(pic.substr(pic.lastIndexOf('.') + 1, pic.length).toLowerCase())"
                 class="list-img"
                 :src="pic">
            <video v-else class="list-img" :src="pic" controls></video>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="交易状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="交易方式" align="center" prop="saleType" :formatter="formatterSaleType"/>
      <el-table-column label="手机号" align="center" prop="phone"/>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="examineStatus" :formatter="formatterExamineStatus"/>
      <el-table-column label="是否展示" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            :active-value="0"
            :inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog class="common-dialog" :title="diaTitle" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="内容" prop="examineStatus">
          <el-select v-model="form.examineStatus" placeholder="请审核">
            <el-option
              v-for="item in examineStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否展示" v-if="noticeId">
          <el-radio-group v-model="form.isShow">
            <el-radio
              v-for="isShow in isShowOption"
              :key="isShow.value"
              :label="isShow.value"
            >{{ isShow.label }}
            </el-radio>
          </el-radio-group>
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
import {unusedList, updateUnused, deleteUnused} from '@/api/module/idleTransaction'

export default {
  name: 'idleTransaction',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      unusedList: [],
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
        content: ''
      },
      // 总条数
      total: 0,
      // 表单校验
      rules: {},
      noticeId: '',
      isShowOption: [
        {
          label: '展示',
          value: '0'
        },
        {
          label: '不展示',
          value: '1'
        }
      ],
      examineStatusOptions: [{
        value: 0,
        label: '待审核'
      }, {
        value: 1,
        label: '审核通过'
      }, {
        value: 2,
        label: '审核不通过'
      }],
      imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      unusedList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.unusedList = response.rows
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
    // 状态修改
    handleStatusChange(row) {
      let text = row.isShow == '0' ? '展示' : '不展示'
      this.$modal.confirm('确认要' + text + '在首页吗？').then(function () {
        return updateUnused(
          {
            id: row.id,
            examineStatus: row.examineStatus,
            isShow: row.isShow
          }
        )
      }).then(() => {
        this.$modal.msgSuccess(text + '成功')
      }).catch(function () {
        row.isShow = row.isShow === '0' ? '1' : '0'
      })
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改闲置状态'
      this.noticeId = row.id
      this.$set(this.form, 'examineStatus', row.examineStatus)
      this.$set(this.form, 'isShow', String(row.isShow))
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          examineStatus: this.form.examineStatus,
          isShow: this.form.isShow,
        }
        updateUnused(params).then(response => {
          if (response.code === 200) {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.noticeId = ""
            this.getList()
            this.reset()
          }
        })
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除附近社群').then(function () {
        return deleteUnused({id: row.id})
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
    formatterExamineStatus(row) {
      switch (row.examineStatus) {
        case 0:
          return "待审核";
        case 1:
          return "审核通过";
        case 2:
          return "审核不通过";
        default:
          return
      }
    },
    formatterStatus(row) {
      switch (row.status) {
        case 0:
          return "在售";
        case 1:
          return "已售";
        default:
          return
      }
    },
    formatterSaleType(row) {
      switch (row.saleType) {
        case 0:
          return "线上";
        case 1:
          return "线下";
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


