"use client"

import { useState, useMemo, useEffect, useCallback } from "react";
import { useStore } from "@/commons/context/StoreContext";
import { useAuth } from "@/commons/context/AuthContext";
import { getStoreSellersWithOwner } from "@/request/SellersRequest";
import MemberCard from "@/components/members-store/MemberCard";
import styles from "@/styles/members-store/members-list.module.css"
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { getUserTypeText, Member, MemberListProps } from "@/schemes/sellers/sellers";

const MemberList: React.FC<MemberListProps> = ({ searchTerm = '', refreshTrigger = 0 }) => {
  const { store } = useStore();
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSorted, setIsSorted] = useState(false);

  const fetchSellers = async () => {
    if (store?.id) {
      const sellers = await getStoreSellersWithOwner(store.id);
      const formattedMembers = sellers.map(seller => ({
        id: seller.id,
        name: seller.name,
        type: getUserTypeText(seller.userType)
      }));
      setMembers(formattedMembers);
    }
  };
  useEffect(() => {
    fetchSellers();
  }, [store?.id, user?.userId, refreshTrigger]);

  const handleMemberDelete = useCallback(async (memberId: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
  }, []);

  useEffect(() => {
    fetchSellers();
  }, [store?.id, user?.userId]);

  const processedMembers = useMemo(() => {
    let filteredMembers = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isSorted) {
      return filteredMembers.sort((a, b) =>
        a.name.localeCompare(b.name) * (sortDirection === 'asc' ? 1 : -1)
      );
    }

    return filteredMembers;
  }, [members, searchTerm, sortDirection, isSorted]);

  const handleSort = () => {
    setIsSorted(true);
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles.container}>
      <div className={styles['info-members']}>
        <div className={styles['sort-container']}>
          <h3>Member name</h3>
          <button onClick={handleSort} className={styles['sort-button']}>
            {sortDirection === 'asc' ? (
              <GoSortAsc size={24} className={styles['sort-icon']}/>
            ) : (
              <GoSortDesc size={24} className={styles['sort-icon']}/>
            )}
          </button>
        </div>
        <div className={styles['type-container']}>
          <h3>Type</h3>
        </div>
      </div>
      {processedMembers.map((member, index) => (
        <MemberCard
          key={member.id} // Cambiado para usar member.id como key
          member={member}
          onDelete={() => handleMemberDelete(member.id)}
        />
      ))}
    </div>
  );
};

export default MemberList;