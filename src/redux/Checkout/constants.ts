type TransactionStatus = "PREPARING" | "PENDING" | "FINISHED" | "FAILED";

const credentials = {
  name: "",
  surname: "",
  street: "",
  apartment_number: "",
  city: "",
  phone: "",
};

const initialState = {
  paymentResult: "",
  paymentError: "",
  paymentLoading: false,
  paymentIntentClientSecret: "",
  total: 0,
  status: "PREPARING" as TransactionStatus,
  ammountCharged: 0,

  credentials,
};

export { initialState };
