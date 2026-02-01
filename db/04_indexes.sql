-- 1. Índice para mejorar los JOIN entre productos y categorías
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);

-- 2. Índice para acelerar los reportes que filtran por estatus de orden
CREATE INDEX idx_ordenes_status ON ordenes(status);

-- 3. Índice para las búsquedas por usuario en el ranking
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);