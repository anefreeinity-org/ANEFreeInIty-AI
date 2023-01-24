#pragma once
#include <tuple>

class Vector2D
{
private:
	double x;
	double y;

public:
	Vector2D();

	Vector2D(double x, double y);

	std::tuple<double, double> GetVector2D();

	Vector2D* operator + (Vector2D &vector);

	Vector2D* operator - (Vector2D& vector);

	static Vector2D* SMul(double sValue, Vector2D &vector);

	static Vector2D* i();

	static Vector2D* j();

	static Vector2D* UnitVector(Vector2D* vector);

	void PrintVector();
};