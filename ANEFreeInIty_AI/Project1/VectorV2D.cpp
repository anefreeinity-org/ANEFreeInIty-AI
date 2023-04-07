#include "VectorV2D.h"
#include <iostream>
#include <cmath>

#define M_PI 3.14159265358979323846
#define TORAD (M_PI / 180)
#define TODEG (180 / M_PI)

//IR^n - n dimension real coordinate space n=2

Vector2D::Vector2D()
{
	Vector2D(0, 0);
}

Vector2D::Vector2D(double param1, double param2, bool isCartesian)
{
	if (isCartesian)
	{
		this->x = param1;
		this->y = param2;
		CartesianToPolar();
	}
	else
	{
		magnitude = param1;
		angleWithXAxisDeg = param2;
		PolarToCartesian();
	}
}

Vector2D* Vector2D::LinearCombinationVector(Vector2D* vects[], double constants[], int length)
{
	Vector2D* vect, * vectT;
	vect = Vector2D::ScalerMultiplication(constants[0], *vects[0]);

	for (int i = 1;i < length;i++)
	{
		vectT = Vector2D::ScalerMultiplication(constants[i], *vects[i]);
		vect = *vect + *vectT;
	}

	return vect;
}

std::tuple<double, double> Vector2D::GetConstantsToReachThirdVector(Vector2D* vector1, Vector2D* vector2, Vector2D* destinationVector)
{
	double a1, b1, c1, x1, a2, b2, c2, x2;

	std::tuple<double, double> vectorA = vector1->GetVector2D();
	std::tuple<double, double> vectorB = vector2->GetVector2D();
	std::tuple<double, double> vectorX = destinationVector->GetVector2D();

	a1 = std::get<0>(vectorA);
	a2 = std::get<1>(vectorA);

	b1 = std::get<0>(vectorB);
	b2 = std::get<1>(vectorB);

	x1 = std::get<0>(vectorX);
	x2 = std::get<1>(vectorX);

	/*std::cout << a1 << ", " << a2 << std::endl;
	std::cout << b1 << ", " << b2 << std::endl;
	std::cout << x1 << ", " << x2 << std::endl;*/

	double denominator = (a1 * b2) - (a2 * b1);
	
	if (denominator != 0)
	{
		c1 = ((x1 * b2) - (b1 * x2)) / denominator;
		c2 = ((x2 * a1) - (a2 * x1)) / denominator;
	}
	else
	{
		c1 = 0;
		c2 = 0;
	}
	
	return std::make_tuple(c1, c2);
}

int Vector2D::ISLinearlyDependent(Vector2D* vector1, Vector2D* vector2)
{
	double a1, b1, a2, b2;

	std::tuple<double, double> vectorA = vector1->GetVector2D();
	std::tuple<double, double> vectorB = vector2->GetVector2D();

	a1 = std::get<0>(vectorA);
	a2 = std::get<1>(vectorA);

	b1 = std::get<0>(vectorB);
	b2 = std::get<1>(vectorB);

	if ((a1 == 0 && a2 == 0) || (b1 == 0 && b2 == 0)) 
	{
		return -1;
	}
	else if ((a1 == 0 && b1 == 0) || (a2 == 0 && b2 == 0))
	{
		return 1;
	}
	else if ((a1 == 0 && b2 == 0) || (a2 == 0 && b1 == 0))
	{
		return 0;
	}
	else
	{
		double c1, c2;

		c1 = b1 / a1;
		c2 = b2 / a2;

		if (c1 == c2)
		{
			return 1;
		}
		else 
		{
			return 0;
		}
	}
}


Vector2D* Vector2D::ScalerMultiplication(double sValue, Vector2D& vector)
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

std::tuple<double, double> Vector2D::IntersectLineByVectors(Vector2D* vector1, Vector2D* vector2, double t)
{
	// finding equation of line intersected by two vectors
	// eq: L = {a-> + t(a-> - b->) | t belongs to real numbers}
	Vector2D* subscratedVector = *vector1 - *vector2;
	Vector2D* multipliedVector = Vector2D::ScalerMultiplication(t, *subscratedVector);
	Vector2D* quadVector = *vector1 + *multipliedVector;
	quadVector->PrintVector();

	return quadVector->GetVector2D();
}

Vector2D* Vector2D::operator + (Vector2D& vector)
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
	Vector2D* malVect = Vector2D::ScalerMultiplication(-1, vector);

	return this->operator+(*malVect);
}

std::tuple<double, double> Vector2D::GetVector2D()
{
	return std::make_tuple(x, y);
}

std::tuple<double, double> Vector2D::GetVectorP2D()
{
	return std::make_tuple(magnitude, angleWithXAxisDeg);
}

void Vector2D::PolarToCartesian()
{
	this->x = this->magnitude * (cos(angleWithXAxisDeg * TORAD));
	this->y = this->magnitude * (sin(angleWithXAxisDeg * TORAD));
}

void Vector2D::CartesianToPolar()
{
	double angle = atan(y / x) * TODEG;
	double quadConst = 0;

	if (x >= 0 && y >= 0)
	{
		//1st quad
		quadConst = 0;
	}
	else if (x < 0 && y >= 0)
	{
		//2nd quad
		quadConst = 90;
	}
	else if (x < 0 && y < 0)
	{
		//3rd quad
		quadConst = 180;
	}
	else
	{
		//4th quad
		quadConst = 270;
	}

	this->angleWithXAxisDeg = abs(angle) + quadConst;
	this->magnitude = sqrt(x * x + y * y);
}

void Vector2D::PrintVector()
{
	std::tuple<double, double> vector2dPrint = this->GetVector2D();
	std::cout << "Vector is (" << std::get<0>(vector2dPrint) << ", " << std::get<1>(vector2dPrint) << ")" << std::endl;
}

void Vector2D::PrintVectorP()
{
	std::tuple<double, double> vector2dPrint = this->GetVectorP2D();
	std::cout << "Vector is (" << std::get<0>(vector2dPrint) << ", " << std::get<1>(vector2dPrint) << ")" << std::endl;
}

Vector2D* Vector2D::DotProductVector2D(Vector2D* vector1, Vector2D* vector2)
{
	std::tuple<double, double> vectorA = vector1->GetVector2D();
	std::tuple<double, double> vectorB = vector2->GetVector2D();

	double param1 = std::get<0>(vectorA) * std::get<0>(vectorB);
	double param2 = std::get<1>(vectorA) * std::get<1>(vectorB);

	return new Vector2D(param1, param2);
}