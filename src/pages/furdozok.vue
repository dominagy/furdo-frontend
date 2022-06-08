<script setup lang="ts">
     import { useFurdozo } from "../store/furdozo";
  //   import { date } from "quasar";
  //   import router from "src/router";

     const storeN = useFurdozo();
  //   const store1 = useStore1();

    onMounted(() => {
  //     store1.getAll();
      storeN.getAll();
    });

     const cols: any[] = [
    { name: "_id", label: "ID", field: "_id", align:"center" },
    { name: "furdozoid", label: "Fürdőző id", field: "furdozoid", align:"center" },
    { name: "helyiseg", label: "Helyiség", field: "helyiseg", align:"center" },
    { name: "ki", label: "Kilépés/Belépés", field: "ki", align:"center" },
    { name: "ora", label: "Óra", field: "ora", align:"center" },
    { name: "perc", label: "Perc", field: "perc", align:"center" },
    { name: "masodperc", label: "Másodperc", field: "masodperc", align:"center" },
    ];
</script>

<template>
  <div class="q-pa-md">
    <q-table :columns="cols" :rows="storeN.furdoN">
      <template #body-cell-helyiseg="props">
        <q-td :props="props">
          <img :title="props.value.helyiseg" :src="props.value.url" style="max-height:100px"/>
        </q-td>
      </template>
      
    </q-table>>
  </div>
</template>

<style lang="scss" scoped></style>
