import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { pl } from "date-fns/locale"; // Import polskiego locale
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const OrderSummary = () => {
  const { state } = useLocation();
  const { cart, quantities } = state || {};
  const navigate = useNavigate();
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Nowy stan na błąd

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");

    if (!cart || !quantities || !deliveryDate) {
      setErrorMessage("Brak wymaganych danych do złożenia zamówienia.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ordermanagement-production-0b45.up.railway.app/api/cart/create-order/",
        {
          products: cart.items.map((item) => ({
            product_id: item.product.id,
            quantity: quantities[item.product.id],
          })),
          delivery_date: format(deliveryDate, "yyyy-MM-dd"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order created:", response.data);
      navigate("/users/orders");
    } catch (error) {
      console.error("Error creating order:", error);

      if (error.response && error.response.data && error.response.data.delivery_date) {
        setErrorMessage(error.response.data.delivery_date[0]); // Pobieramy komunikat walidacji
      } else {
        setErrorMessage("Wystąpił błąd podczas składania zamówienia.");
      }
    }
  };

  return (
    <div className="w-screen h-min-screen mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Podsumowanie zamówienia
      </h2>
      {cart?.items.map((item) => (
        <div key={item.product.id} className="border-b py-4">
          <h3 className="text-lg font-semibold">{item.product.title}</h3>
          <p>Ilość: {quantities[item.product.id]}</p>
          <p>Cena: {item.product.price} zł/kg</p>
          <p>
            Łącznie: ~{quantities[item.product.id] * item.product.price} zł
          </p>
        </div>
      ))}

      <div className="mt-4">
        <h4 className="text-lg font-semibold">Data dostawy:</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal mt-2",
                !deliveryDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deliveryDate ? format(deliveryDate, "PPP") : "Wybierz datę"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={deliveryDate}
              onSelect={setDeliveryDate}
              initialFocus
              locale={pl}
              className="bg-gray-600 text-white border-none"
              dayClassName={(date) =>
                "hover:bg-blue-400 hover:text-white " +
                (date.toDateString() === new Date().toDateString() ? "bg-blue-500 text-white" : "")
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Sekcja z błędem */}
      {errorMessage && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Błąd!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="mt-6 text-right">
        <button
          onClick={handleConfirmOrder}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Potwierdzam złożenie zamówienia
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
