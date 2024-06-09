  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { AlertController, ToastController } from '@ionic/angular';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
  import { User } from './home/home.model';
  import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    authenticated: boolean = false;
    isLoading: boolean = false;
    currentUser: User | null = null;

    constructor(private rawter:Router, private alertCtrl:AlertController, private toastCtrl:ToastController) { }
    
    canActivate(){
      if (localStorage.getItem("loggedIn") == "true") {
        return true;
      }
      this.rawter.navigate(['login']);
      return false
    }
    
    setAuthentication(auth: boolean) {
      localStorage.setItem("loggedIn", auth ? "true" : "false");
    }
    

    async signup(email: string, password: string, retypepw: string, username: string, name: string) {
      if (!email || !password || !retypepw){
        this.alertdsply('Error','Please fill-out all the fields');
        return;
      }

      if (password != retypepw){
        this.alertdsply('Error','Password does not match');
        return;
      }
      
      if (!email.includes('.') || !email.includes('@')){
        this.alertdsply('Error','Please put a valid email address');
        return;
      }

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const user = userCredential.user;
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, {
          emailAdd: email,
          name: name,
          username: username,
          password: password
        })
        this.toastdsply('Signed Up Succesfully!');
        this.rawter.navigate(['login']);
      })
      .catch((error) => {
        const errormsg = error.message;
        if (errormsg.includes("Error (auth/email-already-in-use)")) {
          this.alertdsply('Error', 'Email is already used!');
        } else if (errormsg.includes("Error (auth/invalid-email).")) {
          this.alertdsply('Error', 'Invalid email!');
        }
      });
    }

    async login(email: string, password: string) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Fetch additional user data from Firestore
          const firestore = getFirestore();
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as User;
            this.currentUser = userData; // Set current user
            this.authenticated = true;
            this.setAuthentication(true);
            localStorage.setItem("loggedIn","true");
            this.toastdsply('Logged In Successfully!');
            this.rawter.navigate(['home', user.uid]); // Navigate to dashboard or any other page after login
          } else {
            // Handle scenario where user data doesn't exist
            this.alertdsply('Error', 'User data not found.');
          }
        })
        .catch((error) => {
          const errormsg = error.message;
          this.alertdsply('Error', errormsg);
        });
    }

    getCurrentUser(): User | null {
      return this.currentUser;
    }
  
    updateCurrentUser(user: User) {
      this.currentUser = user;
    }
    

    async updateProgress(progress: string) {
      const user = this.getCurrentUser();
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.id);
        await updateDoc(userDocRef, {
          progress: progress  // Update user's progress
        });
      }
    }

    async alertdsply(header: string, message: string){
      const alert = await this.alertCtrl.create({
        cssClass: 'custom-alert',
        header: header,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }

    async toastdsply(message: string){
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle'
      })
      await toast.present();
    }
  }

