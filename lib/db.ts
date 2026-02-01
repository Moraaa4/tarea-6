import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://web_dashboard_user:dashboard_pass_2026@localhost:5432/tienda_db",
});

export const query = (text: string, params?: any[]) => pool.query(text, params);