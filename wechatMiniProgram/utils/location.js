import { getArea } from "@/api/common.js"
import store from '@/store/index.js'

// 获取位置信息
export const getLocationInfo = () => {
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope: 'scope.userLocation',
      success() {
        uni.getLocation({
          type: 'gcj02',
          success(res) {
            // 保存经纬度
            uni.setStorageSync('latitude', res.latitude);
            uni.setStorageSync('longitude', res.longitude);
            
            // 获取地区信息
            let option = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            getArea(option).then(res => {
              if (res.statusCode === 200) {
                const addressComponent = res.data.result.addressComponent;
                
                // 保存省市区信息
                uni.setStorageSync('province', addressComponent.province);
                uni.setStorageSync('district', addressComponent.district);
                
                // 更新 store
                store.commit('SET_PROVINCE', addressComponent.province);
                store.commit('SET_DISTRICT', addressComponent.district);
                
                const defaultAreas = [{
                  text: addressComponent.province,
                  value: addressComponent.province
                }, {
                  text: addressComponent.district,
                  value: addressComponent.district
                }];
                store.commit('SET_DEFAULTAREAS', defaultAreas);
                
                resolve({
                  latitude: res.latitude,
                  longitude: res.longitude,
                  province: addressComponent.province,
                  district: addressComponent.district
                });
              } else {
                reject(new Error('获取地区信息失败'));
              }
            }).catch(err => {
              reject(err);
            });
          },
          fail(err) {
            reject(err);
          }
        });
      },
      fail(err) {
        reject(err);
      }
    });
  });
}; 