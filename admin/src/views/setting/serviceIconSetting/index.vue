<template>
  <div class="container">
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
    <el-table v-loading="loading" :data="intservList">
      <el-table-column show-overflow-tooltip label="名字" align="center" prop="name"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.url">
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="iconSort"/>
      <el-table-column label="跳转的url" align="center" prop="iconTo"/>
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog class="common-dialog" :title="diaTitle" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入名字"/>
        </el-form-item>
        <el-form-item label="icon地址" prop="url">
          <el-upload
            :action="uploadAction"
            list-type="picture-card"
            :auto-upload="true"
            :show-file-list="false"
            :headers="uploadHeader"
            :on-success="handleUploadSuccess"
            accept=".bmp, .jpg, .jpeg, .png, .gif"
          >
            <img
              v-if="form.url"
              :src="form.url"
              class="list-img"
            />
            <i v-if="!form.url" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="iconSort">
          <el-input v-model="form.iconSort" placeholder="请填写顺序"/>
        </el-form-item>
        <el-form-item label="跳转的url" prop="iconTo">
          <el-input v-model="form.iconTo" placeholder="请填写路径"/>
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
import { addIntserv, intservList, updateIntserv, deleteIntserv } from '@/api/setting/setting'
import { getToken } from '@/utils/auth'

export default {
  name: 'serviceIconSetting',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      intservList: [],
      // 弹出层标题
      diaTitle: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      noticeId: '',
      // 上传地址
      uploadAction: process.env.VUE_APP_SERVER_URL + '/web/icon/upload',
      uploadHeader: { 'Authorization': getToken() }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      intservList().then(response => {
          if (response.code === 200) {
            this.intservList = response.data
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
        name: '',
        url: '',
        iconSort: '',
        iconTo: ''
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.noticeId = ""
      this.open = true
      this.diaTitle = '添加icon'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改icon'
      this.noticeId = row.id
      this.$set(this.form, 'name', row.name)
      this.$set(this.form, 'url', row.url)
      this.$set(this.form, 'iconSort', row.iconSort)
      this.$set(this.form, 'iconTo', row.iconTo)
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          name: this.form.name,
          url: this.form.url,
          iconSort: this.form.iconSort,
          iconTo: this.form.iconTo
        }
        updateIntserv(params).then(response => {
          if (response.code === 200) {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.noticeId = ''
            this.getList()
            this.reset()
          }
        })
      } else {
        this.$refs['form'].validate(valid => {
          if (valid) {
            addIntserv(this.form).then(response => {
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
      this.$modal.confirm('是否确认icon').then(function() {
        return deleteIntserv({ id: row.id })
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    handleUploadSuccess(file) {
      this.$set(this.form, 'url', file.data.url)
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

