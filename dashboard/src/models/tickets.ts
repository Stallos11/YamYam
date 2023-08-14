export interface ITicket {
  id?: string;
  title?: string;
  message?: string;
  status?: string;
  created_at?: any;
}

export interface ITicketResponse {
  id?: string;
  user_id: string;
  message?: string;
  created_at?: any;
}