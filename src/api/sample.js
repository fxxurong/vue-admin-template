// 导入统一的请求接口
import request from '@/utils/request';

// 获取样板列表(对象方法)
export const SampleList = param => {
  return request({
    url: '/sampleList',
    method: 'get',
  });
};

// 添加样板记录

// 删除样板记录

// 更新样板记录

