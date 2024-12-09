import InventoryReservation from "@/commons/entities/InventoryReservation";
import VariantStock from "@/commons/entities/VariantStock";
import axiosInstance from "@/request/AxiosConfig";
import { UUID } from "crypto";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface Types {
  reservationId: UUID | null;
  handleReservation: (
    variants: Array<VariantStock>,
    userId: UUID
  ) => Promise<boolean>;
}

interface Props {
  children: ReactNode;
}

const ReservationContext = createContext<Types | undefined>(undefined);

export const ReservationProvider = ({ children }: Props) => {
  const [reservationId, setReservationId] = useState<UUID | null>(null);

  const handleVerifyReservationStatus = async () => {
    if (reservationId !== null) {
      const response = await axiosInstance.get(
        `inventory/Reservation/${reservationId}`
      );
      if (
        response.data.data.reservationStatus === 2 ||
        response.data.data.reservationStatus === 1
      ) {
        setReservationId(null);
      }
    }
  };

  const handleReservation = async (
    variants: Array<VariantStock>,
    userId: UUID
  ): Promise<boolean> => {
    try {
      const reservation: InventoryReservation = new InventoryReservation(
        userId,
        variants
      );
      const response = await axiosInstance.post(
        "/inventory/Reservation",
        reservation
      );
      setReservationId(response.data.data);
      return true;
    } catch (error) {
      toast.error("Failed to create reservation.");
      return false;
    }
  };

  const handleUpdateLocalStorage = () => {
    localStorage.setItem("reservation", JSON.stringify(reservationId));
  };

  const handleInitializeReservation = () => {
    const existingReservation = JSON.parse(
      localStorage.getItem("reservation") ?? "null"
    );
    if (existingReservation) {
      setReservationId(existingReservation);
    } else {
      setReservationId(null);
    }
  };

  useEffect(() => {
    handleVerifyReservationStatus();
    const interval = setInterval(handleVerifyReservationStatus, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleUpdateLocalStorage();
  }, [reservationId]);

  useEffect(() => {
    handleInitializeReservation();
  }, []);

  const value = useMemo(() => {
    return {
      reservationId,
      handleReservation,
    };
  }, [reservationId]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }

  return context;
};
