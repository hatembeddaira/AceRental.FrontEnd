import { ReservationItemType } from '../Enum/reservation-item-type';
import { QuoteDto } from './quote-dto';

export interface QuoteLinesDto {
	Id: string;
	QuoteId: string;
	Reference: string;
	Name: string;
	DailyPriceHT: number;
	Quantity: number;
	Type: ReservationItemType;
}
