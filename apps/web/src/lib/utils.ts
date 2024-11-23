import { EmergencyEvent } from "@/app/types/emergency"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function searchFrom(events: EmergencyEvent[], searchTerm: string) {
  return events.filter(item =>
    item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.timestamp?.includes(searchTerm) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

}
