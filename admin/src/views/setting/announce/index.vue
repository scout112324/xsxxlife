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
    <el-table v-loading="loading" :data="noticeList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip label="内容" align="center" prop="content" />
      <el-table-column label="路径" align="center" prop="url" />
      <el-table-column label="状态" align="center" key="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
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
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="内容">
          <el-input v-model="form.content" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.url" placeholder="请输入路径"/>
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
import {addNotice, noticeList, updateNotice, deleteNotice} from "@/api/setting/setting"

export default {
  name: "Announce",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 总条数
      total: 0,
      // 表单校验
      rules: {},
      noticeId: "",
      statusOption: [
        {
          label: '启用',
          value: "0"
        },
        {
          label: '禁用',
          value: "1"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      noticeList(this.queryParams).then(response => {
          if (response.code === 200) {
            this.noticeList = response.rows
            this.total = response.total
            this.loading = false;
          }
        }
      );
    },
    // 状态修改
    handleStatusChange(row) {
      console.log(row.status)
      let text = row.status == "0" ? "启用" : "禁用";
      this.$modal.confirm('确认要' + text + '公告吗？').then(function () {
        return updateNotice({id:row.id,content:row.content,url:row.url,status: row.status});
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        content: "",
        url: "",
        status: 0,
      };
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.noticeId = ""
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true;
      this.title = "修改公告";
      this.noticeId = row.id
      this.$set(this.form, 'content', row.content)
      this.$set(this.form, 'url', row.url)
      this.$set(this.form, 'status', String(row.status))
    },
    /** 提交按钮 */
    submitForm() {
      if (this.noticeId) {
        const params = {
          id: this.noticeId,
          content: this.form.content,
          url: this.form.url,
          status: this.form.status
        }
        console.log(params)
        updateNotice(params).then(response => {
          if (response.code === 200) {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.noticeId = ""
            this.getList();
            this.reset();
          }
        })
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            console.log(this.form)
            addNotice(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除公告').then(function () {
        return deleteNotice({id: row.id});
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
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
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  .footer {
    text-align: right;
    margin: 20px;
  }
}
</style>

