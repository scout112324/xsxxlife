<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="42px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入兼职名称"
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
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="jobList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="标签" align="center" prop="label"/>
      <el-table-column label="地点" align="center" prop="place"/>
      <el-table-column label="用户的id" align="center" prop="userId"/>
      <el-table-column label="薪资" align="center" prop="price"/>
      <el-table-column label="微信号" align="center" prop="wx"/>
      <el-table-column label="手机号" align="center" prop="phone"/>
      <el-table-column label="工作内容" align="center" prop="jobContent"/>
      <el-table-column label="薪资待遇" align="center" prop="priceContent"/>
      <el-table-column label="工作时间" align="center" prop="timeContent"/>
      <el-table-column label="工作要求" align="center" prop="needContent"/>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="详细地址" align="center" prop="detailsPlace"/>
      <el-table-column label="用户昵称" align="center" prop="nickname"/>
      <el-table-column label="用户头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
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
    <el-dialog class="common-dialog" :diaTitle="diaTitle" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-input v-model="form.label" placeholder="请输入标签"/>
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="form.place" placeholder="请填写位置(市，区，街道之前以逗号分隔)"/>
        </el-form-item>
        <el-form-item label="用户的id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户的id"/>
        </el-form-item>
        <el-form-item label="薪资" prop="price">
          <el-input v-model="form.price" placeholder="请输入薪资"/>
        </el-form-item>
        <el-form-item label="微信号" prop="wx">
          <el-input v-model="form.wx" placeholder="请输入微信号"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="工作内容" prop="jobContent">
          <el-input v-model="form.jobContent" placeholder="请输入工作内容"/>
        </el-form-item>
        <el-form-item label="薪资待遇" prop="priceContent">
          <el-input v-model="form.priceContent" placeholder="请输入薪资待遇"/>
        </el-form-item>
        <el-form-item label="工作要求" prop="needContent">
          <el-input v-model="form.needContent" placeholder="请输入工作要求"/>
        </el-form-item>
        <el-form-item label="工作时间" prop="timeContent">
          <el-input v-model="form.timeContent" placeholder="请输入工作时间"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailsPlace">
          <el-input v-model="form.detailsPlace" placeholder="请输入详细地址"/>
        </el-form-item>
        <el-form-item label="状态" v-if="noticeId">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="status in statusOption"
              :key="status.value"
              :label="status.value"
            >{{ status.label }}
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
import {addJob, jobList, updateJob, deleteJob} from '@/api/module/partTime'
import {getToken} from '@/utils/auth'

export default {
  name: 'Announce',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      jobList: [],
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
        title: ''
      },
      // 总条数
      total: 0,
      // 表单校验
      rules: {},
      noticeId: '',
      statusOption: [
        {
          label: '已发布',
          value: '0'
        },
        {
          label: '未发布',
          value: '1'
        }
      ],
      // 上传地址
      uploadAction: process.env.VUE_APP_SERVER_URL + '/web/icon/upload',

      uploadHeader: {'Authorization': getToken()},
      // 图片根目录
      imagePath: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      jobList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.jobList = response.rows
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
      let text = row.status == '0' ? '已发布' : '未发布'
      this.$modal.confirm('确认要' + text + '吗？').then(function () {
        return updateJob(
          {
            id: row.id,
            title: row.title,
            label: row.label,
            place: row.place,
            userId: row.userId,
            price: row.price,
            wx: row.wx,
            phone: row.phone,
            jobContent: row.jobContent,
            priceContent: row.priceContent,
            needContent: row.needContent,
            timeContent: row.timeContent,
            detailsPlace: row.detailsPlace,
            status: row.status
          }
        )
      }).then(() => {
        this.$modal.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
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
        title: '',
        label: '',
        place: '',
        userId: '',
        price: '',
        wx: '',
        phone: '',
        jobContent: '',
        priceContent: '',
        needContent: '',
        timeContent: '',
        detailsPlace: '',
        total: 0,
        status: 0,
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.diaTitle = '添加兼职'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改兼职'
      this.noticeId = row.id
      this.$set(this.form, 'title', row.title)
      this.$set(this.form, 'label', row.label)
      this.$set(this.form, 'place', row.place)
      this.$set(this.form, 'userId', row.userId)
      this.$set(this.form, 'price', row.price)
      this.$set(this.form, 'wx', row.wx)
      this.$set(this.form, 'phone', row.phone)
      this.$set(this.form, 'jobContent', row.jobContent)
      this.$set(this.form, 'priceContent', row.priceContent)
      this.$set(this.form, 'needContent', row.needContent)
      this.$set(this.form, 'timeContent', row.timeContent)
      this.$set(this.form, 'detailsPlace', row.detailsPlace)
      this.$set(this.form, 'status', String(row.status))
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          title: this.form.title,
          label: this.form.label,
          place: this.form.place,
          userId: this.form.userId,
          price: this.form.price,
          wx: this.form.wx,
          phone: this.form.phone,
          jobContent: this.form.jobContent,
          priceContent: this.form.priceContent,
          needContent: this.form.needContent,
          timeContent: this.form.timeContent,
          detailsPlace: this.form.detailsPlace,
          status: this.form.status,
        }
        updateJob(params).then(response => {
          if (response.code === 200) {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.noticeId = ""
            this.getList()
            this.reset()
          }
        })
      } else {
        this.$refs['form'].validate(valid => {
          if (valid) {
            addJob(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        })
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除兼职').then(function () {
        return deleteJob({id: row.id})
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

