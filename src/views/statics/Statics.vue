<template>
    <div class="state-wrapper">
        <!-- 折线图 -->
        <div class="polyline" ref="polyline"></div>
        <!-- 饼图 -->
        <div class="pie" ref="pie"></div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    data(){
        return{
            line:{
                days:[],
                count:[],
                count1:[]
            },
            pie:{
                title:[],
                list:{}
            }
        }
    },
    methods:{
        async initLine(){
            let rs = await this.$http.get('/api/state/line')
            // console.log("state line:",rs);
            this.line.days = rs.data.days
            this.line.count = rs.data.count
            this.line.count1 = rs.data.count1
            let options = {
                title:{
                    text:"近七天用户活跃度"
                },
                legend:{
                    data:["活跃度1","活跃度2"],
                    right:"0"
                },
                xAxis: {
                    type: 'category',
                    data: this.line.days
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:"活跃度1",
                        data: this.line.count,
                        type: 'line'
                    },
                    {
                        name:"活跃度2",
                        data: this.line.count1,
                        type: 'line'
                    }
                ]
            };
            let lineChart = echarts.init(this.$refs.polyline)
            lineChart.setOption(options);
        },
        async initPie(){
            let rsPie = await this.$http.get('/api/state/pie')
            this.pie.title = rsPie.data.title;
            this.pie.list = rsPie.data.list //[{value:}]
            this.pie.list.forEach((item,index)=>{
                item.name = this.pie.title[index]
            })
            let option = {
                title: {
                    text: '某站点用户访问来源',
                    subtext: 'xixixi',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:this.pie.title
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.pie.list,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            let pieChart = echarts.init(this.$refs.pie)
            
            pieChart.setOption(option);

        }
    },
    async created(){
    },
     mounted(){
        this.initLine()
        this.initPie()
    }
}
</script>
<style lang="less" scoped>
.state-wrapper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .polyline{
        width: 400px;
        height: 400px;
    }
    .pie{
        margin-left: 20px;
        width: 400px;
        height: 400px; 
    }
}
</style>