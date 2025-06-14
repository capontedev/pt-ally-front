export interface Task {
  id: number;
  user_id: number;
  description: string;
  done: boolean;
  create_at: Date;
  done_at: Date | null;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
}
