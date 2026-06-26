import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Crop } from '../types/crop';

export const cropService = {
  async addCrop(crop: Crop) {
    const cropsRef = collection(db, 'crops');
    const docRef = await addDoc(cropsRef, crop as any);
    return docRef.id;
  },
  async getCropsByUser(userId: string): Promise<Crop[]> {
    const cropsRef = collection(db, 'crops');
    const q = query(cropsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Crop));
  }
};
