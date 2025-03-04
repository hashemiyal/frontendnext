import CartComponent from "../../../components/Cart";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Cart = async() => {
  let session= await getServerSession(authOptions);
  if(!session) redirect('/login')
  return (
    <CartComponent/>
  )

};

export default Cart;