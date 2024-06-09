import { Injectable } from '@angular/core';
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { User, iUser } from './home/home.model';
import { AlertController, ToastController } from '@ionic/angular';
import { Introduction } from './introduction/introduction.model';
import { ChapOne } from './chapter1/chapter1.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  users: User = new User();
  theuserList: iUser[] = [];
  topic: Introduction = new Introduction();
  isLoading: boolean = false;

  constructor(private alertCtrl:AlertController, private toastCtrl:ToastController) { }


  async getUserData(docId: string): Promise<User | null> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const userDoc = await getDoc(doc(firestore, 'users', docId));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        userData.id = userDoc.id;
        return userData;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (e) {
      console.error('Error getting user document:', e);
      return null;
    }
  }

  

  async getIntroById(id: string): Promise<Introduction | null> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const introDoc = await getDoc(doc(firestore, 'topics', id));
      if (introDoc.exists()) {
        const topicData = introDoc.data() as Introduction;
        topicData.id = introDoc.id;
        return topicData;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (e) {
      console.error('Error getting document:', e);
      return null;
    }
  }
  

  async getChapOneById(id: string): Promise<ChapOne | null> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const ChapOneDoc = await getDoc(doc(firestore, 'topics', id));
      if (ChapOneDoc.exists()) {
        const ChapOneData = ChapOneDoc.data() as ChapOne;
        ChapOneData.id = ChapOneDoc.id;
        return ChapOneData;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (e) {
      console.error('Error getting document:', e);
      return null;
    }
  }

  async addData(user: User){
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const dataAdd = await addDoc(collection(firestore, "users"), {
      id: user.id,
      emailAdd: user.emailAdd,
      name: user.name,
      username: user.username,
      password: user.password,
      });
      console.log("Document written with ID: ", dataAdd.id)
    } catch (e) {
      console.error("Error in adding document: ", e)
    }
  }

        async updateData(user: User){
          const app = initializeApp(environment.firebaseConfig);
          const firestore = getFirestore(app);
      
          try {
            const docRef = doc(firestore, "users", user.id);
            await updateDoc(docRef, {emailAdd: user.emailAdd,
              name: user.name,
              username: user.username})
          } catch (e) {
            console.error("Error in update document: ", e)
          }
        }
  
  async deleteData(user: User) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "users", user.id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error in delete document: ", e)
    }
  }

  async alertdsply(header: string, message: string){
    const alert = await this.alertCtrl.create({
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
