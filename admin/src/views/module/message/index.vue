<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="42px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入文章名称"
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
    <el-table v-loading="loading" :data="articleList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip label="标题" align="center" prop="title"/>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <div class="img-container" v-if="scope.row.picture">
            <img v-for="(pic,index) in scope.row.picture.split(',')" :key="index" class="list-img" :src="pic">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center" prop="content">
        <template slot-scope="scope">
          <div v-html="scope.row.content" style="max-height: 200px;overflow-y: auto"></div>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="图片" prop="picture">
          <div class="img-container">
            <div class="img-item" v-if="fileList.length>0" v-for="(file,index) in fileList"
                 :key="index" @click="handleDeleteImage(index)">
              <img
                :src="file"
                class="list-img"
              />
              <i class="el-icon-delete delete-icon"></i>
            </div>
            <el-upload
              name="files"
              multiple
              accept=".bmp,.jpg,.jpeg,.png,.gif"
              :action="uploadAction"
              list-type="picture-card"
              :auto-upload="true"
              :show-file-list="false"
              :headers="uploadHeader"
              :on-success="handleUploadSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
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
import {addArticle, articleList, updateArticle, deleteArticle} from '@/api/module/message'
import {getToken} from '@/utils/auth'

export default {
  name: 'Message',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      articleList: [],
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
      articleList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.articleList = response.rows
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
        title: '',
        content: '',
        picture: "",
      }
      this.fileList = []
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.noticeId = ""
      this.open = true
      this.diaTitle = '添加资讯'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改资讯'
      this.noticeId = row.id
      this.$set(this.form, 'title', row.title)
      this.$set(this.form, 'content', row.content)
      this.$set(this.form, 'picture', row.picture)
      this.fileList = row.picture ? row.picture.split(',') : []
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          title: this.form.title,
          content: this.form.content,
          picture: this.fileList.toString(),
        }
        updateArticle(params).then(response => {
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
            addArticle(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除文章').then(function () {
        return deleteArticle({id: row.id})
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
      if (file.code === 200) {
        this.fileList.push(file.data[0].url)
      }
      console.log(this.fileList)
      this.$set(this.form, 'picture', this.fileList.toString())
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


