<template>
  <div>
    <el-select v-model="commodityId" placeholder="请选择" @change="getFood">
      <el-option
        v-for="item in list"
        :key="item._id"
        :label="item.name['zh-CN']"
        :value="item._id"
      >
      </el-option>
    </el-select>

    <el-table :data="foods" style="width: 100%">
      <el-table-column fixed prop="name.zh-CN" label="名称" width="300">
        <template slot="header">
          <span style="margin-right :20px">名称</span>
          <input
            ref="searchValue"
            v-model="keyword"
            placeholder="请输入关键字"
            @keyup.enter="searchFood"
          />
        </template>
      </el-table-column>

      <el-table-column prop="price" label="价格" width="350">
        <template slot-scope="scope">
          ${{ scope.row.price | pricePost }}</template
        >
      </el-table-column>
      <el-table-column prop="name" label="状态" width="350">
        <template slot-scope="scope">
          <el-switch
            @change="handleSwitch(scope.row)"
            v-model="scope.row.available"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="$permission()"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev,pager,next,sizes"
      :total="count"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { rest } from "../Request/restaurant";
import { food, foodClose } from "../Request/menu";
export default {
  name: "Menu",
  created() {
    this.getRest();
  },
  data() {
    return {
      list: [],
      commodityId: "",
      pageSize: 10,
      currentPage: 1,
      keyword: "",
      id: "",
      count: 0,
      foods: []
    };
  },
  filters: {
    pricePost(price) {
      price = (price / 100).toFixed(2);
      return price;
    }
  },
  methods: {
    //   获取list数据
    async getRest() {
      const data = await rest();
      if (data) {
        this.list = JSON.parse(JSON.stringify(data.list));
        console.log("this.list=====>", this.list);
      }
    },

    getFood(v) {
      console.log("v=====>", v);
      this.id = v;
      this.tableData();
    },
    //获取菜单信息
    async tableData() {
      const data = await food({
        id: this.id,
        page: this.currentPage,
        limit: this.pageSize,
        keyword: this.keyword
      });
      if (data) {
        this.count = data.count;
        this.foods = data.list;
        console.log("data=========>", data);
      }
    },
    //获取菜品状态
    async handleSwitch(row) {
      console.log(row);

      if (row.available === false) {
        await foodClose({
          data: { available: false },
          id: row._id
        });
      } else {
        await foodClose({
          data: { available: true },
          id: row._id
        });
      }
    },
    /* 关键字搜索 */
    searchFood() {
      this.tableData();
    },

    /* 分页控制 每页多少条数据 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableData();
    },
    /* 分页控制 第几页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("vale", val);
      this.tableData();
    }
  }
};
</script>

<style></style>
