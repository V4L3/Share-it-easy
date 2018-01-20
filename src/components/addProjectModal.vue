<template>
  
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                <!-- <h3>Neues Project</h3> -->
            </slot>
            <button class="modal-default-button" @click="$emit('close')">
                x
            </button>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="loginField">
                <p>PROJECT TITLE</p>
                <input v-model="title" type="text"  value="">
              </div>

              <div class="loginBtn">
                <button v-on:click="addProject()" @click="$emit('close')">
                <p>ADD Project</p>  
                </button> 
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!-- <button class="modal-default-button" v-on:click="addProject()" @click="$emit('close')">
                ADD Project
              </button> -->
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { projectRef } from "../firebase";
import {auth} from '../firebase';

export default {
  name: "entryModal",
  data() {
    return {
      title: ""
    };
  },
  props: ["id"],
  mounted: function() {},
  methods: {
    addProject: function() {
      let key =  projectRef.push().getKey()
      let currentUser = auth.currentUser.uid
      projectRef.child(key).set({ title: this.title, edit: false});
      //projectRef.child(key).child("/users").child(auth.currentUser.uid).set(true);
      projectRef.child(key).child("/users").push(auth.currentUser.uid);
      //entryRef.child(key).set()
      this.title = "";
    }
  }
};
</script>

