import Button from "../../components/Button/Button";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import {
  signInWithGooglePopup, 
  createUserDocumentFromAuth
} from "../../utils/FirebaseUtils/FirebaseUtils";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); 
    await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button onClick={logGoogleUser} buttonType="google">
        Sign in with Google Popup
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
