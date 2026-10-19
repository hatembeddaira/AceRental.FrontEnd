import { ReservationQuoteDto } from './reservation-quote-dto';
import { QuoteLinesDto } from './quote-lines-dto';

export interface QuoteDto {
  Id: string;
  QuoteNumber: number;
  ExpiryDate: string;
  ArchivedBy: string | null;
  ArchivedAt: string | null;
  IsArchived: boolean;
  TotalHT: number;
  TVA: number;
  TotalTTC: number;
  ReservationId: string;
  Reservation: ReservationQuoteDto;
  QuoteLines: QuoteLinesDto[];
}