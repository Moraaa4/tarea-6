-- 1. Resumen de Ventas por Categoría (Sin SELECT *)
/* Qué devuelve: Total de ingresos y volumen por categoría.
   Grain: Una fila por categoría.
   Métricas: Suma de subtotales, conteo de items y promedio.
   Por qué GROUP BY: Para agrupar los detalles de órdenes por su categoría padre.
*/
CREATE OR REPLACE VIEW view_ventas_categoria AS
SELECT 
    c.nombre AS nombre_categoria,
    COUNT(od.id) AS cantidad_productos_vendidos,
    SUM(od.subtotal) AS ingresos_totales,
    -- Campo calculado: % de contribución sobre una meta de 5000
    ROUND((SUM(od.subtotal) / 5000.0) * 100, 2) AS porcentaje_meta
FROM categorias c
JOIN productos p ON c.id = p.categoria_id
JOIN orden_detalles od ON p.id = od.producto_id
GROUP BY c.nombre; 
-- VERIFY: SELECT * FROM view_ventas_categoria;

-- 2. Ranking de Clientes (Window Function)
/* Qué devuelve: Ranking de clientes que más han gastado.
   Grain: Un usuario.
   Métricas: Gasto total histórico.
   Window Function: RANK() para ver quién es el cliente estrella.
*/
CREATE OR REPLACE VIEW view_ranking_clientes AS
SELECT 
    u.nombre,
    SUM(o.total) AS gasto_total,
    -- Window Function requerida
    RANK() OVER (ORDER BY SUM(o.total) DESC) AS posicion,
    -- Campo calculado: Ticket promedio
    ROUND(AVG(o.total), 2) AS ticket_promedio
FROM usuarios u
JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.nombre;
-- VERIFY: SELECT * FROM view_ranking_clientes WHERE posicion <= 3;

-- 3. Alertas de Inventario (HAVING + CASE)
/* Qué devuelve: Productos que necesitan atención de stock.
   Grain: Un producto.
   CASE: Para poner etiquetas de prioridad.
   HAVING: Solo muestra productos con menos de 50 unidades.
*/
CREATE OR REPLACE VIEW view_stock_alerta AS
SELECT 
    nombre,
    stock,
    -- Requisito CASE significativo
    CASE 
        WHEN stock <= 10 THEN 'REABASTECER URGENTE'
        WHEN stock <= 30 THEN 'STOCK BAJO'
        ELSE 'SALUDABLE'
    END AS prioridad
FROM productos
GROUP BY nombre, stock
HAVING stock < 50; 
-- VERIFY: SELECT * FROM view_stock_alerta;

-- 4. Ventas Mensuales (CTE + COALESCE)
/* Qué devuelve: Ingresos agrupados por mes.
   Grain: Un mes calendario.
   CTE: Para extraer la fecha antes de agrupar.
*/
CREATE OR REPLACE VIEW view_ventas_mensuales AS
WITH meses_calculados AS ( -- Requisito CTE
    SELECT 
        DATE_TRUNC('month', created_at) AS mes,
        total,
        status
    FROM ordenes
)
SELECT 
    mes,
    COUNT(*) AS total_ordenes,
    -- Requisito COALESCE
    COALESCE(SUM(total), 0) AS total_ingresos
FROM meses_calculados
GROUP BY mes;
-- VERIFY: SELECT * FROM view_ventas_mensuales;

-- 5. Monitor de Estatus (Sin SELECT *, HAVING)
/* Qué devuelve: Resumen de dinero por estado de orden.
   Grain: Un estado de orden.
   HAVING: Solo muestra estados que tengan dinero acumulado.
*/
CREATE OR REPLACE VIEW view_monitor_estatus AS
SELECT 
    status AS estado,
    COUNT(*) AS cantidad,
    SUM(total) AS monto_acumulado
FROM ordenes
GROUP BY status
HAVING SUM(total) > 0;
-- VERIFY: SELECT * FROM view_monitor_estatus;