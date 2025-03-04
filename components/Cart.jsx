"use client"
import { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import { useSession } from "next-auth/react";
import { CartContext } from "../contexts/CartContext";
import { enTofa } from './../utils/utilities';
import Swal from "sweetalert2";
const CartComponent = () => {
  let { cart, removeFromCart, updateQuantity, clearCart } =useContext(CartContext);
  let {data:session}=useSession()
  let total = 0;
  let [userInfo, setUserInfo] = useState({
    name: session?.user.username,
    email: session?.user.email,
    country: "",
    city: "",
    address:"",
    postalCode:"",
  });

  function hadlesubmit(e) {
    e.preventDefault();
    if(!userInfo.name ||!userInfo.email || !userInfo.country||!userInfo.city || !userInfo.address){
      swal("لطقا تمامی مشخصات هارا پر نماید !");
      return;
    }
    let neworder = { user: { ...userInfo }, cart: [...cart], totalPrice: total };
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neworder),
    })
      .then((res) => {
        res.json();
        clearCart();
      })
      .then((data) => {
        console.log(data);
        swal("سفارش شما موفقانه ثبت گردید !");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="cart-grid">
      <div className="cart-box">
        <h2 className="font-bold">سبد خرید</h2>

        {cart.length == 0 && (
          <div className="text-red-500">سبد خرید خالی است</div>
        )}

        {cart.length > 0 && (
          <table className="cart-table">
            <thead>
              <tr>
                <th>کالا</th>
                <th>قیمت </th>
              </tr>
            </thead>

            <tbody>
              {cart.map((product) => (
                <tr key={product._id}>
                  <td className="cart-product">
                    <img
                      src={product.image_url}
                      width={80}
                      height={80}
                      className="cart-product-image"
                      alt={product.title}
                    />
                    {product.title}
                    <p hidden>
                      {(total = total + product.price * product.quantity)}
                    </p>
                    <input
                      type="number"
                      value={product.quantity}
                      min="1"
                      onChange={(event) =>
                        updateQuantity(product._id, Number(event.target.value))
                      }
                    />
                    
                    <FaTrashAlt size={30} style={{color:"#f44336"}} className="icon-delete" onClick={() => {
                        Swal.fire({
                          title: "آیا شما مطمین استید ?",
                          text: "تغییرات انجام شده غیر قابل بازگشت است!",
                          icon: "warning",
                          showCancelButton: true,
                          cancelButtonText: "انصراف",
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "بله، حذف شود!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "حذف شد!",
                              icon: "success",
                            });
                            removeFromCart(product._id);
                          }
                        });
                      }}/>
                    
                  </td>

                  <td>
                    {enTofa(Math.round(product.price * product.quantity))}{" "}
                    افغانی
                  </td>
                </tr>
              ))}

              <tr>
                <td>
                  {" "}
                  <strong>مجموع</strong>
                </td>
                <td>
                  <strong>{enTofa(Math.round(total))}</strong> افغانی{" "}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-box">
          <h2 className="cart-title">اطلاعات شما</h2>
          <form className="cart-form" onSubmit={hadlesubmit}>
            <input
              value={userInfo.name}
              onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value });
              }}
              name="name"
              type="text"
              className="cart-input"
              placeholder="نام"
            />
            <input
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
              name="email"
              type="email"
              className="cart-input"
              placeholder="ایمیل"
            />
            <input
              value={userInfo.country}
              onChange={(e) => {
                setUserInfo({ ...userInfo, country: e.target.value });
              }}
              name="country"
              type="text"
              className="cart-input"
              placeholder="کشور"
            />
            <input
              value={userInfo.city}
              onChange={(e) => {
                setUserInfo({ ...userInfo, city: e.target.value });
              }}
              name="city"
              type="text"
              className="cart-input"
              placeholder="شهر"
            />
            <input
              value={userInfo.address}
              onChange={(e) => {
                setUserInfo({ ...userInfo, address: e.target.value });
              }}
              name="address"
              type="text"
              className="cart-input"
              placeholder="آدرس"
            />
            <input
              value={userInfo.postalCode}
              onChange={(e) => {
                setUserInfo({ ...userInfo, postalCode: e.target.value });
              }}
              name="postalCode"
              type="number"
              className="cart-input"
              placeholder="کدپستی"
            />

            <button className="cart-button">پرداخت آنلاین</button>
          </form>
        </div>
      )}
    </div>
  );
}
 
export default CartComponent;