import React, { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext({
  isOpen: false,
  bookingOptions: { type: "consultation", service: "" },
  openBooking: () => {},
  closeBooking: () => {},
});

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState({
    type: "consultation",
    service: "",
  });

  const openBooking = useCallback((options = {}) => {
    setBookingOptions({
      type: options.type || "consultation",
      service: options.service || "",
    });
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        bookingOptions,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
