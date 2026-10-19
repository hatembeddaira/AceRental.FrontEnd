import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { QuoteDto } from '../interfaces/quote-dto';


@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.aceRentalApiUrl + '/v1/Quotes';

  get(): Observable<QuoteDto[]> {
    return this.http.get<{ '@odata.context'?: string; value: QuoteDto[] }>(this.apiUrl).pipe(
      map(response => response.value || []),
      tap(() => null)
    );
  }

  getById(id: string): Observable<QuoteDto | null> {    
    return this.http
      .get<QuoteDto | { '@odata.context'?: string; value: QuoteDto }>(`${this.apiUrl}(${id})$expand=quoteLines,reservation($expand=client)`)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          // if ('value' in response) {
          //   return response.value || null;
          // }
          return response as QuoteDto;
        })
      );
  }

 

  generateQuote(payload: { reservationId: string }): Observable<QuoteDto | null> {
    return this.http
      .post<QuoteDto | { '@odata.context'?: string; value: QuoteDto }>(this.apiUrl, payload)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }

          if ('value' in response) {
            return response.value || null;
          }

          return response as QuoteDto;
        })
      );
  }
  
//   uploadProduitFiles(files: File[]) {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('file', file);
//     })
//     return this.http.post<{ url: string }>('https://api.monsite.com/api/files/upload', formData);
//   }
}
