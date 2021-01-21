<template>
  <div class="samplelist-container">
    <div class="samplelist-filter">
      <el-card
        body-style="padding:10px;box-shadow:0 7px 14px 0 rgba(59, 65, 94, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)"
        shadow="hover"
      >
        <el-form
          ref="filter"
          model="filter"
          label-position="left"
          size="small"
          inline=""
          true
          label-suffix=":"
        >
          <el-form-item label="记录数量">
            <el-input v-model="input" placeholder="记录数量" />
          </el-form-item>
          <el-form-item label="原料">
            <el-autocomplete
              v-model="state1"
              :class="inline - input"
              :fetch-suggestions="querySearch"
              placeholder="请输入原料名称"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="center"
              unlink-panels="true"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 250px"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="重量范围">
            <el-slider v-model="weightrange" range :max="1500" :step="10" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="samplelist-table">
      <el-card body-style="padding:10px;overflow:auto;" shadow="hover">
        <el-table
          :data="samplelist"
          :border="true"
          style="width:100%, header-align:center"
          :default-sort="{ prop: 'styleNO', order: 'descending' }"
          :header-cell-style="headerClass"
          :cell-style="rowClass"
          height="80vh"
          size="min"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column
            prop="styleNO"
            label="款号"
            width="100"
            header-align="center"
            sortable
          ></el-table-column>
          <el-table-column
            prop="productionMethod"
            label="工艺"
            width="100"
            sortable
          ></el-table-column>
          <el-table-column
            prop="needleNumber"
            label="针数"
            width="100"
            sortable
          ></el-table-column>
          <el-table-column
            prop="weight"
            label="重量"
            width="100"
            sortable
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期"
            width="120"
            sortable
          ></el-table-column>
          <el-table-column
            prop="modifyDate"
            label="修改日期"
            width="120"
            sortable
          ></el-table-column>
          <el-table-column
            prop="productionWay"
            label="织法"
            width="150"
            show-overflow-tooltip="true"
            sortable
          ></el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            show-overflow-tooltip="true"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { SampleList } from '@/api/sample';

export default {
  data() {
    return {
      samplelist: [],
      input: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      value1: '',
      state1: '',
      value2: '',
      weightrange: [20, 800],
      fit: 'cover',
      style:
        'border-radius:10px;box-shadow: 0 7px 14px 0 rgba(59, 65, 94, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)',
    };
  },
  created() {
    this.getSampleList();
  },
  methods: {
    headerClass() {
      return 'text-align: center';
    },
    // 设置行式样
    rowClass() {
      return 'text-align: center';
    },
    // 获取样板列表
    getSampleList() {
      SampleList().then(res => {
        this.samplelist = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.samplelist-container {
  padding: 10px;
  overflow: hidden;
}
.samplelist-filter {
  margin: 5px;
}
.samplelist-table {
  margin: 5px;
}
.samplelist {
  &-items {
    margin: 5px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 2fr));
    grid-gap: 10px;
  }
}
.el-form-item {
  margin: 5px;
}
.el-slider {
  width: 200px;
}
</style>
