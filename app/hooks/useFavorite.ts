import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import useLoginModel from "./useLoginModal";
import { SafeUser } from "../types/index";
import { toast } from "react-hot-toast";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function useFavorite({ listingId, currentUser }: Props) {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toast.error("Favorite Removed");
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toast.success("Favorite Added");
        }

        await request();
        router.refresh();
      } catch (error: any) {
        toast.error("Something Went Wrong");
      }
    },
    [currentUser, hasFavorite, listingId, loginModel, router]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}

export default useFavorite;
