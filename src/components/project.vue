<template>
  <div>

      <div class="head-nav">
        <div class="project-title">
          <p>{{project.title}}</p>
        </div>
        <div class="back">
          <router-link to="/home">
              x
          </router-link>
        </div>
          
      </div>



      <div id="visual">
        <!-- <button v-on:click="component='barchart'">CHANGE TO BARCHART</button>
        <button v-on:click="component='timeline'">CHANGE TO TIMELINE</button>
        <button v-on:click="component='list'">CHANGE TO LIST</button> -->
    
    
       <div class="dots">
         <button class="" v-bind:class="{ active: left }" v-on:click="setLeft()">List</button>
       
          <button class="" v-bind:class="{ active: middle }" v-on:click="setMiddle()">Barchart</button>          
       
          <button class="" v-bind:class="{ active: right }" v-on:click="setRight()">Timeline</button>
       </div>          
        
      
      
        <!-- <keep-alive>  
          <transition name="left">
            <component style="position:fixed;" v-bind:id=id v-bind:is="component"></component>
          </transition>
          
        </keep-alive> -->

        
        
        <keep-alive>

          <agile :infinite="false" :arrows="false" >
             <div class="slide">
                  <list v-bind:id="id" ></list>
              </div>
              <div class="slide">
                  <barchart ></barchart>
              </div>
              <div class="slide">
                  <timeline></timeline>
              </div>
             
          </agile>

        </keep-alive>

        

      </div>

      <div class="adding">
        <div class="addButtonProject">
          <button class="entryButton" @click="showEntryModal = true">
            <img src="../img/addentry.svg" alt="Add Entry">
          </button>
        </div>

        <div class="addButtonProject">
          <button class="userButton" @click="showUserModal = true">
            <img src="../img/adduser.svg" alt="Add User">
          </button>
        </div>
      </div>

      <entryModal v-bind:id=id v-if="showEntryModal" @close="showEntryModal = false">
      </entryModal>

      <userModal v-bind:id=id v-if="showUserModal" @close="showUserModal = false">
      </userModal>
  </div>
</template>
<script>
import { projectRef } from "../firebase";
import { userRef } from "../firebase";

export default {
  name: "project",
  data() {
    return {
      component: "list",
      showEntryModal: false,
      showUserModal: false,
      email: "",
      project: {},
      left: true,
      middle: false,
      right: false,
      };
  },
  props: ["id"],
  mounted: function() {
    this.$bindAsObject("project", projectRef.child(this.id));
  },
  methods: {
    setLeft: function(){
      let agile = document.getElementsByClassName('agile__track');
      this.left = true;
      this.middle = false;
      this.right = false;
      agile[0].style.transition= "transform 300ms ease;"
      agile[0].style.transform= "translate(0px)";
    },
    setMiddle: function(){
      let agile = document.getElementsByClassName('agile__track');
      let agileSlide = document.getElementsByClassName('agile__slide');
      let slideWidth = agileSlide[0].style.width;
      this.left = false;
      this.middle = true;
      this.right = false;
      agile[0].style.transition= "transform 300ms ease;"
      agile[0].style.transform= "translate(-" + slideWidth + ")";
    },
    setRight: function(){
      let agile = document.getElementsByClassName('agile__track');
      let agileSlide = document.getElementsByClassName('agile__slide');
      let slideWidth = parseInt(agileSlide[0].style.width);
      this.left = false;
      this.middle = false;
      this.right = true;
      agile[0].style.transition= "transform 300ms ease;"
      agile[0].style.transform= "translate(-" + (2 * slideWidth) + "px)";
    }
  },
  firebase: {}
};
</script>
