#include<tuple>
#include <iostream>
#include "Vector2D.h"

//IR^n - n dimension real coordinate space n=2

Vector2D::Vector2D()
{
	Vector2D(0, 0);
}

Vector2D::Vector2D(double x, double y)
{
	this->x = x;
	this->y = y;
}

std::tuple<double, double> Vector2D::GetVector2D()
{
	return std::make_tuple(x, y);
}

void Vector2D::PrintVector()
{
	std::tuple<double, double> vector2dPrint = this->GetVector2D();
	std::cout<< "Vector is (" << std::get<0>(vector2dPrint) << ", " << std::get<1>(vector2dPrint) << ")" << std::endl;
}