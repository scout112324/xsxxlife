<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="42px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入社群名称"
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
    <el-table v-loading="loading" :data="crowdList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip label="标题" align="center" prop="title"/>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.url">
        </template>
      </el-table-column>
      <el-table-column label="人数" align="center" prop="total"/>
      <el-table-column show-overflow-tooltip label="介绍" align="center" prop="introduce"/>
      <el-table-column label="二维码地址" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.qrCode">
        </template>
      </el-table-column>
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
    <el-dialog class="common-dialog" :diaTitle="diaTitle" :visible.sync="open" width="600px" append-to-body destroy-on-close>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="图片" prop="url">
          <el-upload
            :action="uploadAction"
            list-type="picture-card"
            :auto-upload="true"
            :show-file-list="false"
            :headers="uploadHeader"
            :on-success="handleUploadSuccess"
          >
            <img
              v-if="form.url"
              :src="form.url"
              class="list-img"
            />
            <i v-if="!form.url" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="人数" prop="total">
          <el-input v-model="form.total" placeholder="请输入总人数"/>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="form.introduce" placeholder="请介绍群类型"/>
        </el-form-item>
        <el-form-item label="二维码地址" prop="qrCode">
          <el-upload
            :action="uploadAction"
            list-type="picture-card"
            :auto-upload="true"
            :show-file-list="false"
            :headers="uploadHeader"
            :on-success="qrCodeUploadSuccess"
          >
            <img
              v-if="form.qrCode"
              :src="form.qrCode"
              class="list-img"
            />
            <i v-if="!form.qrCode" class="el-icon-plus"></i>
          </el-upload>
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
import { addCrowd, crowdList, updateCrowd, deleteCrowd } from '@/api/module/community'
import { getToken } from '@/utils/auth'

export default {
  name: 'Announce',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      crowdList: [],
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
      // 上传地址
      uploadAction: process.env.VUE_APP_SERVER_URL + '/web/icon/upload',

      uploadHeader: { 'Authorization': getToken() },
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
      crowdList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.crowdList = response.rows
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
      this.$modal.confirm('确认要' + text + '在首页吗？').then(function() {
        return updateCrowd(
          { id: row.id, title: row.title, total: row.total, introduce: row.introduce, isShow: row.isShow }
        )
      }).then(() => {
        this.$modal.msgSuccess(text + '成功')
      }).catch(function() {
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
        title: '',
        total: 0,
        introduce: '',
        isShow: 0,
        url: "",
        qrCode: ""
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.diaTitle = '添加社群'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改社群'
      this.noticeId = row.id
      this.$set(this.form, 'title', row.title)
      this.$set(this.form, 'total', row.total)
      this.$set(this.form, 'introduce', row.introduce)
      this.$set(this.form, 'isShow', String(row.isShow))
      this.$set(this.form, 'url', row.url)
      this.$set(this.form, 'qrCode', row.qrCode)
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          title: this.form.title,
          total: this.form.total,
          introduce: this.form.introduce,
          isShow: this.form.isShow,
          url: this.form.url,
          qrCode: this.form.qrCode
        }
        updateCrowd(params).then(response => {
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
            addCrowd(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除公告').then(function() {
        return deleteCrowd({ id: row.id })
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
      this.$set(this.form, 'url', file.data.url)
    },
    qrCodeUploadSuccess(file) {
      this.$set(this.form, 'qrCode', file.data.url)
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

