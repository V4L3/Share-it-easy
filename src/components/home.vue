<template>

    <div>
        <div class="user">
          <img src="../img/userimg.svg" alt="">
        </div>

        <div class="myprojects">
          <div class="project">
            <h3>MY Projects</h3>
          </div>
          
          <div  v-for="projectName of projects" v-bind:key="projectName['.key']">
            
            <div v-for="userName of projectName.users" v-bind:key="userName['.key']">             
            <div v-if="userName == uid">
              
                <div class="project">
                  <div class="links" v-if="!projectName.edit">
                    <router-link :to="'/project/' + projectName['.key']">
                      {{projectName.title}} 
                    </router-link>
                    <div class="edit">
                      
                      <button @click="editProject(projectName['.key'])"><img src="../img/edit.svg" alt="Edit"></button>
                    </div>
                  </div>
                  <div class="links" v-else>
                    <input type="text" v-model="projectName.title">
                    
                    <div class="edit">
                      <button @click="removeProject(projectName['.key'])">Remove</button>
                      <button @click="saveEdit(projectName)">Save</button>
                      <button @click="cancelEdit(projectName['.key'])">Cancel</button>
                    </div>

                  </div>

                  <hr align="left">

              </div>
            </div>
            </div>
          </div>
        </div>

          <div class="addButton">
            <button  @click="showModal = true">
              <img src="../img/addentry.svg" alt="Add Entry">  
            </button>            
          </div>

          <div style="margin-top: 0px;" class="signUpBtn">
            <button style="color:white;" class="logout" @click="logOut()">LOG OUT</button>
          </div>
        
        <projectModal  v-if="showModal" @close="showModal = false"></projectModal>

    </div>
</template>
<script>
import { projectRef } from "../firebase";
import { entryRef } from "../firebase";
import { auth } from "../firebase";

export default {
  name: "home",
  data() {
    return {
      title: "",
      showModal: false,
      authStatus: auth.currentUser,
      uid: auth.currentUser.uid,
    };
  },
  methods: {
    addProject: function() {
      let key = projectRef.push().getKey();
      projectRef.child(key).set({ title: this.title, edit: false });
      //entryRef.child(key).set()
      this.title = "";
    },
    removeProject: function(key) {
      projectRef.child(key).remove();
      entryRef.child(key).remove();
    },
    editProject: function(key) {
      projectRef.child(key).update({ edit: true });
    },
    cancelEdit: function(key) {
      projectRef.child(key).update({ edit: false });
    },
    saveEdit: function(project) {
      const key = project[".key"];
      projectRef.child(key).update({ title: project.title, edit: false });
    },
    logOut: function() {
      auth.signOut();
      this.$router.push('/sign-in')
    }
  },
  firebase: {
    projects: projectRef
  },
  mounted: function(){
    // console.log(uid)
  }
};
</script>
