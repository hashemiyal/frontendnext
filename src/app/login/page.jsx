import LoginFormComponent from "../../../components/LoginForm";
import "./style.css"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const LoginForm = async () => {
  let session= await getServerSession(authOptions)
  if(session){redirect('/')}
 return (
  <> 
 <LoginFormComponent/>
  </>
 
 )
};

export default LoginForm;