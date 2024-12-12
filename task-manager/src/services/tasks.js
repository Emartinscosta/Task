import React from 'react'; import { Card, Button } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

export const getTasks = async () => {
    const tasksSnapshot = await getDocs(tasksCollectionRef);
    const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasksList;
}

export const createTask = async (newTask) => {
    await addDoc(tasksCollectionRef, newTask);
}

export const updateTask = async (taskId, updatedTask) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, updatedTask);
}

export const deleteTask = async (taskId) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
}


