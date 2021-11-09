// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from "../firebaseConfig"
import { collection, getDocs, addDoc, orderBy, limit } from "firebase/firestore"

export async function createArticle({ title, body, author }) {
  const data = { title, body, author, date: new Date() }
  const docRef = await addDoc(collection(db, "articles"), data)
  return { id: docRef.id, ...data }
}

export async function createComment({ arName, body, name }) {
  const dataC = { arName, body, name, date: new Date() }
  const docRef = await addDoc(collection(db, "comments"), dataC)
  return { id: docRef.id, ...dataC }
}

export async function fetchArticles() {
  const querySnapshot = await getDocs(
    collection(db, "articles"),
    orderBy("date", "desc"),
    limit(50)
  )
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function fetchComments(article) {
  const querySnapshot = await getDocs(
    collection(db, "comments"),
    orderBy("date", "desc"),
    limit(50)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}