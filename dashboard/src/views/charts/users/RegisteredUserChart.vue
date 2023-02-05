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
import { time } from "console";
import { Icon } from "@iconify/vue";
const props = defineProps(["days", "title"]);

const chartOptions = ref<ApexOptions>({
  chart: {
    id: "total-user-chart",
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
            icon: `
              <ax-btn
                class="btn btn-circle btn-small cursor-pointer mr-1"
                :icon="'mdi:cards-heart-outline'"
                size="50"
              >D</ax-btn>`,
            click: function (e, chartContext) {
              console.log(e, chartContext, "day");
              fetchTotalUserBy("day");
            },
          },
          {
            icon: `
              <ax-btn
                class="btn btn-circle btn-small cursor-pointer mr-1"
                :icon="'mdi:cards-heart-outline'"
                size="50"
              >W</<ax-btn>`,
            click: function (e, chartContext) {
              console.log(e, chartContext, "week");
              fetchTotalUserBy("week");
            },
          },
          {
            icon: `
              <ax-btn
                class="btn btn-circle btn-small cursor-pointer mr-1"
                :icon="'mdi:cards-heart-outline'"
                size="50"
              >M</<ax-btn>`,
            click: function (e, chartContext) {
              console.log(e, chartContext, "month");
              fetchTotalUserBy("month");
            },
          },
          {
            icon: `
              <Icon
                class="btn btn-circle btn-small cursor-pointer mr-1"
                :icon="'mdi:cards-heart-outline'"
                size="50"
              >Y</Icon>`,
            click: function (e, chartContext) {
              console.log(e, chartContext, "year");
              fetchTotalUserBy("year");
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
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
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
  fetchTotalUserBy("week");
});

const fetchTotalUserBy = (period: string) => {
  axios
    .get(`users/registrations/${period}`)
    .then((res) => {
      if (res.data) {
        series.value[0].data = res.data;
      }
    })
    .catch(console.error);
};
</script>
