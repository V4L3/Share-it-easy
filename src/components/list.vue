<template>

    <div>
        <!-- <h1>
           LIST
      </h1> -->

       <div class="entrylist" v-for="entry of project" v-bind:key="entry['.key']">
          <div class="entry" v-if="!entry.edit">
            <div class="entryTitle">{{entry.title}}</div>
            <div class="entryDate">{{entry.date}}</div>            
            <div class="entryAmount">{{entry.amount}} CHF</div>

            <div v-if="entry.user == authStatus.uid">
              <div class="editEntry">
                <button @click="removeEntry(entry['.key'])">Remove</button>
                <button @click="editEntry(entry['.key'])">Edit</button>
              </div>
            </div>

          </div>
          <div v-else>
            <input type="text" v-model="entry.title">
            <input type="text" v-model="entry.amount">
            <div class="editEntry">
              <button @click="saveEdit(entry)">Save</button>
              <button @click="cancelEdit(entry['.key'])">Cancel</button>
            </div>
          </div>
        </div>


    </div>
  
</template>
<script>

import {entryRef} from '../firebase';
import {auth} from '../firebase';

export default {
  name: "timeline",
  data() {
    return {
      project: {},
      authStatus: auth.currentUser,
    };
  },
  props: ["id"],
  ready: function(){
    console.log("ready")
  },
  mounted: function(){
        this.$bindAsArray('project', entryRef.child(this.id))
  },
  methods: {
    removeEntry: function(key) {
      console.log(key);
      entryRef.child(this.id).child(key).remove();
      //console.log(entryRef.child(this.id).child("entrys").child(key.title))
    },
    editEntry: function(key) {
      entryRef.child(this.id).child(key).update({ edit: true });
    },
    cancelEdit: function(key) {
      entryRef.child(this.id).child(key).update({ edit: false });
    },
    saveEdit: function(entry) {
      const key = entry[".key"];
      entryRef.child(this.id).child(key).update({ title: entry.title, amount: entry.amount, edit: false });
    }
  },
  firebase: {
  }
};
</script>
