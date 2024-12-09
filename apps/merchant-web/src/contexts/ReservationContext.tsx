import { UUID } from "crypto";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface Types {
  reservationId: UUID | null
}

interface Props {
  children: ReactNode
}

const ReservationContext = createContext<Types | undefined>(undefined);

export const ReservationProvider = ({children}: Props) => {
  const [reservationId, setReservationId] = useState<UUID | null>(null); 

  const value = useMemo(() => {
    return {
      reservationId
    }
  }, [reservationId])

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }

  return context;
}