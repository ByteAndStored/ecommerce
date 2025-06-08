import axios from "../libs/axios"; // axios'u kendi yapılandırmamızdan alıyoruz

let token = localStorage.getItem('token');

export function paymentOnline({ cartId, shippingAddress }) {
  console.log(cartId.cartId);

  return axios.post(
    `/orders/checkout-session/${cartId}?url=http://localhost:5173`,
    { shippingAddress },
    {
      headers: { token }
    }
  );
}
