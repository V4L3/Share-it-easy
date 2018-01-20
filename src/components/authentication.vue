<template>
  <div id="authentication">
    
    <div id="intro">
      <img src="../img/intro.svg" alt="Logo">
    </div>
  
    <div class="login">
        <div class="loginField">
            <p>USERNAME</p>
            <input  type="text" v-model="email" placeholder="MY@MAIL.ADRESS">
        </div>

        <div class="loginField">
            <p>PASSWORD</p>
            <input type="password" v-model="pass" placeholder="••••••">
        </div>
        

        <div class="loginBtn">
            <button @click="signIn()"><p>LOG IN</p></button>    
        </div>
        
        <div class="signUpBtn">
            <button @click="signUp()">SIGN UP</button>
        </div>
    </div>    

</div>
</template>
<script>
import { auth } from "../firebase";
import { userRef } from "../firebase";

export default {
  name: "authentication",
  data() {
    return {
      email: "",
      pass: ""
    };
  },
  methods: {
    signIn: function() {
      auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(
          setTimeout(
            function() {
              this.$router.push("/home");
            }.bind(this),
            1000
          )
        )
        .catch(e => alert(e.message));
    },
    signUp: function() {
      //TODO: Check if real EMAIL
      auth
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(
          setTimeout(
            function() {
              userRef.push({
                email: auth.currentUser.email,
                uid: auth.currentUser.uid
              });
            }.bind(this),
            1000
          )
        )
        .then(
          setTimeout(
            function() {
              this.$router.push("/home");
            }.bind(this),
            1000
          )
        )
        .catch(e => alert(e.message));
    },
    logOut: function() {
      auth.signOut();
    }
  },
  firebase: {},
  mounted: function() {
    setTimeout(
      function() {
        if (auth.currentUser) {
          this.$router.push('/home')
        }
      }.bind(this),
      300
    );
  }
};
</script>
