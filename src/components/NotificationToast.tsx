import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-950 text-white rounded-lg shadow-xl border border-zinc-800 text-xs animate-in slide-in-from-bottom-3 duration-200">
      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="font-medium text-zinc-100">{toastMessage}</span>
    </div>
  );
};
