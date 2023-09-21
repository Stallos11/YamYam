<template>
  <div class="px-4 py-2">
    <VueApexCharts
      type="area"
      height="300"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>
<script setup lang="ts">
import { ApexOptions } from "apexcharts";
import { onBeforeMount, ref, defineProps } from "vue";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import { slugify } from "../utils/slugify";
const props = defineProps(["title", "url", "period"]);

const chartOptions = ref<ApexOptions>({
  chart: {
    id: slugify(props.title) + "chart",
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
        customIcons: [
          {
            icon: "D",
            click: function (e, chartContext) {
              fetchData("day");
            },
          },
          {
            icon: "M",
            click: function (e, chartContext) {
              fetchData("month");
            },
          },
          {
            icon: "Y",
            click: function (e, chartContext) {
              fetchData("year");
            },
          },
        ],
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      // @ts-ignore
      formatter: function (value, timestamp) {
        //@ts-ignore
        var a = new Date(timestamp);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = `${date} ${month} ${year}`;
        return time;
      },
    },
  },
  title: {
    text: props.title,
    align: "left",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#53dfdf",
    },
  },
  tooltip: {
    theme: "dark",
  },
});

const series: any = ref([
  {
    name: "total",
    data: [],
  },
]);

onBeforeMount(() => {
  fetchData(props.period);
});

const fetchData = (period: string) => {
  axios
    .get(`${props.url}/${period}`)
    .then((res) => {
      if (res) {
        series.value[0].data = res.data;
      }
      // let total = 0;

      series.value[0].data = series.value[0].data.map((serie: any, i: any) => {
        // if (i == 0) {
        //   total += parseInt(serie.y);
        // } else {
        //   total += parseInt(series.value[0].data[i].y);
        // }
        return {
          x: serie.x,
          y: serie.y,
        };
      });
    })
    .catch(console.error);
};
</script>
