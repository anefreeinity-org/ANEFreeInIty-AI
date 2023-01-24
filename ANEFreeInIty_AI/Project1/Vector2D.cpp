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

Vector2D* Vector2D::operator + (Vector2D &vector)
{
	std::tuple<double, double> vector2 = vector.GetVector2D();

	double xres, yres;
	double x2 = std::get<0>(vector2);
	double y2 = std::get<1>(vector2);

	xres = this->x + x2;
	yres = this->y + y2;

	return new Vector2D(xres, yres);
}

Vector2D* Vector2D::operator - (Vector2D& vector)
{
	Vector2D* malVect = Vector2D::SMul(-1, vector);

	return this->operator+(*malVect);
}

Vector2D* Vector2D::SMul(double sValue, Vector2D &vector)
{
	std::tuple<double, double> vectorQ = vector.GetVector2D();

	double xres, yres;
	double x = std::get<0>(vectorQ);
	double y = std::get<1>(vectorQ);

	xres = x * sValue;
	yres = y * sValue;

	return new Vector2D(xres, yres);
}

Vector2D* Vector2D::i()
{
	return new Vector2D(1, 0);
}

Vector2D* Vector2D::j()
{
	return new Vector2D(0, 1);
}

Vector2D* Vector2D::UnitVector(Vector2D* vector)
{
	//v(vect)/v(mod)
	std::tuple<double, double> vectorV = vector->GetVector2D();

	double xunit, yunit;
	double x = std::get<0>(vectorV);
	double y = std::get<1>(vectorV);

	double vectorMod = sqrt(((x * x) + (y * y)));

	xunit = x / vectorMod;
	yunit = y / vectorMod;

	return new Vector2D(xunit, yunit);
}

void Vector2D::PrintVector()
{
	std::tuple<double, double> vector2dPrint = this->GetVector2D();
	std::cout<< "Vector is (" << std::get<0>(vector2dPrint) << ", " << std::get<1>(vector2dPrint) << ")" << std::endl;
}