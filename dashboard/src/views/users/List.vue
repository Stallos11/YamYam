<template>
  <Transition name="scale">
    <div>
      <div class="grix xs1 sm2">
        <div>
          <ApexChart :period="'week'" :url="'users/registrations'" :title="'Registered users'"/>
        </div>
        <div>
          <ApexChart
            :period="'week'" :url="'users/total'" :title="'Total users'"/>
        </div>
      </div>
      <Table :store="'users'" :headers="userTableHeaders"  :filter-key-options="userFilterKeyOptions" />
      <UserModal />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import UserModal from "./UserModal.vue";
import Table from "../../components/Table.vue";
import ApexChart from "../../components/ApexChart.vue";
import { userTableHeaders, userFilterKeyOptions } from "../../models/user"
</script>
