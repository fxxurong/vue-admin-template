<template>
  <!-- 下面是图片列表容器 -->
  <div class="samplelist-container">
    <!-- 下面是图片列表过滤选项区块 -->
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
          <el-form-item label="款号">
            <el-input v-model="input" placeholder="请输入款号" />
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
            <el-slider v-model="value3" range :max="1500" :step="10" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 下面是图片样版图片列表区块 -->
    <div class="samplelist-gallery">
      <el-card
        body-style="padding:10px;height:80vh;overflow:auto"
        shadow="hover"
      >
        <div class="samplelist-items">
          <el-image
            v-for="url in urls"
            :key="url"
            :src="url"
            :fit="fit"
            :preview-src-list="urls"
            :lazy="true"
            :style="style"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
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
      value3: [100, 1000],
      fit: 'cover',
      style:
        'border-radius:10px;box-shadow: 0 7px 14px 0 rgba(59, 65, 94, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07)',
      urls: [
        'https://s1.ax1x.com/2020/11/04/BcKshQ.jpg',
        'https://s1.ax1x.com/2020/11/04/BcKDAS.jpg',
        'https://s1.ax1x.com/2020/11/04/BcK078.jpg',
        'https://s1.ax1x.com/2020/11/04/BcKw0f.jpg',
        'https://s1.ax1x.com/2020/11/04/BcKdnP.jpg',
        'https://s1.ax1x.com/2020/11/05/B25TTH.jpg',
        'https://s1.ax1x.com/2020/11/05/B25ImD.jpg',
        'https://s1.ax1x.com/2020/11/05/B254OO.jpg',
        'https://s1.ax1x.com/2020/11/05/B25h6K.jpg',
        'https://s1.ax1x.com/2020/11/05/B25fl6.jpg',
        'https://s1.ax1x.com/2020/11/05/B25o0e.jpg',
        'https://s1.ax1x.com/2020/11/05/B25Hkd.jpg',
        'https://s1.ax1x.com/2020/11/05/B25Opt.jpg',
        'https://s1.ax1x.com/2020/11/05/B25btA.jpg',
        'https://s1.ax1x.com/2020/11/05/B25X1P.jpg',
        'https://s1.ax1x.com/2020/11/05/B25vX8.jpg',
        'https://s1.ax1x.com/2020/11/05/B25j6f.jpg',
        'https://s1.ax1x.com/2020/11/05/B2Ip7Q.jpg',
        'https://s1.ax1x.com/2020/11/05/B25znS.jpg',
        'https://s1.ax1x.com/2020/11/05/B2IS0g.jpg',
        'https://s1.ax1x.com/2020/11/05/B2ICkj.jpg',
        'https://s1.ax1x.com/2020/11/05/B2IPts.jpg',
        'https://s1.ax1x.com/2020/11/05/B2Ikpq.jpg',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.samplelist-container {
  padding: 10px;
}
.samplelist {
  &-filter,
  &-gallery {
    margin: 5px;
  }

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
