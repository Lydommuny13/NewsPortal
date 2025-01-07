import { format } from 'date-fns';
import { Language } from '../types';

export function formatDate(date: string, language: Language): string {
  const formattedDate = format(new Date(date), 'PPP');
  
  if (language === 'km') {
    // Basic Khmer date formatting - you might want to enhance this
    return formattedDate
      .replace(/January|February|March|April|May|June|July|August|September|October|November|December/g, (month) => {
        const khmerMonths: Record<string, string> = {
          January: 'មករា',
          February: 'កុម្ភៈ',
          March: 'មីនា',
          April: 'មេសា',
          May: 'ឧសភា',
          June: 'មិថុនា',
          July: 'កក្កដា',
          August: 'សីហា',
          September: 'កញ្ញា',
          October: 'តុលា',
          November: 'វិច្ឆិកា',
          December: 'ធ្នូ'
        };
        return khmerMonths[month];
      });
  }
  
  return formattedDate;
}