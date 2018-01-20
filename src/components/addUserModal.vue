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
                <p>USER EMAIL:</p>
                <input v-model="mail" type="text"  value="">
              </div>

              <div class="loginBtn">
                <button v-on:click="addUser(mail)" @click="$emit('close')">
                <p>ADD USER</p>  
                </button> 
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { userRef } from "../firebase";
import { projectRef } from "../firebase";


export default {
  name: "entryModal",
  data() {
    return {
      mail: "",
      user: [],
      project: projectRef.child(this.id),
    };
  },
  props: ["id"],
  mounted: function(){
    this.$bindAsArray("user", userRef);
  },
  methods: {
    addUser: function(email) {
      this.user.forEach(element => {
        if (email == element.email) {
          //console.log(this.$firebaseRefs.project.child(this.id).child("/users"))
          let tempUid = JSON.stringify(element.uid);
          //this.$firebaseRefs.project.child(this.id).child("/users").child(element.uid).set(true)
          this.$firebaseRefs.project.child(this.id).child("/users").push(element.uid)
        }
      });
    }
  },
  firebase: {
    users: userRef,
    project: projectRef
  }
};
</script>

