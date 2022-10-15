import { signInWithGooglePopup } from "../../utils/Firebase/Firebase";
import { createUserDocumentFromAuth } from "../../utils/Firebase/Firebase";
const SignIn = () => {
  const logGoogleUser = async () => {
    // google provided obj contanis user
    const { user } = await signInWithGooglePopup(); 
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
