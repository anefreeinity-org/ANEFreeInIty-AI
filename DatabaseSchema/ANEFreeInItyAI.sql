CREATE DATABASE IF NOT EXISTS anefreeinity_ai;

USE anefreeinity_ai;

CREATE TABLE vector2d (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    x_quadinate_val DECIMAL(10,5) NOT NULL,
    y_quadinate_val DECIMAL(10,5) NOT NULL,
    magnitude DECIMAL(10,5) NOT NULL,
    angle_with_x_axis_deg DECIMAL(10,5) NOT NULL,
    is_cartesian INT NOT NULL
);

INSERT INTO vector2d VALUES (1, 3, 4.0, 5.0, 53.0, 1);
INSERT INTO vector2d VALUES (2, 4.0, 3.0, 5.0, 36.0, 1);