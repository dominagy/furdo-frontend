<script setup lang="ts">
  import { useFurdozo } from "../store/furdozo";
  import router from "src/router";
  import { storeToRefs } from "pinia";
  import { useUsersStore } from "../store/usersStore";

  const storeN = useFurdozo();
  const userStore = useUsersStore();

  onMounted(() => {
    storeN.getAll();
  });

  const { isLoading, furdoN, pagination, selected } = storeToRefs(storeN);

  function deleteRecord(): void {
    storeN.deleteById();
  }

  function newRecord(): void {
    storeN.furdo = {};
    router.push("/newStreet");
  }

  function filterChanged(): void {
    selected.value = [];
  }

  function editRecord(): void {
    storeN.furdo = selected.value[0];
    storeN.getById();
    router.push("/editFurdozok");
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const cols: any[] = [
    { name: "_id", label: "ID", field: "_id", align: "center" },
    { name: "furdozoid", label: "Fürdőző id", field: "furdozoid", align: "center" },
    { name: "helyiseg", label: "Helyiség", field: "helyiseg", align: "center" },
    { name: "ki", label: "Kilépés/Belépés", field: "ki", align: "center" },
    { name: "ora", label: "Óra", field: "ora", align: "center" },
    { name: "perc", label: "Perc", field: "perc", align: "center" },
    { name: "masodperc", label: "Másodperc", field: "masodperc", align: "center" },
  ];
</script>

<template>
  <div class="q-pa-md">
    <q-table
      :columns="cols"
      :rows="storeN.furdoN"
      :selection="userStore.loggedUser ? 'multiple' : 'none'"
      v-model:selected="selected"
      row-key="_id"
    >
      <template #body-cell-helyiseg="props">
        <q-td :props="props">
          <img :title="props.value.helyiseg" :src="props.value.url" style="max-height: 100px" />
        </q-td>
      </template>
    </q-table>
    >
    <div class="row justify-center q-ma-sm q-gutter-sm">
      <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
        {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
      </q-btn>
      <q-btn
        v-show="userStore.loggedUser && selected.length == 0"
        color="green"
        no-caps
        @click="newRecord"
      >
        New record
      </q-btn>
      <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
        Edit record
      </q-btn>
      <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
        {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
      </q-btn>
    </div>
    <!-- <p>Pagination object: {{ pagination }}</p> -->
    <!-- <p>Selected array: {{ selected }}</p> -->
    <!-- <div>Filter: "{{ pagination.filter }}"</div> -->
  </div>
</template>

<style lang="scss" scoped></style>
