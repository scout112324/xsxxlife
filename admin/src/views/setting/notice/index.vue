<template>
  <div class="container">
    <el-table v-loading="loading" :data="noticeToList">
      <el-table-column label="id" prop="id" width="50" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip label="标题" align="center" prop="title"/>
      <el-table-column label="内容" align="center" prop="content">
        <template slot-scope="scope">
          <div v-html="scope.row.content" style="max-height: 200px;overflow-y: auto"></div>
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog class="common-dialog" :title="diaTitle" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <editor v-model="form.content" :min-height="200"/>
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
import { noticeToList, updateNoticeTo } from '@/api/module/message'
import {getToken} from '@/utils/auth'

export default {
  name: 'notice',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      noticeToList: [],
      // 弹出层标题
      diaTitle: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
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
      uploadAction: process.env.VUE_APP_SERVER_URL + '/web/icon/uploadBatch',

      uploadHeader: {'Authorization': getToken()},
      // 图片根目录
      imagePath: '',
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      noticeToList().then(response => {
          if (response.code === 200) {
            this.noticeToList = [response.data]
            this.loading = false
          }
        }
      )
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
        content: '',
      }
      this.fileList = []
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改资讯'
      this.noticeId = row.id
      this.$set(this.form, 'title', row.title)
      this.$set(this.form, 'content', row.content)
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          title: this.form.title,
          content: this.form.content,
        }
        updateNoticeTo(params).then(response => {
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
    handleUploadSuccess(file) {
      if (file.code === 200) {
        this.fileList.push(file.data[0].url)
      }
    },
    handleDeleteImage(index) {
      this.fileList.splice(index, 1);
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

  .img-item {

    .list-img {
      position: relative;
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }

    .delete-icon {
      position: absolute;
      font-size: 32px;
      transform: translate(-75px, 35px);
    }

  }

  .img-container {
    display: flex;
  }
}
</style>


