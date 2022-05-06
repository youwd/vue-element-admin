<template>
  <div>
   <!-- <a-row> -->
      <a-col :span="8">
        <div class="toolbar">
          <a-input-search  style="width: 100%" @search="getTaskList" />
        </div>
        <div class="dropdown">
           <a-dropdown style="width:40%">
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />待安排</a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />正式安排 </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />临时安排</a-menu-item>
      </a-menu>
      <a-button > 安排状态 <a-icon type="down" /> </a-button>
    </a-dropdown>
    <a-dropdown style="width:40%">
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />市场合同 </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />前台受理单 </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />院内任务 </a-menu-item>
        <a-menu-item key="4"> <a-icon type="user" />其他 </a-menu-item>
      </a-menu>
      <a-button > 工程来源 <a-icon type="down" /> </a-button>
    </a-dropdown>
    <a-button icon="filter" style="width:20%">
      筛选
    </a-button>
        <div v-for="(item,index) in taskList" :key="index" @click="getTaskDetail(item.id)">
          <ListItem :projectInfo="item"/>
        </div>
       
        <div class="toright">
          <span>共 4 条</span>
          <a-pagination v-model="current" :total="4" :defaultPageSize="4" size="small" show-less-items />
        </div>
        </div>
      </a-col>
      <a-col :span="16">
        <div class="taskarrangetitle">
          <span class="taskarrange">任务安排管理</span> 
        </div>
        <div class="header">
          <div class="headerleft"></div>
          <div class="headerright">工程信息</div>
          </div>
          <div>
       <a-form class="ant-advanced-search-form" :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">工程编号：</div>  
            <div >{{taskDetail.projectCode}}</div>
          </div>       
        </a-col>
         <a-col :span="12">
          <div class="formItem">
            <div class="formTile">工程名称：</div>  
          <div >{{taskDetail.projectName}}</div>
          </div>
        </a-col>
      </a-row>
            <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">工程类型：</div>  
            <div ></div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
            <div class="formTile">工程状态：</div>  
            <div >{{taskDetail.registerStatus}}</div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">客户名称：</div>  
            <div >{{taskDetail.customerName}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
          <div class="formTile">经办人：</div>    
            <div>{{taskDetail.createUserName}}</div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">订单/合同：</div>
          <div>年度框架协议</div>
          </div>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">作业分院：</div>  
            <div>{{taskDetail.branchOrgName}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
          <div class="formTile">作业部门：</div>    
            <div>{{taskDetail.orgName}}</div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">工程进度：</div>
          <div>/</div>
          </div>
      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">委托内容：</div>
          <div>/</div>
          </div>
      </a-row>
       </a-form> 
             <div class="header">
          <div class="headerleft"></div>
          <div class="headerright">工程安排</div>
          </div>
              <a-form class="ant-advanced-search-form" :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">作业部门：</div>  
            <div >{{taskDetail.orgName}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
            <div class="formTile">安排产值：</div>  
            <div ></div>
          </div>
        </a-col>
      </a-row>
            <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">工程负责人：</div>  
            <div >{{taskDetail.directorUserName}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
            <div class="formTile">安排情况：</div>  
            <div >{{taskDetail.status=='TEMP_ARRANGED' ? '临时安排': '正式安排' }}</div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">安排开始日期：</div>  
            <div >{{taskDetail.arrangeStartTime}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
          <div class="formTile">安排完成日期：</div>    
            <div>{{taskDetail.arrangeEndTime}}</div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">项目分包类别：</div>
          <div>年度协议框架</div>
          </div>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="formItem">
            <div class="formTile">分包截止时间：</div>  
            <div >{{taskDetail.subpackageDeadlineTime}}</div>
          </div>
        </a-col>
         <a-col :span="12">
          <div class="formItem">
          <div class="formTile">分包登记状态：</div>    
            <div>/</div>
          </div>
        </a-col>

      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">框架协议：</div>
          <div>/</div>
          </div>
      </a-row>
      <a-row :gutter="24">
        <div class="formItem left12">
          <div class="formTile">安全与环境要求：</div>
          <div class="AQHJ">
            <div class="AQHJTitle"> {{requireNew.title}}：</div>
            <div class="AQHJValue" v-html="requireNew.content"></div>
           
            </div>
          </div>
      </a-row>
       </a-form> 
          </div>
     <div class="button">
      <a-button type="primary" @click="showDrawer">
      任务安排
    </a-button>
    </div>
    </a-col>
    <div class="taskArrangeDraw">
       <a-drawer
      title="Create a new account"
      :visible="visible"
      width="100%"
      :get-container="false"
      :body-style="{ paddingBottom: '80px' }"
      :wrap-style="{ position: 'absolute' }"
      @close="onClose"
      >
    <div class="button1">
     <a-button @click="showModal">查看负责人项目情况</a-button>
          </div>  
     <div class="taskmodal" ref="reftaskmodal">
       <a-modal v-model="taskmodalvisible" title="负责项目情况" :get-container="false" :wrap-style="{ position: 'absolute' }" ok-text="确认" cancel-text="取消" :footer="null" width ="80%" centered="true" @ok="hideModal">
      <div class="taskFormHeader">
            <div class="taskFormLabel">
              选择部门：
            </div>
            <div class="taskFormValue">
               <a-select  style="width: 100%" @change="handleChange">
                  <a-select-option :key="1">
                市政工程院总部
              </a-select-option>
              <a-select-option :key="2">
                轨道工程测量部
              </a-select-option>
              <a-select-option :key="3">
                市政工程测量部
              </a-select-option>
              <a-select-option :key="4">
                管线工程部
              </a-select-option>
             </a-select>
            </div>
            <div>
              <a-button type="primary">
              查询
              </a-button>
            </div>
        </div>
      <div class="taskarrangetable">
          <a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
      </div>
    </a-modal>
    </div>  
    <div class="taskArrangeDrawBody">
        <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              作业分院：
            </div>
            <div class="t-DrawBodyItemValue">
              市政工程院
            </div>
        </div>
         <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              作业部门：
            </div>
           <div class="t-DrawBodyItemValue">
             <!-- <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"> 市政工程院总部 </a-menu-item>
                <a-menu-item key="2"> 轨道工程测量部 </a-menu-item>
                <a-menu-item key="3"> 管线工程部 </a-menu-item>
                <a-menu-item key="4"> 市政工程测量部 </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px;width:100%"> 管线工程部 <a-icon type="down" /> </a-button>
            </a-dropdown> -->

             <a-select  style="width: 100%" @change="handleChange">
              <!-- <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option> -->
              <a-select-option :key="1">
                市政工程院总部
              </a-select-option>
              <a-select-option :key="2">
                轨道工程测量部
              </a-select-option>
              <a-select-option :key="3">
                管线工程部
              </a-select-option>
              <a-select-option :key="4">
                市政工程测量部
              </a-select-option>
              </a-select>
        </div>
         </div>
         <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              选择工程负责人：
            </div>
            <div class="t-DrawBodyItemValue">
               <a-select  style="width: 100%" @change="handleChange">
                  <a-select-option :key="1">
                name1
              </a-select-option>
              <a-select-option :key="2">
                name2
              </a-select-option>
              <a-select-option :key="3">
                name3
              </a-select-option>
              <a-select-option :key="4">
                name4
              </a-select-option>
             </a-select>
            </div>
        </div>
         <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              安排产值： 
            </div>
            <div class="t-DrawBodyItemValue">
                <a-input-number id="inputNumber" v-model="value" :min="1" :max="10" style="width:70%" @change="onChange" />
              <div style="display:flex;align-items:center;padding: 0 11px; background: #fafafa; border-radius:4px;height:32px">元</div>
                  <div class="button2">
                  <a-button @click="showDrawer">查看预算</a-button>
          </div>  
            </div>
        </div>
        <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              安排开始日期：
            </div>
            <div class="t-DrawBodyItemValue">
                <a-date-picker style="width:100%" @change="onChange" />
            </div>
        </div>
        <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              安排完成日期：
            </div>
            <div class="t-DrawBodyItemValue">
                <a-date-picker style="width:100%" @change="onChange" />
            </div>
        </div>
        <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              项目分包类别：
            </div>
            <div class="t-DrawBodyItemValue">
               <a-select  style="width: 100%" @change="handleChange">
                  <a-select-option :key="1">
                年度协议框架
              </a-select-option>
              <a-select-option :key="2">
                name2
              </a-select-option>
              <a-select-option :key="3">
                name3
              </a-select-option>
              <a-select-option :key="4">
                name4
              </a-select-option>
             </a-select>
            </div>
        </div>
        <div class="taskArrangeDrawBodyItem itemWidth">
            <div class="t-DrawBodyItemTitle">
              分包截止时间：
            </div>
            <div class="t-DrawBodyItemValue">
                <a-date-picker style="width:100%" @change="onChange" />
            </div>
        </div>
        <div class="itemLarge">
            <div class="t-DrawBodyItemTitle1">
              任务内容:
            </div>
            <div class="t-DrawBodyItemValue1">
              <a-textarea
                v-model="value"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                style="width:100%"
              />
            </div>
        </div>
        <div class="itemLarge">
            <div class="t-DrawBodyItemTitle1">
              安全与环境要求：
            </div>
            <div class="t-DrawBodyItemValue1">
               <a-select  style="width: 100%" @change="handleChange">
                  <a-select-option :key="1">
                name1
              </a-select-option>
              <a-select-option :key="2">
                name2
              </a-select-option>
              <a-select-option :key="3">
                name3
              </a-select-option>
              <a-select-option :key="4">
                name4
              </a-select-option>
             </a-select>
            </div>
        </div>
    </div>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="onClose">
          Submit
        </a-button>
      </div>
    </a-drawer>
    </div>
    <!-- </a-row> -->
  </div>
</template>
<script>
import GithubCorner from "@/components/GithubCorner";
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
import RaddarChart from "./components/RaddarChart";
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
import ListItem from "./components/ListItem";
import {taskList,taskDetail} from '@/api/taskarrange'
const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    scopedSlots: { customRender: 'number' },
  },
  {
    title: '部门',
    className: 'department',
    dataIndex: 'department',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '总工程数',
    className: 'totalProNum',
    dataIndex: 'totalProNum',
  },
  {
    title: '正式安排',
    className: 'formalArr',
    dataIndex: 'formalArr',
  },
  {
    title: '临时安排',
    className: 'interimArr',
    dataIndex: 'interimArr',
  },
];
const data = [
  {
    key: '1',
    number: '1',
    department: '管线工程部',
    name: '邱锦灵',
    totalProNum:"0",
    formalArr:"0",
    interimArr:"1",
  },
  {
    key: '1',
    number: '2',
    department: '管线工程部',
    name: '游伟东',
    totalProNum:"0",
    formalArr:"0",
    interimArr:"1",
  },
  {
    key: '1',
    number: '3',
    department: '管线工程部',
    name: '韩建威',
    totalProNum:"0",
    formalArr:"0",
    interimArr:"1",
  },
    {
    key: '1',
    number: '4',
    department: '市政工程测量部',
    name: '王恩龙',
    totalProNum:"0",
    formalArr:"0",
    interimArr:"1",
  },
];
export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    // PanelGroup,
    // LineChart,
    RaddarChart,
    ListItem,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  mounted(){
    this.getTaskList()
  },
  computed: {
   
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      current: 1,
      total:4,
      count:10,
      visible: false,
      taskmodalvisible:false,
      data,
      columns,
         params: {
        size: 10,
        current: 1
      },
      params1: {
        projectId: "1503623632419217410"
      },
      taskList:[],
      taskDetail:{},
      requireNew:{title:"",content:""}
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    showModal() {
      this.taskmodalvisible = true;
    },
    hideModal() {
      this.taskmodalvisible = false;
    },

    async getTaskList(){
      const res = await taskList(this.params);
      this.taskList =res.data.records;
      this.getTaskDetail(this.taskList[0].id)

      console.log(this.taskList);
    },
     async getTaskDetail(projectId){
      this.params1.projectId = projectId;
      const res = await taskDetail(this.params1);
      this.taskDetail =res.data;
      this.requireNew = res.data.require !=null ? JSON.parse(res.data.require) : {title:"",content:""}  
      console.log(this.taskDetail);
    },

    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    },
  },
};
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

.toright {
  display: flex;
  justify-content: right;
}
.taskarrange{
  font-size:16px;
  line-height: 1;
  padding-left: 8px;
  border-left: 4px solid #2b7efe;
  font-weight: bolder;
  color:#111f2c;
}
.taskarrangetitle{
  height: 72px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #eee;
  padding: 0 20px;
}
.ant-advanced-search-form {
  padding: 24px;
  border-bottom: 2px solid #eee;
  border-radius: 6px;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}
.formItem {
    display: flex;
  .formTile {
      width: 100px;
      font-size: 14px;
  }
}
.left12{  
  padding-left: 12px;
}
.AQHJ{
   .AQHJTitle{
    font-weight: bold;
  }
  .AQHJValue{
    white-space:pre-line;
  }
}
.header{
   display: flex;
   align-items: center;
   padding: 10px 20px;
  .headerleft{
    top: 50%;
    left: 0%;
    content: "";
    display: flex;
    height: 8px;
    width: 8px;
    margin-top: -4px;
    background: #ffc800;
    border-radius: 50%;
    border: 2px solid rgba($color: #ffc800, $alpha: 0.5);
  }
  .headerright{
    padding-left: 20px;
    font-size: 14px;
    color: #8f959d;
  }
}
.button{
  display: flex;
  padding: 15px;
  justify-content: center;
}
.taskArrangeDraw{
  width: 100%;
  height: 100%;
  .taskmodal{
  justify-content: center;
  padding-left: 500px;
  }
.taskArrangeDrawBody{
  display: flex;
  flex-wrap: wrap;
  .itemLarge{
    width:100% ;
    padding: 10px ;
    display: flex;
    .t-DrawBodyItemTitle1{
      width: 96px;
      height: 32px;  
    }
    .t-DrawBodyItemValue1{
      flex: 1;
    }
  }
  .taskArrangeDrawBodyItem{
    display: flex;
    padding: 10px;
    .t-DrawBodyItemTitle{
      width: 96px;
      height: 32px;  
    }
    .t-DrawBodyItemValue{
      display: flex;
      flex: 1;
      .button2{
        flex: 1;
        padding-left: 10px;
      }
    }
  }
  .taskArrangeDrawBodyItem2{
    display: flex;
    width:100%;
    padding: 10px;
    .t-DrawBodyItemTitle2{
      width: 20%;
      height: 32px;
    }
    .t-DrawBodyItemValue2{
      flex: 1;
    }
  }
}
@media screen and (max-width:1000px) {
  .itemWidth{
    width: 100%;
  }
}
@media screen and (min-width:1000px) {
  .itemWidth{
    width: 50%;
  }
}
  .button1{
    display: flex;
    justify-content: right;
    padding: 10px;
  }
  .taskFormHeader{
    display: flex;
  .taskFormLabel{
    justify-content: center;
    align-content: center;
  }
  .taskFormValue{
    width: 40%;
    padding: 0 20px;
  }
  }
  .taskarrangetable{
    padding:10px 0;
  }

 
}
</style>
