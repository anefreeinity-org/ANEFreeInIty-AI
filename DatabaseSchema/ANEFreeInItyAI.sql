CREATE DATABASE IF NOT EXISTS anefreeinity_ai;

USE anefreeinity_ai;

CREATE TABLE vector2d (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    x_quadinate_val DECIMAL(10,5) NOT NULL,
    y_quadinate_val DECIMAL(10,5) NOT NULL,
    magnitude DECIMAL(10,5) NOT NULL,
    angle_with_x_axis_deg DECIMAL(10,5) NOT NULL,
    v_name VARCHAR(30) NOT NULL,
    v_description MEDIUMTEXT NOT NULL,
    is_cartesian INT NOT NULL
);

CREATE TABLE project (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(30) NOT NULL,
    p_description MEDIUMTEXT NOT NULL
);

CREATE TABLE project_iteam_mapper (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    vector2d_id INT NOT NULL,
    vector2d_name VARCHAR(30) NOT NULL,
    iteam_status INT NOT NULL
);

INSERT INTO vector2d VALUES (1, 3, 4.0, 5.0, 53.0, "Vector A" "demo vector", 1);
INSERT INTO vector2d VALUES (2, 4.0, 3.0, 5.0, 36.0, "Vector B" "demo vector", 1);

INSERT INTO project VALUES (1, "project 1", "demo project");
INSERT INTO project VALUES (2, "project 2", "demo project");

INSERT INTO project_iteam_mapper VALUES (1, 1, 10, "Vector E", 0);
INSERT INTO project_iteam_mapper VALUES (2, 1, 11, "Vector F", 0);
INSERT INTO project_iteam_mapper VALUES (3, 2, 12, "Vector G", 0);
/* */