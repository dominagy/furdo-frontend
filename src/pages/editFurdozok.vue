<script setup lang="ts">
  import { useFurdozo, useFurdozokStore } from "src/store/furdozo"; 
  // import { useHelyisegStore } from ;
  import router from "src/router";
import { useHelyiseg } from "src/store/helyiseg";

  const furdozokStore = useFurdozo();
  const helyisegekStore = useHelyiseg();

  onMounted(() => {
    helyisegekStore.getAll();
  });

  function Submit() {
    furdozokStore.create();
  }

  function Reset() {
    router.push("/qtablestreet");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="furdozokStore.furdo" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-select
            v-model.number="furdozokStore.furdo.helyiseg"
            clearable
            emit-value
            filled
            label="helyiség"
            map-options
            option-label="helyiség"
            option-value="id"
            :options="helyisegekStore.data1"
          />
          <q-input v-model.number="furdozokStore.furdo.furdozoid" filled label="Furdőző id:" type="number" />
          <q-input v-model="furdozokStore.furdo.ki" filled label="Belépés:" type="number" :rules="[val => val < 2 && val >= 0 ||'0 a kilépés 1 a belépés']" />
          <q-input v-model.number="furdozokStore.furdo.ora" filled label="Óra:" type="number" :rules="[val => val < 21 && val >= 6 ||'A fürdő 6-21-ig van nyitva!']" />
          <q-input v-model="furdozokStore.furdo.perc" filled label="Perc:" type="number" :rules="[val => val < 60 && val >= 0 ||'0 és 60 közé kell esni']"/>
          <q-input v-model="furdozokStore.furdo.masodperc" filled label="Másodperc:" type="number" :rules="[val => val < 60 && val >= 0 ||'0 és 60 közé kell esni']"/>
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <p>Actual: {{ furdozokStore.furdo }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
