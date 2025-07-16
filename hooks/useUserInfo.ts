// hooks/useUserInfo.ts
'use client';

import { useEffect, useState } from 'react';

export function useUserInfo() {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/info')
      .then(res => res.json())
      .then(data => {
        setIsPro(data?.isPro || false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { isPro, loading };
}