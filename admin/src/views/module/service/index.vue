<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
      <el-form-item label="服务内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入服务内容"
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
    <el-table v-loading="loading" :data="mIntservList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="名字" align="center" prop="name"/>
      <el-table-column show-overflow-tooltip label="服务内容" align="center" prop="content"/>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="phone"/>
      <el-table-column label="详细地址" align="center" prop="detailsPlace"/>
      <el-table-column label="综合服务icon的id" align="center" prop="intservId"/>
      <el-table-column label="综合服务模块的名称" align="center" prop="moduleName"/>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请填写名字"/>
        </el-form-item>
        <el-form-item label="服务内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="图片" prop="photo">
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
              v-if="form.photo"
              :src="form.photo"
              class="list-img"
            />
            <i v-if="!form.photo" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailsPlace">
          <el-input v-model="form.detailsPlace" placeholder="请输入详细地址"/>
        </el-form-item>
        <el-form-item label="综合服务icon的id" prop="intservId">
          <el-input v-model="form.intservId" placeholder="请输入综合服务模块的id"/>
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
import {addMIntserv, mIntservList, updateMIntserv, deleteMIntserv} from '@/api/module/service'
import {getToken} from '@/utils/auth'
import {areaData} from "@/utils/area"

export default {
  name: 'Announce',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      mIntservList: [],
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
        place: []
      },
      // 总条数
      total: 0,
      // 表单校验
      rules: {},
      noticeId: '',
      // 上传地址
      uploadAction: process.env.VUE_APP_SERVER_URL + '/web/icon/upload',

      uploadHeader: {'Authorization': getToken()},
      // 图片根目录
      imagePath: '',
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
        content: this.queryParams.content,
        place: this.queryParams.place.toString()
      }
      mIntservList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.mIntservList = response.rows
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
        content: '',
        phone: "",
        detailsPlace: "",
        intservId: "",
        name: '',
        photo: "",
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.diaTitle = '添加综合服务'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true
      this.diaTitle = '修改综合服务'
      this.noticeId = row.id
      this.$set(this.form, 'content', row.content)
      this.$set(this.form, 'phone', row.phone)
      this.$set(this.form, 'detailsPlace', row.detailsPlace)
      this.$set(this.form, 'intservId', row.intservId)
      this.$set(this.form, 'name', row.name)
      this.$set(this.form, 'photo', row.photo)
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          content: this.form.content,
          phone: this.form.phone,
          detailsPlace: this.form.detailsPlace,
          intservId: this.form.intservId,
          name: this.form.name,
          photo: this.form.photo,
        }
        updateMIntserv(params).then(response => {
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
            addMIntserv(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除综合服务').then(function () {
        return deleteMIntserv({id: row.id})
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
      this.$set(this.form, 'photo', file.data.url)
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

