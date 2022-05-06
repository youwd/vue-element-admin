<template>
  <div class="listitem" >
      <a-row class="listitemrow1" type="flex" align="middle">
        <a-col :span="8">
          <div style="padding-left:10px">{{projectInfo.projectCode}}</div>
        </a-col>
        <a-col :span="10">
          <div>{{projectInfo.projectName}}</div>
        </a-col>
        <a-col :span="6">
          <div class="tagcenter">
             <a-tag color="#66c9f5" style="margin-left:8px">
                临时安排
            </a-tag>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-row style="padding-top:7px;padding-bottom:7px;">
          <a-col :span="8">
          <div style="padding-left:10px;">市场合同</div>
        </a-col>
        <a-col :span="16">
          <div>{{projectInfo.customerName}}</div>
        </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
          <div style="padding-left:10px">{{projectInfo.managerUserName}}
          </div>
        </a-col>
        <a-col :span="16">
          <div>{{projectInfo.scheduleStartDate}}~{{projectInfo.scheduleEndDate}}</div>
        </a-col>
        </a-row>
      </a-row>
    </div>
</template>


<script>
export default {
   props: {
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },
  
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 10px;
}
.listitem{
  width: 100%;
  padding: 10px;
}
.listitemrow1{
  background-color: #f0f0f1;
  width:100%;
}

.tagcenter {
  display: flex;
  justify-content: center;
}

</style>
