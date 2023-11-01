<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="120px">
      <el-form-item label="闲置物品名字" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入闲置物品的名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卖家用户的id" prop="saleId">
        <el-input
          v-model="queryParams.saleId"
          placeholder="请输入卖家用户的id"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买方用户的id" prop="buyId">
        <el-input
          v-model="queryParams.buyId"
          placeholder="请输入购买方用户的id"
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
    <el-table v-loading="loading" :data="orderList">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="购买方用户的id" align="center" prop="userId"/>
      <el-table-column label="买家昵称" align="center" prop="nickName"></el-table-column>
      <el-table-column label="买家头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.photo">
        </template>
      </el-table-column>
      <!--      <el-table-column label="闲置物品的名称" align="center" prop="name"></el-table-column>-->
      <el-table-column label="闲置物品的id" align="center" prop="unusedId"/>
      <el-table-column show-overflow-tooltip label="闲置物品的内容" align="center" prop="content"></el-table-column>
      <el-table-column label="订单状态" align="center" prop="payStatus" :formatter="formatterPayStatus"/>
      <el-table-column label="支付时间" align="center" prop="payTime"/>
      <el-table-column label="卖家用户的id" align="center" prop="saleid"></el-table-column>
      <el-table-column label="卖家用户的昵称" align="center" prop="saleNickName"></el-table-column>
      <el-table-column label="卖家用户的头像" align="center" width="200">
        <template slot-scope="scope">
          <img class="list-img" :src="scope.row.salePhoto">
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
          <span v-else>-</span>
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
import {orderList} from '@/api/feedback'

export default {
  name: 'record',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 公告表格数据
      orderList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        saleId: '',
        buyId: ''
      },
      // 总条数
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      orderList(this.queryParams).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.orderList = response.rows
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
    // 表单重置
    reset() {
      this.form = {
        name: '',
        saleId: '',
        buyId: ''
      }
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
    formatterPayStatus(row) {
      switch (row.payStatus) {
        case 0:
          return "未支付";
        case 1:
          return "已支付";
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

  .list-img {
    width: 100px;
    height: 100px;
  }
}
</style>
