import { FinancialStatus } from '../Enum/financial-status';
import { LogisticStatus } from '../Enum/logistic-status';
import { Workflow } from '../Enum/workflow';
import { ClientDto } from './client-dto';

export interface ReservationQuoteDto {
	Id: string;
	ReservationNumber: number;
	StartDate: string;
	EndDate: string;
	FinancialStatus: FinancialStatus;
	LogisticStatus: LogisticStatus;
	Workflow: Workflow;
	TotalHT: number;
	TVA: number;
	TotalTTC: number;
	ClientId: string;
	Client: ClientDto;
}
