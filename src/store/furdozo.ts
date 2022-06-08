import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
// import router from "src/router";

Notify.setDefaults({
  position: "bottom",
  textColor: "white",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

export interface IFurdozo {
  id?: number; // PK
  furdozoid?: number; // FK
  helyiseg?: IHelyiseg;
  ki?: number;
  ora?: number;
  perc?: number;
  masodperc?: number;
}

interface IHelyiseg{
  _id?: number;
  helyiseg?: string;
  url?: string;
}

interface IState {
  furdoN: Array<IFurdozo>; // store documents (records) after get method(s)
  furdo: IFurdozo; // temporary object for create, edit and delete method
  furdoOld: IFurdozo; // temporary object for patch method (store furdo here before edit)
}

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = `Error on N-side: ${error.response.status} ${error.response.statusText}`;
  if (error.response.furdo) {
    msg += ` - ${error.response.furdo}`;
  }
  Notify.create({ message: msg, color: "negative" });
}

export const useFurdozo = defineStore({
  id: "storeF",
  state: (): IState => ({
    furdoN: [],
    furdo: {},
    furdoOld: {},
  }),
  getters: {},
  actions: {
    async getAll(): Promise<void> {
      Loading.show();
      this.furdoN = [];
      $axios
        .get("api/furdozok")
        .then((res) => {
          Loading.hide();
          if (res && res.data) {
            this.furdoN = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },
    async getById(): Promise<void> {
      if (this.furdo && this.furdo.id) {
        Loading.show();
        $axios
          .get(`api/furdozok/${this.furdo.id}`)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.furdo = res.data;
              Object.assign(this.furdoOld, this.furdo);
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
    async editById(): Promise<void> {
      if (this.furdo && this.furdo.id) {
        const diff: any = {};
        Object.keys(this.furdo).forEach((k, i) => {
          const newValue = Object.values(this.furdo)[i];
          const oldValue = Object.values(this.furdoOld)[i];
          if (newValue != oldValue) diff[k] = newValue;
        });
        if (Object.keys(diff).length == 0) {
          Notify.create({
            message: "Nothing changed!",
            color: "negative",
          });
          process.exit(0);
        }
        Loading.show();
        $axios
          .patch(`api/furdozok/${this.furdo.id}`, diff)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              this.furdo = {};
              this.getAll();
              Notify.create({
                message: `Document with id=${res.data.id} has been edited successfully!`,
                color: "positive",
              });
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
    async deleteById(): Promise<void> {
      if (this.furdo && this.furdo.id) {
        Loading.show();
        const id = this.furdo.id;
        $axios
          .delete(`api/furdozok/${this.furdo.id}`)
          .then(() => {
            Loading.hide();
            this.getAll();
            this.furdo = {};
            Notify.create({
              message: `Document with id=${id} has been deleted successfully!`,
              color: "positive",
            });
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
    async create(): Promise<void> {
      if (this.furdo) {
        Loading.show();
        delete this.furdo.helyiseg;
        $axios
          .post("api/furdozok", this.furdo)
          .then((res) => {
            Loading.hide();
            if (res && res.data) {
              // this.furdo = {};
              this.getAll();
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              // router.push({ name: "page_name" });
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
  },
});
