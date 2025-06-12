// eslint-disable-next-line import/no-commonjs
export default {
  // 描点插入
  insert: {
    'android/app/proguard-rules.pro': {
      content: `
##### 高德地图 #####
# 3D 地图 V5.0.0之前：
-keep   class com.amap.api.maps.**{*;}
-keep   class com.autonavi.amap.mapcore.*{*;}
-keep   class com.amap.api.trace.**{*;}

# 3D 地图 V5.0.0之后：
-keep   class com.amap.api.maps.**{*;}
-keep   class com.autonavi.**{*;}
-keep   class com.amap.api.trace.**{*;}

# 定位
-keep class com.amap.api.location.**{*;}
-keep class com.amap.api.fence.**{*;}
-keep class com.autonavi.aps.amapapi.model.**{*;}

# 搜索
-keep   class com.amap.api.services.**{*;}

# 2D地图
-keep class com.amap.api.maps2d.**{*;}
-keep class com.amap.api.mapcore2d.**{*;}

# 导航
-keep class com.amap.api.navi.**{*;}
-keep class com.autonavi.**{*;}`
    }
  },
  android: {
    xml: {
      'app/src/main/AndroidManifest.xml': {
        attr: {
          'android:name=".MainApplication"': {
            attr: {
              'android:allowNativeHeapPointerTagging': 'false'
            }
          }
        }
      }
    }
  },
}
