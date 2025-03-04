import "./style.css"
import RegisterFormComponent from "../../../components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
const Resgiter = async () => {
 let session = await getServerSession(authOptions)
 if(session){ redirect('/')}
    return(
        <>
     <RegisterFormComponent/>
    </>)
       
     
 
}
 
export default Resgiter;