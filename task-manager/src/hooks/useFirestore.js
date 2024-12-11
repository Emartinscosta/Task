import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export function useFirestore() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            setTasks(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        await addDoc(collection(db, "tasks"), task);
    };

    const updateTask = async (id, updatedTask) => {
        const taskDoc = doc(db, "tasks", id);
        await updateDoc(taskDoc, updatedTask);
    };

    const deleteTask = async (id) => {
        const taskDoc = doc(db, "tasks", id);
        await deleteDoc(taskDoc);
    };

    return { tasks, addTask, updateTask, deleteTask };
}
