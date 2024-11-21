import {UserType} from "@/types/auth";

export interface Member {
  id: string;
  name: string;
  type: string;
}

export interface SellerDto {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}

export interface MemberListProps {
  searchTerm?: string;
}

export const getUserTypeText = (userType: UserType): string => {
  switch (userType) {
    case UserType.OWNER: return 'Owner';
    case UserType.SELLER: return 'Seller';
    default: return 'Unknown';
  }
};