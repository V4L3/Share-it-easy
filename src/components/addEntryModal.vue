<template>
  
    <transition name="modal">
    <div class="modal-mask" >
      <div class="modal-wrapper">
        <div class="modal-container" >

          <div class="modal-header">
            <slot name="header">
                <!-- <h3>Neuer Einkauf</h3> -->
            </slot>
            <button class="modal-default-button" @click="$emit('close')">
                x
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="loginField">
                <p>BOUGHT ARTICLE:</p>
                <input v-model="title" type="text"  value="">
              </div> 

              <div class="loginField">
                <p>AMOUNT:</p>
                <input v-model="amount" type="number"  value="">
              </div>

              <div class="loginField">
                <!-- <p>DATE OF PURCHASE:</p> -->
                <p class="datepicker"><datepicker v-model="state.date" language="de"></datepicker></p>
              </div>

              <div class="loginBtn">
                <button v-on:click="addEntry(title, amount)" @click="$emit('close')">
                  <p>ADD ENTRY</p>
                </button>
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!-- <p class="modal-default-button" v-on:click="addEntry(title, amount)" @click="$emit('close')">
                ADD ENTRY
              </p> -->
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { entryRef } from "../firebase";
import { auth } from '../firebase';

export default {
  name: "entryModal",
  data() {
    return {
      title: "",
      amount: "",
      state: { date: new Date() },
      project: entryRef.child(this.id)
    };
  },
  props: ["id"],
  mounted: function() {},
  firebase: {
    projects: entryRef
  },
  methods: {
    addEntry: function(titel, amount) {
      // console.log(entryRef.child(this.id).child("entrys"))
      entryRef.child(this.id).push({
          title: titel,
          amount: amount,
          date: moment(this.state.date).format("Do MMM"),
          user: auth.currentUser.uid,
          edit: false
        });
    }
  }
};
</script>

