-- Crear rol limitado para la aplicación web
-- El requisito especifica que debe llamarse "app_user"
-- La contraseña se establece mediante variable de entorno
CREATE ROLE app_user WITH LOGIN;

-- Permisos básicos de conexión
GRANT CONNECT ON DATABASE tienda_db TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;

-- Solo permisos de SELECT en las VIEWS (no en tablas base)
-- Esto cumple con el requisito de seguridad
GRANT SELECT ON view_ventas_categoria TO app_user;
GRANT SELECT ON view_ranking_clientes TO app_user;
GRANT SELECT ON view_stock_alerta TO app_user;
GRANT SELECT ON view_ventas_mensuales TO app_user;
GRANT SELECT ON view_monitor_estatus TO app_user;