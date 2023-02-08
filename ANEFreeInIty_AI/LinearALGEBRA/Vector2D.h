#pragma once
#include <tuple>

class Vector2D
{
private:
	double x = 0;
	double y = 0;
	double magnitude = 0;
	double angleWithXAxisDeg = 0;


	void PolarToCartesian();
	void CartesianToPolar();
public:
	Vector2D();

	Vector2D(double param1, double param2, bool isCartesian = true);

	static Vector2D* ScalerMultiplication(double sValue, Vector2D& vector);

	static Vector2D* i();

	static Vector2D* j();

	static Vector2D* UnitVector(Vector2D* vector);

	static std::tuple<double, double> IntersectLineByVectors(Vector2D* vector1, Vector2D* vector2, double t);

	static Vector2D* LinearCombinationVector(Vector2D* vects[], double constants[], int length);

	Vector2D* operator + (Vector2D& vector);

	Vector2D* operator - (Vector2D& vector);

	std::tuple<double, double> GetVector2D();

	std::tuple<double, double> GetVectorP2D();

	void PrintVector();

	void PrintVectorP();
};

//extern "C" _declspec(dllexport) void* Vector2DScalerMultiplication(double sValue, void* vector)
//{
//	(void*) Vector2D::ScalerMultiplication(sValue, static_cast<Vector2D>(vector));
//}