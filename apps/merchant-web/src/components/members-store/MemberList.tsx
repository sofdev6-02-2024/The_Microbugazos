"use client"

import { useState, useMemo } from "react";
import MemberCard from "@/components/members-store/MemberCard";
import styles from "@/styles/members-store/members-list.module.css"
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface MemberListProps {
  searchTerm?: string;
}

const MemberList: React.FC<MemberListProps> = ({ searchTerm = '' }) => {
  const [members, setMembers] = useState([
    {
      name: 'Jeferson Jhovanri Coronel Lavadenz',
      type: 'Owner'
    },
    {
      name: 'Liang Meifang Chen Xiaohua Zhang Wei Lijuan',
      type: 'Seller'
    },
    {
      name: 'Liang Meifang Chen Xiaohua Zhang Wei Lijuan',
      type: 'Seller'
    },
    {
      name: 'Liang Meifang Chen Xiaohua Zhang Wei Lijuan',
      type: 'Seller'
    },
    {
      name: 'Jeferson Jhovanri Coronel Lavadenz',
      type: 'Seller'
    },
    {
      name: 'Andrea Saavedra',
      type: 'Seller'
    },
    {
      name: 'Jeferson Jhovanri Coronel Lavadenz',
      type: 'Seller'
    },
    {
      name: 'Liang Meifang Chen Xiaohua Zhang Wei Lijuan',
      type: 'Seller'
    },
    {
      name: 'Liang Meifang Chen Xiaohua Zhang Wei Lijuan',
      type: 'Seller'
    }
  ]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSorted, setIsSorted] = useState(false);

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

  const handleDelete = (name: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.name !== name));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoMembers}>
        <div className={styles.sortContainer}>
          <h3>Member name</h3>
          <button onClick={handleSort} className={styles.sortButton}>
            {sortDirection === 'asc' ? (
              <GoSortAsc size={24} className={styles.sortIcon}/>
            ) : (
              <GoSortDesc size={24} className={styles.sortIcon}/>
            )}
          </button>
        </div>
        <div className={styles.typeContainer}>
          <h3>Type</h3>
        </div>
      </div>
      {processedMembers.map((member, index) => (
        <MemberCard
          key={`${member.name}-${index}`}
          member={member}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MemberList;