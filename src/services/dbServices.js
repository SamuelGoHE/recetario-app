import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const COLLECTION = 'favoritos';

export async function addFavorite(meal) {
  await setDoc(doc(db, COLLECTION, meal.idMeal), {
    idMeal: meal.idMeal,
    name: meal.name ?? '',
    category: meal.category ?? '',
    area: meal.area ?? '',
    ingredientes: meal.ingredientes ?? [],
    instructions: meal.instructions ?? '',
    notes: meal.notes ?? '',
    createdAt: Date.now(),
  });
}

export async function getFavorites() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getFavorite(idMeal) {
  const snap = await getDoc(doc(db, COLLECTION, idMeal));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateNote(idMeal, notes) {
  await updateDoc(doc(db, COLLECTION, idMeal), { notes });
}

export async function deleteFavorite(idMeal) {
  await deleteDoc(doc(db, COLLECTION, idMeal));
}
