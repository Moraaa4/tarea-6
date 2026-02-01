-- Rol limitado para la aplicación
CREATE ROLE web_dashboard_user WITH LOGIN PASSWORD 'dashboard_pass_2026';

-- Permisos básicos
GRANT CONNECT ON DATABASE tienda_db TO web_dashboard_user;
GRANT USAGE ON SCHEMA public TO web_dashboard_user;

-- SELECT solo para las VIEWS
GRANT SELECT ON ALL TABLES IN SCHEMA public TO web_dashboard_user;