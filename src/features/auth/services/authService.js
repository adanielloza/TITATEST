import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc }               from 'firebase/firestore';
import { db }                         from '../../../services/firebase';

export async function login(auth, email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCred;
    const uid       = user.uid;

    const userRef = doc(db, 'users', uid);
    console.log('userRef', userRef);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const { name, role } = userDoc.data();
      return { user, name, role };
    } else {
      console.error('No such document!');
      return { error: true, errorMessage: 'No such document!' };
    }
  } catch (error) {
    const { code: errorCode, message: errorMessage } = error;
    return { error: true, errorCode, errorMessage };
  }
}
