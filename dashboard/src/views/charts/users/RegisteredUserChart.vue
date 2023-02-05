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
const props = defineProps(["days", "title"]);

const chartOptions = ref<ApexOptions>({
  chart: {
    id: "registered-user-chart",
    toolbar: {
      show: false,
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

const series = ref([
  {
    name: "series-1",
    data: [
      {
        x: "10 Juil",
        y: 45,
      },
    ],
  },
]);

onBeforeMount(() => {
  axios
    .get(`users/registrations/${props.days}`)
    .then((res) => {
      const today = new Date();
      const priorDays = props.days;
      // console.log(new Date(res.data[0].created_at).toLocaleDateString());

      let data: any[] = [];

      for (let i = 0; i < priorDays; i++) {
        var priorDate = new Date(
          new Date().setDate(today.getDate() - priorDays + i)
        );

        // console.log(priorDate.toLocaleDateString());
        const x = priorDate.toLocaleDateString();
        const y = res.data.filter(
          (user: any) =>
            new Date(user.created_at).toLocaleDateString() ===
            priorDate.toLocaleDateString()
        ).length;

        data.push({ x, y });
      }

      series.value = [
        {
          name: "series-1",
          data,
        },
      ];
    })
    .catch(console.error);
});
</script>
