<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="输入账号" style="width: 200px; " class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">
        新增用户
      </el-button>
    </div>
    <!-- 用户列表 table表单 -->
    <el-table
        :data="userList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="150px">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUserDetail(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='启用'" size="mini" type="success" @click="handleModifyStatus(row,'启用', 1)">
            启用
          </el-button>
          <el-button v-if="row.status!='禁用'" size="mini" @click="handleModifyStatus(row,'禁用', 0)">
            禁用
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getUserList" />
    <!-- 创建用户 dialog -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible">
      <el-form ref="userData" :rules="rules" :model="userData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色" prop="rid">
          <el-select v-model="userData.rid" class="filter-item" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions" :key="item.roleid" :label="item.rolename" :value="item.roleid" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="userData.username" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userData.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="userData.desc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="描述信息" />
        </el-form-item>
        默认密码: kylinos
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createUser()">
          创建
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
    data() {
        return {
            text: "创建用户",
            userList: null,
            listQuery: {
                page: 1,
                limit: 10,
                total: 0
            },
            dialogFormVisible: false,
            rules: {},
            userData: {},
        }
    },
    created() {

    },
    methods: {
        // 获取用户列表
        getUserList() {

        }
    }
}

</script>
