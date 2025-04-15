<template>
  <div class="app-container home">
    <div class="container">
      <div class="list-container">
        <div :class="['item',`item-${index}`]" v-for="(item,index) in equipData" :key="item.id">
          <div class="left-item">
            <img class="icon" :src="item.icon">
          </div>
          <div class="right-item">
            <div class="equipment-name">
              <h3>{{ item.name }}</h3>
            </div>
            <div class="equipment-number">{{ item.number }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {homeList} from "@/api/setting/setting"

export default {
  name: "Index",
  data() {
    return {
      equipData: [
        {
          name: "显示总发布数量",
          number: 200,
          icon: require("@/assets/images/home/all-pub.png"),
          id: 1
        },
        {
          name: "今日发布数量",
          number: 3,
          icon: require("@/assets/images/home/pub.png"),
          id: 2
        },
        {
          name: "小程序用户总数量",
          number: 1000,
          icon: require("@/assets/images/home/all-user.png"),
          id: 3
        },
        {
          name: "今日活跃用户数",
          number: 5,
          icon: require("@/assets/images/home/user.png"),
          id: 4
        }
      ],
    };
  },
  created() {
    this.getHomeList()
  },
  methods: {
    getHomeList() {
      homeList().then(res=>{
        if(res.code===200) {
          this.equipData[0].number = res.data.allPublic
          this.equipData[1].number = res.data.todayPublic
          this.equipData[2].number = res.data.allUser
          this.equipData[3].number = res.data.todayUser
        }
      })
    },
  }
};
</script>

<style scoped lang="scss">
.home {
  margin: 20px;

  .list-container {
    display: flex;
    justify-content: space-between;

    .item {
      width: 24%;
      height: 13rem !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
      font-size: 24px;

      &.item-0 {
        background-color: #1e9fff;
      }

      &.item-1 {
        background-color: #47a96c;
      }

      &.item-2 {
        background-color: #ff5722;
      }

      &.item-3 {
        background-color: #393d49;
      }

      .left-item {
        width: 50%;
        text-align: center;

        .icon {
          width: 60px;
          height: 60px;
        }
      }

      .right-item {
        text-align: center;
        flex: 1;

        .equipment-name {
          font-size: 1.17rem;
        }

        .equipment-number {
          margin-top: 10px;
          font-size: 3rem;
        }
      }
    }
  }
}
</style>

