<template>
  <div class="sampledetail-container">
    <div class="sampledetail-filter">
      <el-card body-style="padding:10px;">
        <el-form ref="form" model="form" label-width="80px">
          <el-row>
            <el-input v-model="form.name" placeholder="请输入内容" />
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="sampledetail-gallery">
      <el-card body-style="padding:10px;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sampledetail {
  &-container {
    margin: 10px;
  }

  &-filter,
  &-gallery {
    margin: 5px;
  }

  &-items {
    margin: 5px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
    grid-gap: 10px;
  }
}
</style>
