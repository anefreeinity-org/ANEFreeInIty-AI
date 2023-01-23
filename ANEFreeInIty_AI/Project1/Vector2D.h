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

	void PrintVector();
};