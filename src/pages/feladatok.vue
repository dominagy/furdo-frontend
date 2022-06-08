<script setup lang="ts">
    import { useHelyiseg } from "../store/helyiseg";
    import { useFurdozo, IFurdozo } from "../store/furdozo";

  //   import { date } from "quasar";
  //   import router from "src/router";

    const storeF = useFurdozo();
    // const store1 = useStore1();

    onMounted(() => {
      // store1.getAll();
      storeF.getAll();
      // storeF.furdo = {};
    });

    const elsoFurdozo = () => {
      console.log(storeF.furdoN.length)
      let minPerc = 60;
      let minMasodperc = 60;
      for (const e of storeF.furdoN) {
        if(e.ki! == 1 && e.ora! == 6 ) {
          if (e.perc! < minPerc) {
            minPerc = e.perc!;
            if (e.perc! == minPerc) {
              minMasodperc = 60;
            }
            if (e.masodperc! <= minMasodperc) {
              minMasodperc = e.masodperc!;
            }
          }
        }
      };
      return `6:${minPerc}:${minMasodperc}`;
    };

    const utolsoFurdozo = () => {
      let maxOra = 5;
      let maxPerc = 0;
      let maxMasodperc = 0;
      for (let e of storeF.furdoN) {
        if (e.helyiseg!._id! == 0 && e.ki! == 1 && e.ora! > maxOra) {
          maxOra = e.ora!;
          if (e.perc! > maxPerc) {
            maxPerc = e.perc!;
            if (e.masodperc! > maxMasodperc) {
              maxMasodperc = e.masodperc!;
            }
          }
          if (e.perc! == maxPerc) {
            maxMasodperc = e.masodperc!;
          }
        }
        if (e.helyiseg!._id! == 0 && e.ki! == 1 && e.ora! == maxOra) {
          maxPerc = e.perc!;
          if (e.masodperc! > maxMasodperc) {
            maxMasodperc = e.masodperc!;
          }
        }
      };
      return `${maxOra}:${maxPerc}:${maxMasodperc}`;
    };

    const csakEgyReszleg = () => {
      let szamlalo = 0;
      let reszleg = 0;
      let ids : number[] = [];
      for (let e of storeF.furdoN) {
        if (!ids.includes(e.furdozoid!)) {
          ids.push(e.furdozoid!);
        }
      }
      for (let e of ids) {
        for (const i of storeF.furdoN) {
          if (i.helyiseg?._id != 0) {
            
          }
        }
      }
    }

</script>

<template>
<q-page>
  <div>
    <p>2. feladat</p>
    <div >
      <p >
        Az első idő {{ elsoFurdozo() }} 
      </p>
    </div>
  </div>
  <div>
    <p>2. feladat</p>
    <div >
      <p >
        Az utolsó idő {{ utolsoFurdozo() }} 
      </p>
    </div>
  </div>
</q-page>
</template>

<style lang="scss" scoped></style>
