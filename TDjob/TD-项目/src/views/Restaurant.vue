<template>
  <div>
    <el-table
      :data="list.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      //餐馆
      <el-table-column prop="name.zh-CN" label="餐馆" width="180">
      </el-table-column>
      //地址
      <el-table-column prop="address.formatted" label="地址" width="250">
      </el-table-column>
      //标签
      <el-table-column prop="tags" label="标签" width="250">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item.label"
            :type="item.type"
            effect="dark"
          >
            {{ item.toUpperCase() }}
          </el-tag>
        </template>
      </el-table-column>
      //操作

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="open(scope.$index, scope.row)"
            :disabled="$permission()"
            >操作
          </el-button>
        </template>
      </el-table-column>

      //手动关闭
      <el-table-column label="手动关闭">
        <template slot-scope="scope">
          <el-switch
            @change="
              v => {
                getClosed(v, scope.row);
              }
            "
            v-model="scope.row.isClosed"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="$permission()"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- model -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="餐馆名称:" style="textAlign :left">
          <el-input
            v-model="resname[`${lang}`]"
            autocomplete="off"
            style="width :200px"
          >
            <el-select
              slot="prepend"
              v-model="lang"
              value="zh-CN"
              placeholder="请选择"
              @change="changeLange"
            >
              <el-option value="zh-CN" label="中文" />

              <el-option value="en-US" label="英文" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="餐馆标签:" style="textAlign :left;">
          <el-select v-model="selectTag" @change="addTag">
            <el-option
              v-for="item in tagsTotal"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-tag
            v-for="item in additionTag"
            :key="item.key"
            :type="item.type"
            closable
            effect="dark"
            @close="removeTag(item)"
          >
            {{ item.tag }}
          </el-tag>
        </el-form-item>
      </el-form>
      <NYtime></NYtime>
      <div v-for="(item, index) in hours" :key="item.key">
        <span>{{ item.day }}</span>
        <el-time-picker
          v-model="item.time"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          style="margin-left : 15px"
          @change="
            v => {
              changeHour(v, index);
            }
          "
        ></el-time-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="checkSend">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import _ from "lodash";
import NYtime from "./NYtime";
import { v4 as uuidv4 } from "uuid";
import Moment from "moment";
import { rest, updateRest, tags } from "../Request/restaurant.js";
export default {
  name: "Restaurant",
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      form: [],
      lang: "zh-CN",
      langName: "",
      resname: "",
      tagsTotal: [], //总的tags列表
      selectTag: "", //点到到那个数值
      additionTag: [], //右侧展示的tags
      hours: [],
      newHours: [],
      currentPage: 1, // 分页默认在第一页
      pageSize: 10 // 每页显示10条数据
    };
  },
  created() {
    this.getRest();
    this.gettags();
  },
  computed: {
    title() {
      return _.get(this.form, "name[zh-CN]", "");
    }
  },
  components: {
    NYtime
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //获取list数据
    async getRest() {
      const data = await rest();
      if (data) {
        this.list = JSON.parse(JSON.stringify(data.list));
        console.log("this.list=====>", this.list);
      }
      return _.map(this.list, v => {
        if (v.closed === undefined || v.closed === null) {
          this.$set(v, "isClosed", false);
        } else {
          this.$set(v, "isClosed", true);
        }

        return v;
      });
    },

    /* 发送请求获取tags */
    async gettags() {
      const data = await tags();
      if (data) {
        this.tagsTotal = data.list;
      }
    },
    // 开关门
    async getClosed(v, row) {
      let closed = v ? { closed: true } : null;
      const data = await updateRest({
        id: row._id,
        data: { closed }
      });
      if (data) {
        console.log(data);
      }
    },
    /* 切换中英文 */
    changeLange(v) {
      this.lang = v;

      this.langName = _.get(this.form, `name[${v}]`);
    },
    // 弹框
    open(index, row) {
      console.log(index, row);
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form = JSON.parse(JSON.stringify(row));
      this.resname = row.name;
      /* 循环每一个传进来的商店tags后返回additionTag数组里 */
      this.additionTag = _.map(row.tags, item => {
        return {
          key: uuidv4(),
          tag: item
        };
      });
      this.getWeeks((index, row).hours);
      // console.log("closed", row.closed.closed);
    },
    addTag(tag) {
      console.log("选中的tags===>", tag);
      this.additionTag.push({ tag: tag.toUpperCase() });
      console.log("additionTag", this.additionTag);
      /* lodash去重 重复的不会再被添加进去 */
      this.additionTag = _.uniq(this.additionTag);
    },

    /* 移除标签tags */
    removeTag(item) {
      //
      this.additionTag = _.filter(this.additionTag, itemTags => {
        return itemTags !== item;
      });
    },
    // 显示日期
    getWeeks(hours) {
      const weekDay = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ];
      this.hours = _(weekDay)
        .map((v, index) => {
          const start = _.get(hours[index], "start");
          const end = _.get(hours[index], "end");
          return {
            day: v,
            time: [
              Moment()
                .startOf("day")
                .add(start, "minutes")
                .toDate(),
              Moment()
                .startOf("day")
                .add(end, "minutes")
                .toDate()
            ]
          };
        })
        .value();
      this.newHours = hours;
      console.log("this.newHours", this.newHours);
    },

    getMinute(time) {
      return Moment(time).hours() * 60 + Moment(time).minute();
    },
    /* 改变时间 */
    changeHour(v, index) {
      const start = this.getMinute(v[0]);
      const end = this.getMinute(v[1]);

      this.newHours[index].start = start;
      this.newHours[index].end = end;
      console.log("start", start);
      console.log("end", end);
    },
    /* 发送请求更新数据 */
    async sendData() {
      console.log(this.additionTag.tag);
      const data = await updateRest({
        id: this.form._id,
        data: {
          name: this.resname,
          tags: _.map(this.additionTag, item => {
            return item.tag;
          }),
          hours: this.newHours
        }
      });
      if (data) {
        console.log("sendData", data);
      }
    },
    /* 发送更新 并关闭modal */
    checkSend() {
      this.sendData();
      this.dialogFormVisible = false;
      /* 更新完毕后重新获取商店信息 */
      this.getRest();
    }
  }
};
</script>

<style></style>
