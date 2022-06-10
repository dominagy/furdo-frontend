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

  interface IFurdozoAdat {
    id: number;
    adatok: IFurdozo[];
  }

  const furdozoAndIdList = (): IFurdozoAdat[] => {
    let ids: number[] = [];
    for (let e of storeF.furdoN) {
      if (!ids.includes(e.furdozoid!)) {
        ids.push(e.furdozoid!);
      }
    }
    let list: IFurdozoAdat[] = [];
    ids.forEach((id: number) => list.push({ id: id, adatok: [] }));
    for (let i = 0; i < storeF.furdoN.length; i++) {
      list.forEach((elem) => {
        if (storeF.furdoN[i].furdozoid === elem.id) {
          (elem.adatok as IFurdozo[]).push(storeF.furdoN[i]);
        }
      });
    }
    return list;
  };

  const ids = () => {
    let ids: number[] = [];
    for (let e of storeF.furdoN) {
      if (!ids.includes(e.furdozoid!)) {
        ids.push(e.furdozoid!);
      }
    }
    return ids;
  };

  const elsoFurdozo = () => {
    console.log(storeF.furdoN.length);
    let minPerc = 60;
    let minMasodperc = 60;
    for (const e of storeF.furdoN) {
      if (e.ki! == 1 && e.ora! == 6) {
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
    }
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
    }
    return `${maxOra}:${maxPerc}:${maxMasodperc}`;
  };

  const csakEgyReszleg = () => {
    let szamlalo = 0;
    let reszleg: number[] = [];
    let ids: number[] = [];
    for (let e of storeF.furdoN) {
      if (!ids.includes(e.furdozoid!)) {
        ids.push(e.furdozoid!);
      }
    }
    for (let e of ids) {
      for (let i of storeF.furdoN) {
        if (e == i.furdozoid) {
          if (i.helyiseg!._id! != 0 && !reszleg.includes(i.helyiseg!._id!)) {
            reszleg.push(i.helyiseg!._id!);
          }
        }
      }
      if (reszleg.length == 1) {
        szamlalo++;
      }
      reszleg = [];
    }
    return szamlalo;
  };

  const legtobb = () => {
    let leghosszabbIdo = 0;
    let vendeg;
    let erkezes: number = 0;
    let tavozas: number = 0;
    for (let e of furdozoAndIdList()) {
      for (let furdozo of e.adatok) {
        // if (e.id == furdozo.furdozoid!) {
        if (furdozo.helyiseg!._id! == 0 && furdozo.ki == 1) {
          erkezes = furdozo.ora! * 3600 + furdozo.perc! * 60 + furdozo.masodperc!;
        }
        if (furdozo.helyiseg!._id == 0 && furdozo.ki! == 0) {
          tavozas = furdozo.ora! * 3600 + furdozo.perc! * 60 + furdozo.masodperc!;
        }
        // }
      }
      const benttartozkodas = tavozas - erkezes;
      if (benttartozkodas > leghosszabbIdo) {
        leghosszabbIdo = benttartozkodas;
        vendeg = e.id;
      }
    }
    let ora = Math.floor(leghosszabbIdo / 3600);
    let perc = Math.floor((leghosszabbIdo - ora * 3600) / 60);
    let masodperc = leghosszabbIdo - ora * 3600 - perc * 60;
    return `${vendeg}. vendég ${ora}:${perc}:${masodperc}`;
  };

  const hattol = () => {
    let szamlalo = 0;
    for (let e of furdozoAndIdList()) {
      for (let furdozo of e.adatok) {
        if (furdozo.helyiseg!._id! == 0 && furdozo.ki == 1 && furdozo.ora! < 9) {
          szamlalo++;
        }
      }
    }
    return `6-9 óra között ${szamlalo} vendég`;
  };
  const kilenctol = () => {
    let furdozok: number[] = [];
    for (let e of furdozoAndIdList()) {
      for (let furdozo of e.adatok) {
        if (
          furdozo.helyiseg!._id! == 0 &&
          furdozo.ki == 1 &&
          furdozo.ora! > 8 &&
          furdozo.ora! < 16 &&
          !furdozok.includes(furdozo.furdozoid!)
        ) {
          furdozok.push(furdozo.furdozoid!);
        }
      }
    }
    return `9-16 óra között ${furdozok.length} vendég`;
  };
  const tizenhattol = () => {
    let szamlalo = 0;
    for (let e of furdozoAndIdList()) {
      for (let furdozo of e.adatok) {
        if (
          furdozo.helyiseg!._id! == 0 &&
          furdozo.ki == 1 &&
          furdozo.ora! > 15 &&
          furdozo.ora! < 20
        ) {
          szamlalo++;
          console.log(e.adatok);
        }
      }
    }
    return `16-20 óra között ${szamlalo} vendég`;
  };
</script>

<template>
  <q-page>
    <div>
      <p>2. feladat</p>
      <div>
        <p>Az első vendég {{ elsoFurdozo() }}-kor lépett be az öltözőbe</p>
        <p>Az utolsó vendég {{ utolsoFurdozo() }}-kor lépett ki az öltözőből</p>
      </div>
    </div>
    <div>
      <p>3. feladat</p>
      <div>
        <p>A fürdőben {{ csakEgyReszleg() }} vendég járt csak egy részlegen</p>
      </div>
    </div>
    <div>
      <p>4. feladat</p>
      <div>
        <p>A legtöbb időt eltöltő vendég:</p>
        <p>{{ legtobb() }}</p>
        </div>
    </div>
    <div>
      <p>5. feladat</p>
      <div>
        <p> {{ hattol() }}</p>
        <p> {{ kilenctol() }}</p>
        <p> {{ tizenhattol() }}</p>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
